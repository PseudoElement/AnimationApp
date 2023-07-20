export type CookiesKeys = 'access_token' | 'id' | 'refresh_token';
export interface IOnUserAuth {
    access_token: string;
    id: number | string;
    refresh_token: string;
}
