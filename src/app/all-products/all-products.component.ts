import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  allproduct:any=[]
  constructor(private api:ApiService){}

 ngOnInit(): void {
   this.api.getAllproductapi().subscribe({
    next:(res:any)=>{
       this.allproduct = res
       console.log(this.allproduct);
       
    },
    error:(err:any)=>{
      console.log(err);
      
    }
   })

 }

 addToWishlist(product:any){
   if(sessionStorage.getItem("token")){
    this.api.addToWishlistApi(product).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert('product added successfully')
        this.api.getwishlistCount()
        
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

 addToCart(product:any){
  if(sessionStorage.getItem("token")){
    alert('proceed')
   }
   else{
    alert('please login')
   }
 }
}
