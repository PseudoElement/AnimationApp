export interface IUser {
    email: string;
    password: string;
}

export interface IUserResponse extends IUser {
    userID: number;
}
