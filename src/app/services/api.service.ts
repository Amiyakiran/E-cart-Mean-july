import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_Url ='http://localhost:3000'

  /* variable for behaviour subject */
  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)


  constructor(private http:HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getwishlistCount()
      this.getCartCount()
    }
   }

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
  addToWishlistApi(product:any){
   return this.http.post(`${this.server_Url}/wishlist/add`,product,this.appendTokenToHeader())
  }
getWishListapi(){
  return this.http.get(`${this.server_Url}/wishlist/get-products`,this.appendTokenToHeader())
}
  //behaviour subject
  getwishlistCount(){
 this.getWishListapi().subscribe((res:any)=>{
  this.wishlistCount.next(res.length)
 })
  }


  removefromwishlistApi(id:any){
  return  this.http.delete(`${this.server_Url}/remove-wishlist/${id}`,this.appendTokenToHeader())
  }

  addToCartApi(product:any){
    return this.http.post(`${this.server_Url}/add-cart`,product,this.appendTokenToHeader())

  }

  getCartApi(){
    return this.http.get(`${this.server_Url}/cart/get-allproduct`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartApi().subscribe((res:any)=>{
     this.cartCount.next(res.length)
    })
  }

}
