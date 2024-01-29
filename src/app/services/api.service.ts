import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProductApi(id:any){
   return this.http.get(`${this.server_Url}/get-product/${id}`)
  }

  appendTokenToHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }
  addToWishlistApi(id:any){
   return this.http.get(`${this.server_Url}/wishlist/add/${id}`,this.appendTokenToHeader())
  }
}
