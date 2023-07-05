import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Cookies } from '../utils';
import { CookiesService } from '../services/cookies.service';

export const beforeChatLeavingGuard: CanActivateFn = (route, state) => {
    const cookiesService = inject(CookiesService);
    const token = cookiesService.getAccessToken();
    if (!token) return true;
    const isOk = window.confirm('Do you really want to leave chat?');
    if (!isOk) return false;
    return true;
};
