import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GoodsComponent } from './components/goods/goods.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignupComponent } from './components/signup/signup.component';
import { SwitchConfirmEmailPassComponent } from './components/switch-confirm-email-pass/switch-confirm-email-pass.component';
import { UpdateGoodComponent } from './components/update-good/update-good.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { path:'forgot-password', component:ForgotPasswordComponent },
  { path:'verify-email', component:VerifyEmailComponent },
  { path:'confirm-email', component:ConfirmEmailComponent },
  { path:'confirm-password', component:ConfirmPasswordComponent },
  { path:'switch-confirm-email-pass', component:SwitchConfirmEmailPassComponent },
  { path:'cart', component:CartComponent},
  { path:'orders/:id', component:OrdersComponent},
  { path:'account/:id', component:AccountComponent},
  { path:'admin', component:GoodsComponent },
  { path:'updateGood/:id', component:UpdateGoodComponent },
  { path:'**', component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
