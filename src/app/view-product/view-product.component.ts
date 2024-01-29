import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{
product:any=[]
constructor(private route:ActivatedRoute, private api:ApiService){}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    console.log(res);
    const {id}=res
    this.getproductDetails(id)
    
  })

}

getproductDetails(id:any){
  this.api.getProductApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      
      this.product=res
    },
    error:(err:any)=>{
      console.log(err.error);
      
    }
  })
}
  addToWishlist(product:any){
    if(localStorage.getItem("token")){
     this.api.addToWishlistApi(product.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert(`product added to the wishlist`)
        
      },
      error:(err:any)=>{
        alert(err.error);
        
      }
     })
    }
    else{
     alert('please login') 
    }
  }
 
  addToCart(product:any){
   if(localStorage.getItem("token")){
     alert('proceed')
    }
    else{
     alert('please login')
    }
  }
}
