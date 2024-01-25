import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_Url ='http://localhost:3000'

  constructor(private http:HttpClient) { }

  getAllproductapi(){
    return this.http.get(`${this.server_Url}/products/all`)
  }

  registerApi(user:any){
    return this.http.post(`${this.server_Url}/register`,user)
  }

  loginApi(user:any){
    return this.http.post(`${this.server_Url}/login`,user)
  }
}
