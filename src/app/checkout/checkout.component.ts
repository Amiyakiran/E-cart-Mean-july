import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
   proceedToStatus:boolean=false
   totalAmount:string=""
  checkoutForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:['',[Validators.required,Validators.pattern('[a-zA-Z0-9:, ]*')]],
    place:['',[Validators.required,Validators.pattern('[a-zA-Z., ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder){}

cancel(){
  this.checkoutForm.reset()
}
proceedToBuy(){
  if(this.checkoutForm.valid){
    this.proceedToStatus=true
    if(sessionStorage.getItem("total")){
      this.totalAmount = sessionStorage.getItem("total") ||""
    }
  }else{
    alert('invalid form')
  }
}
back(){
  this.proceedToStatus=false
}
}
