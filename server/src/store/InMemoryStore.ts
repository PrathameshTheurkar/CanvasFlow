import { Cursor, Store } from "./Store";

interface Canvas {
    canvasId: string;
    cursor: Cursor[];
}

export class InMemoryStore implements Store {
    private canvas: Map<string, Canvas>;

    constructor() {
        this.canvas = new Map<string, Canvas>();
    }

    initCanvas(canvasId: string) {
        this.canvas.set(canvasId, {
            canvasId,
            cursor: []
        })
    }

    addCursor(canvasId: string, userId: string, prevX: number, prevY: number, x: number, y: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        canvas?.cursor.push({
            id: `${userId}-${Date.now()}`,
            userId,
            name,
            prevX,
            prevY,
            x,
            y
        })
    }

    getCursors(canvasId: string) {
        const canvas = this.canvas.get(canvasId);

        if(!canvas) {
            return [];
        }

        return canvas.cursor;
    }
}