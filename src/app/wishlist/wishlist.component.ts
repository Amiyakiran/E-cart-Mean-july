import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlist:any = []
  constructor(private api:ApiService){}
  ngOnInit(): void {
   this.getwishlist()
  }

  getwishlist(){
    this.api.getWishListapi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.wishlist = res
        this.api.getwishlistCount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  removeItem(id:any){
      this.api.removefromwishlistApi(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.getwishlist()
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
     Object.assign(product,{quantity:1})
     this.api.addToCartApi(product).subscribe({
       next:(res:any)=>{
         console.log(res);
         alert('product added successfully')
         this.api.getCartCount()
         this.removeItem(product._id)
         
       },
       error:(err:any)=>{
         console.log(err);
         alert(err.error)
         
       }
     })
     }
     else{
      alert('please login')
     }
   }

}
