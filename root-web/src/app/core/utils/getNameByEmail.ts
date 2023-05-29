export function getNameByEmail(email: string): string {
    return email.split('@')[0];
}
