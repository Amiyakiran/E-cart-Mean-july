import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig ? : IPayPalConfig;


   proceedToStatus:boolean=false
   proceedToPaymentStatus :boolean=false
   totalAmount:string=""
  checkoutForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:['',[Validators.required,Validators.pattern('[a-zA-Z0-9:, ]*')]],
    place:['',[Validators.required,Validators.pattern('[a-zA-Z., ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder , private api:ApiService,private router:Router){}

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
makePayment(){
  this.proceedToPaymentStatus=true
  this.initConfig()
}
private initConfig(): void {
  this.payPalConfig = {
      currency: 'USD',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                /* change currency into usd */
                  currency_code: 'USD',
                  /* change values into total amount the variable which holdes the total amount */
                  value: this.totalAmount,
                  breakdown: {
                      item_total: {
                          currency_code: 'USD',
                          value: this.totalAmount
                      }
                  }
              },
              /* items are removed because no need to keep the details of the purchased product */
          }]
      },
      advanced: {
          commit: 'true'
      },
      /* paypal styling */
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      /* what to happen on approval -give the type to details*/
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details:any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
          });

      },
      /* function will be invoked when the payment is successfull */
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
         this.api.emptyCartApi().subscribe((res:any)=>{
          this.api.getCartCount()
          alert("Payment successful")
          this.proceedToStatus=false
          this.proceedToPaymentStatus=false
          this.checkoutForm.reset()
          this.router.navigateByUrl("/")
         })
      },

      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          alert("Transaction has been cancelled")
          this.proceedToPaymentStatus=false

      },
      /* in case of any error in the gateway or api call */
      onError: err => {
          console.log('OnError', err);
          alert("Transaction has been cancelled ...please try after sometime")
          this.proceedToPaymentStatus=false
          
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      }
  };
}
}
