export interface IMessage {
    id: string;
    text: string;
    authorEmail: string;
    createdAt: Date;
}

export type IMessageWithoutID = Omit<IMessage, 'id'>;

export interface IMessageFromServer {
    body: IMessage;
}

export interface IMessageInStore extends IMessage {
    isMine: boolean;
    name: string;
}
