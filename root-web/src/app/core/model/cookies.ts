export type CookiesKeys = 'access_token' | 'id' | 'refresh_token';
export interface IOnUserAuth {
    access_token: string;
    id: string;
    refresh_token: string;
}
