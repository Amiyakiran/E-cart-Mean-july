import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggined(){
    /* to change into boolean */
    return !!sessionStorage.getItem("token")
  }
}
