import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  if(authService.checkLogged())
  {
    return true;
  }
  else
  {
    const router = new Router();
    router.navigate(["/index"]);
    return false
  }
};
