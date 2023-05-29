export interface UserOnServer {
    email: string | null;
    name: string | null;
    password: string | null;
    id: string | null;
    token: string | null;
}

export type UserOnClient = Omit<UserOnServer, 'password'>;
