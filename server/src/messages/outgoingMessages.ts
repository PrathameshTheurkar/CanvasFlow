export enum SupportedMessage {
    JOIN = 'JOIN',
    DRAW = 'DRAW'
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

export type OutgoingMessage = {
    type: SupportedMessage.DRAW,
    payload: MessagePayload
} | {
    type: SupportedMessage.JOIN,
    payload: Partial<MessagePayload>
}

