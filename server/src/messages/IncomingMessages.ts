import {z} from 'zod';

export enum SupportedMessage  {
    JOIN = 'JOIN',
    DRAW = 'DRAW'
}

export type IncomingMessages = {
    type: SupportedMessage.JOIN,
    payload: JoinMessageType
} | {
    type: SupportedMessage.DRAW,
    payload: DrawMessageType
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
    x: z.number(),
    y: z.number(),
    name: z.string()
})

export type DrawMessageType = z.infer<typeof DrawMessage>;