export interface IUser {
    email: string;
    id: string;
    access_token: string;
    created_at: Date;
}

export interface IUserWithName extends IUser {
    name: string;
}
