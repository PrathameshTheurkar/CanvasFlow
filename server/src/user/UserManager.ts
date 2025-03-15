import { connection } from "websocket";
import { OutgoingMessage } from "../messages/outgoingMessages";

interface User {
    id: string;
    name: string;
    conn: connection
}

interface Canvas {
    canvasId: string;
    users: User[];
}

export class UserManager {
    private canvas: Map<string, Canvas>;

    constructor() {
        this.canvas = new Map<string, Canvas>();
    }

    initCanvas(canvasId: string) {
        this.canvas.set(canvasId, {
            canvasId,
            users: []
        })
    }

    addUser(canvasId: string, userId: string, name: string, socket: connection) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);
        canvas?.users.push({
            id: userId,
            name,
            conn: socket
        })
        // console.log(`users: `, canvas?.users);

        socket.on('close', (reasonCode, description) => {
            console.log((new Date()) + ' Peer ' + socket.remoteAddress + ' disconnected.');
            console.log(`UserId: ${userId} disconnected`);
            this.removeUser(canvasId, userId);
        });
    }

    removeUser(canvasId: string, userId: string) {
        if(!this.canvas.get(canvasId)) {
            return;
        }

        const canvas = this.canvas.get(canvasId);

        const users = canvas?.users.filter(({id}) => id !== userId);

        if(users?.length != 0) {
            this.canvas.set(canvasId, {
                canvasId,
                users: users || []
            })
        }
    }

    getUser(canvasId: string, userId: string) {
        if(!this.canvas.get(canvasId)) {
            return;
        }

        const canvas = this.canvas.get(canvasId);

        return canvas?.users.find(({id}) => id == userId);
    }

    broadcast(canvasId: string, userId: string, message: OutgoingMessage) {
        const user = this.getUser(canvasId, userId);

        if(!user) {
            console.log('User not found');
            return;
        }

        if(!this.canvas.get(canvasId)) {
            return;
        }

        const canvas = this.canvas.get(canvasId);

        canvas?.users.forEach(({conn, id}) => {
            if(id == userId) {
                return;
            }
            conn.sendUTF(JSON.stringify(message));
        })
    }

}