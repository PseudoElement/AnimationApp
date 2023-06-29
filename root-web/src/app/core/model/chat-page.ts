export interface IMessage {
    id: string;
    text: string;
    authorEmail: string;
    createdAt: Date;
}

export interface IMessageFromServer {
    body: IMessage;
}

export interface IMessageInStore extends IMessage {
    isMine: boolean;
    name: string;
}
