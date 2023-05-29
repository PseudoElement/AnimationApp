export interface UserOnServer {
    email: string;
    name: string;
    password: string;
    id: string;
    token: string;
}

export interface UserOnClient {
    email: string | null;
    name: string | null;
    id: string | null;
    token: string | null;
}
