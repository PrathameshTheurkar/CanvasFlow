import { connection } from "websocket";

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


}