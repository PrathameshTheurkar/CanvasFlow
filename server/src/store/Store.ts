
export interface Cursor {
    id: string;
    userId: string;
    name: string;
    x: number;
    y: number;
}

export abstract class Store {
    constructor() {

    }

    initCanvas(canvasId: string) {

    }

    addCursor(canvasId: string, userId: string, x: number, y: number, name: string) {

    }

    getCursors(canvasId: string) {
        
    }
}