import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  let _auth = inject(AuthService);
  let router = inject(Router);

  if(_auth.getUserSession()=="")
  {
    return true;
  }

  router.navigate(["/home"]);
  return false;
};
