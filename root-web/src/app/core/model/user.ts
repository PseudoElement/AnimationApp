export interface IUser {
    email: string;
    id: string;
    access_token: string;
    created_at: Date;
}

export interface IUserWithoutAccessToken {
    user: Omit<IUserWithName, 'access_token'>;
}

export interface IUserWithName extends IUser {
    name: string;
}
