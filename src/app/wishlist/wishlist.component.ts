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

}
