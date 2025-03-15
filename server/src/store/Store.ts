
export interface Cursor {
    id: string;
    userId: number;
    name: string;
    x: number;
    y: number;
}

export abstract class Store {
    constructor() {

    }

    initCanvas(canvasId: string) {

    }

    draw(x: number, y: number) {

    }
}