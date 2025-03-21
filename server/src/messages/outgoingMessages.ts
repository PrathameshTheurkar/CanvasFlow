export enum SupportedMessage {
    JOIN = 'JOIN',
    DRAW = 'DRAW',
    ERASE = 'ERASE',
    LINE = 'LINE',
    RECTANGLE = 'RECTANGLE',
    CIRCLE = "CIRCLE",
    CURSOR = 'CURSOR'
}

type MessagePayload = {
    canvasId: string;
    userId: string;
    name: string;
    prevX: number;
    prevY: number;
    x: number;
    y: number;
}

type UpdateMessageUpload = {
    canvasId: string;
    userId: string;
    x: number;
    y: number;
}

type LineMessagePayload = {
    canvasId: string,
    userId: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    name: string
}

type RectangleMessagePayload = {
    canvasId: string;
    userId: string;
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
}

type CircleMessagePayload = {
    canvasId: string;
    userId: string;
    x: number;
    y: number;
    radius: number;
    name: string;
} 

type CursorMessagePayload = {
    canvasId: string,
    userId: string,
    x: number,
    y: number,
    name: string
}

type JoinMessagePayload = {
    canvasId: string,
    userId: string,
    name: string,
}

export type OutgoingMessage = {
    type: SupportedMessage.DRAW,
    payload: MessagePayload
} | {
    type: SupportedMessage.JOIN,
    payload: JoinMessagePayload
} | {
    type: SupportedMessage.ERASE,
    payload: UpdateMessageUpload
} | {
    type: SupportedMessage.LINE,
    payload: LineMessagePayload    
} | {
    type: SupportedMessage.RECTANGLE,
    payload: RectangleMessagePayload
} | {
    type: SupportedMessage.CIRCLE,
    payload: CircleMessagePayload
} | {
    type: SupportedMessage.CURSOR,
    payload: CursorMessagePayload
}

