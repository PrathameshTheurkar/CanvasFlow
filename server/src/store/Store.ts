
export interface Cursor {
    id: string;
    userId: string;
    name: string;
    prevX: number;
    prevY: number;
    x: number;
    y: number;
}

export interface Line {
    id: string;
    canvasId: string;
    userId: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    name: string;
}

export interface Rectangle {
    id: string;
    canvasId: string;
    userId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    name: string
}

export interface Circle {
    id: string;
    canvasId: string;
    userId: string;
    x: number;
    y: number;
    radius: number;
    name: string;
}

export abstract class Store {
    constructor() {

    }

    initCanvas(canvasId: string) {

    }

    addCursor(canvasId: string, userId: string, prevX: number, prevY: number, x: number, y: number, name: string) {

    }

    getCursors(canvasId: string) {
        
    }
}