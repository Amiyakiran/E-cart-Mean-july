import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  allProduct:any = []
  cartTotal:number = 0
  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }
    else{
      this.allProduct = []
    }
   
    
  }
//to get total items in the cart
  getCart(){
    this.api.getCartApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProduct = res
        this.gettotalPrice()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  //to find the price of all items in the cart
  gettotalPrice(){
    if(this.allProduct.length>0){
     this.cartTotal = Math.ceil(this.allProduct.map((item:any)=>item.grandTotal).reduce((amt1:any,amt2:any)=>amt1+amt2))
     console.log(this.cartTotal);
     
    }else{
      this.cartTotal = 0
    }
  }

  //increment count
  incrementCart(id:any){
   this.api.cartIncrement(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getCart()
      this.api.getCartCount()
    },
    error:(err:any)=>{
      console.log(err);
      
    }

   })
  }

  decrementCart(id:any){
    this.api.cartDecrement(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getCart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
  
     })
  }

  removeItem(id:any){
    this.api.removeCartItemApi(id).subscribe((res:any)=>{
      this.getCart()
      this.api.getCartCount()
    })
  }

  emptyCart(){
    this.api.emptyCartApi().subscribe((res:any)=>{
      this.getCart()
      this.api.getCartCount()
    })
  }

  checkout(){
    sessionStorage.setItem("total",JSON.stringify(this.cartTotal))
    this.router.navigateByUrl('/user/checkout')
  }
}
