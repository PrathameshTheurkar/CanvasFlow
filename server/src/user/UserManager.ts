import { connection } from "websocket";
import { OutgoingMessage, SupportedMessage } from "../messages/outgoingMessages";

export interface User {
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

        const joinedUsers = canvas?.users.map((user) => {
            return  {
                userId: user.id,
                name: user.name
            }
        })
        // console.log(`users: `, canvas?.users);
        
        socket.on('close', (reasonCode, description) => {
            console.log((new Date()) + ' Peer ' + socket.remoteAddress + ' disconnected.');
            console.log(`UserId: ${userId} disconnected`);
            const outgoingMessage: OutgoingMessage = {
                type: SupportedMessage.LEAVE,
                payload: {
                    canvasId,
                    userId,
                    name
                }
            }
            this.broadcast(canvasId, userId, outgoingMessage);
            this.removeUser(canvasId, userId);            
        });

        return joinedUsers || [];
    }

    removeUser(canvasId: string, userId: string) {
        if(!this.canvas.get(canvasId)) {
            return;
        }

        const canvas = this.canvas.get(canvasId);

        const users = canvas?.users.filter(({id}) => id != userId);

            this.canvas.set(canvasId, {
                canvasId,
                users: users || []
            })
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
            if(id == userId && message.type != 'JOIN') {
                return;
            }
            conn.sendUTF(JSON.stringify(message));
        })
    }

}