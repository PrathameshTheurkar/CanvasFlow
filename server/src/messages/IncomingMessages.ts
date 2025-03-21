import {z} from 'zod';

export enum SupportedMessage  {
    JOIN = 'JOIN',
    DRAW = 'DRAW',
    ERASE = 'ERASE',
    LINE = 'LINE',
    RECTANGLE = 'RECTANGLE',
    CIRCLE = 'CIRCLE',
    CURSOR = 'CURSOR' 
}

export type IncomingMessages = {
    type: SupportedMessage.JOIN,
    payload: JoinMessageType
} | {
    type: SupportedMessage.DRAW,
    payload: DrawMessageType
} | {
    type: SupportedMessage.ERASE,
    payload: EraseMessageType
} | {
    type: SupportedMessage.LINE,
    payload: LineMessageType
} | {
    type: SupportedMessage.RECTANGLE,
    payload: RectangleMessageType
} | {
    type: SupportedMessage.CIRCLE,
    payload: CircleMessageType
} | {
    type: SupportedMessage.CURSOR,
    payload: CursorMessageType
}

export const JoinMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    name: z.string()
})

export type JoinMessageType = z.infer<typeof JoinMessage>;


export const DrawMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    prevX: z.number(),
    prevY: z.number(),
    x: z.number(),
    y: z.number(),
    name: z.string()
})

export type DrawMessageType = z.infer<typeof DrawMessage>;

export const EraseMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    x: z.number(),
    y: z.number()
})

export type EraseMessageType = z.infer<typeof EraseMessage>;

export const LineMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    startX: z.number(),
    startY: z.number(),
    endX: z.number(),
    endY: z.number(),
    name: z.string()
})

export type LineMessageType = z.infer<typeof LineMessage>;

export const RectangleMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    name: z.string()
})

export type RectangleMessageType = z.infer<typeof RectangleMessage>;


export const CircleMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    x: z.number(),
    y: z.number(),
    radius: z.number(),
    name: z.string()
})

export type CircleMessageType = z.infer<typeof CircleMessage>;

export const CursorMessage = z.object({
    canvasId: z.string(),
    userId: z.string(),
    x: z.number(),
    y: z.number(),
    name: z.string()
})

export type CursorMessageType = z.infer<typeof CursorMessage>;