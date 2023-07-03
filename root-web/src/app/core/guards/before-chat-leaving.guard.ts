import { CanActivateFn } from '@angular/router';
import { Cookies } from '../utils';

export const beforeChatLeavingGuard: CanActivateFn = (route, state) => {
    const token = Cookies.getCookie('token');
    if (!token) return true;
    const isOk = window.confirm('Do you really want to leave chat?');
    if (!isOk) return false;
    return true;
};
