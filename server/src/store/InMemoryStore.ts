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

    draw(x: number, y: number) {
        
    }
}