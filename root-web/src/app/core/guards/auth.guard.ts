import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { alerts } from '../constants';
import { ModalService } from '../services/modal.service';
import { CookiesService } from '../services/cookies.service';

export const authGuard: CanActivateFn = (route, state): boolean => {
    const alertService = inject(AlertService);
    const modalService = inject(ModalService);
    const cookiesService = inject(CookiesService);
    const router = inject(Router);
    const token = cookiesService.getAccessToken();
    if (!token) {
        alertService.isOpen$.next(true);
        alertService.message$.next(alerts.needAuth);
        modalService.toggleVisibility('auth');
        const prevRoute = router.url;
        router.navigateByUrl(prevRoute);
        return false;
    }
    return true;
};
