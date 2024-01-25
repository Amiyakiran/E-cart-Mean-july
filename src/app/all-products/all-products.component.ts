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
   if(localStorage.getItem("token")){
    alert('proceed')
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
