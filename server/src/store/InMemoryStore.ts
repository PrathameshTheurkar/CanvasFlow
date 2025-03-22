import { Circle, Cursor, Line, Rectangle, Store, Stroke } from "./Store";

interface Canvas {
    canvasId: string;
    stroke?: Stroke[];
    line?: Line[];
    rectangle?: Rectangle[],
    circle?: Circle[],
    cursor?: Cursor[]
}

export class InMemoryStore implements Store {
    private canvas: Map<string, Canvas>;

    constructor() {
        this.canvas = new Map<string, Canvas>();
    }

    initCanvas(canvasId: string) {
        this.canvas.set(canvasId, {
            canvasId,
            stroke: [],
            line: [],
            rectangle: [],
            circle: [],
            cursor: []
        })
    }

    addStroke(canvasId: string, userId: string, prevX: number, prevY: number, x: number, y: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        if(!canvas?.stroke) {
            return;
        }

        canvas?.stroke.push({
            id: `${userId}-${Date.now()}`,
            userId,
            name,
            prevX,
            prevY,
            x,
            y
        })
    }

    getStrokes(canvasId: string) {
        const canvas = this.canvas.get(canvasId);

        if(!canvas) {
            return [];
        }

        return canvas.stroke;
    }

    removeStroke(canvasId: string, userId: string, x: number, y: number) {
        if(!this.canvas.get(canvasId)) {
            return;
        }

        const strokes = this.canvas.get(canvasId)?.stroke;

        const filteredStrokes = strokes?.filter((stroke) => (!(stroke.x == x) ||  !(stroke.y == y)));

        this.canvas.set(canvasId, {            
            canvasId,
            stroke: filteredStrokes || []
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

    addCursor(canvasId: string, userId: string, x: number, y: number, name: string) {
        if(!this.canvas.get(canvasId)) {
            this.initCanvas(canvasId);
        }

        const canvas = this.canvas.get(canvasId);

        
        if(!canvas?.cursor?.find((cur) => cur.userId == userId)){
            canvas?.cursor?.push({
                id: `${userId}-${Date.now()}`,
                canvasId,
                userId,
                x,
                y,
                name
            })

            return canvas?.cursor || [];
        }

        const updatedCursors = canvas?.cursor?.map((cursor) => {
            if(cursor.userId == userId) {
                return {
                    ...cursor,
                    x: x,
                    y: y
                }
            }

            return cursor;
        })

        canvas.cursor = updatedCursors;

        return canvas?.cursor || [];
    }

}