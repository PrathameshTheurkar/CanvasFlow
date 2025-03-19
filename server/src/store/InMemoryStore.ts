import { Circle, Cursor, Line, Rectangle, Store } from "./Store";

interface Canvas {
    canvasId: string;
    cursor?: Cursor[];
    line?: Line[];
    rectangle?: Rectangle[],
    circle?: Circle[]
}

export class InMemoryStore implements Store {
    private canvas: Map<string, Canvas>;

    constructor() {
        this.canvas = new Map<string, Canvas>();
    }

    initCanvas(canvasId: string) {
        this.canvas.set(canvasId, {
            canvasId,
            cursor: [],
            line: [],
            rectangle: [],
            circle: []
        })
    }

    addCursor(canvasId: string, userId: string, prevX: number, prevY: number, x: number, y: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        if(!canvas?.cursor) {
            return;
        }

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

    removeCursor(canvasId: string, userId: string, x: number, y: number) {
        if(!this.canvas.get(canvasId)) {
            return;
        }

        const cursors = this.canvas.get(canvasId)?.cursor;

        const filteredCursors = cursors?.filter((cursor) => (!(cursor.x == x) ||  !(cursor.y == y)));

        this.canvas.set(canvasId, {            
            canvasId,
            cursor: filteredCursors || []
        })
    }

    addLine(canvasId: string, userId: string, startX: number, startY: number, endX: number, endY: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        canvas?.line?.push({
            id: `${userId}-${Date.now()}`,
            canvasId,
            userId,
            startX,
            startY,
            endX,
            endY,
            name
        })
    }

    addRectangle(canvasId: string, userId: string, x: number, y: number, width: number, height: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        canvas?.rectangle?.push({
            id: `${userId}-${Date.now()}`,
            canvasId,
            userId,
            x,
            y,
            width,
            height,
            name
        })
    }

    addCircle(canvasId: string, userId: string, x: number, y: number, radius: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        canvas?.circle?.push({
            id: `${userId}-${Date.now()}`,
            canvasId,
            userId,
            x,
            y,
            radius,
            name
        })
    }

}