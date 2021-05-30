import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserComunicationPage } from './pages/user-comunication/user-comunication.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { RegisterPage } from './pages/register/register.page';
import { PaymentGatewayPage } from './pages/payment-gateway/payment-gateway.page';
import { ContactPage } from './pages/contact/contact.page';
import { ConfirmemailPage } from './pages/confirmemail/confirmemail.page';


const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: ProfilePage },
  { path: 'contact', component: ContactPage },
  { path: 'paymentgateway', component: PaymentGatewayPage },
  { path: 'usertocomunicate/:id', component: UserComunicationPage },
  { path: 'confirmemail/:id', component: ConfirmemailPage }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
