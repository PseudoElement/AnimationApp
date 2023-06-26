export interface IMessage {
    id: string;
    text: string;
    author: string;
    createdAt: Date;
}

export interface IMessageFromServer extends IMessage {
    isMine: boolean;
}
