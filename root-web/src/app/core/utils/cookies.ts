import { CookiesKeys } from './../model/cookies';

export function setCookie(
    name: CookiesKeys,
    value: string | number,
    expiration: Date = new Date(Date.now() + 6.048e8)
): void {
    document.cookie = `${name}=${value}; expires=${expiration}; path=/`;
}
export function getCookie(name: CookiesKeys): string | null {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(name))
        ?.split('=')[1];
    return cookieValue ?? null;
}

export function deleteCookie(name: CookiesKeys): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
}
