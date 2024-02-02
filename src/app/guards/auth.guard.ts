import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authStatus = inject(AuthService)
  const router = inject(Router)
  if(authStatus.isLoggined()){
    return true;
  }else{
     alert("operation denied please login")
     router.navigateByUrl("/")
    return false
  }
  
};
