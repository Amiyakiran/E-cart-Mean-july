import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  allProduct:any = []
  cartTotal:number = 0
  constructor(private api:ApiService){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.getCart()
    }
    else{
      this.allProduct = []
    }
   
    
  }

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
  gettotalPrice(){
    if(this.allProduct.length>0){
     this.cartTotal = Math.ceil(this.allProduct.map((item:any)=>item.grandTotal).reduce((amt1:any,amt2:any)=>amt1+amt2))
     console.log(this.cartTotal);
     
    }else{
      this.cartTotal = 0
    }
  }

  //increment count
  
}
