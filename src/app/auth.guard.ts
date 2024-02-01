import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _auth = inject(AuthService);
  let router = inject(Router);

  if(_auth.getUserSession()!="")
  {
    return true;
  }

  router.navigate(["/login"]);
  return false;
};
