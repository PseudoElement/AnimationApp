export interface IUser {
    email: string;
    id: string;
    access_token: string;
    refresh_token: string;
    created_at: Date;
}

export interface IUserWithoutTokens {
    user: Omit<IUserWithName, 'access_token' | 'refresh_token'>;
}

export interface IUserWithName extends IUser {
    name: string;
}
