import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlePage } from './pages/article/article.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ProfilePage } from './pages/profile/profile.page';
import { RegisterPage } from './pages/register/register.page';
import { PaymentGatewayPage } from './pages/payment-gateway/payment-gateway.page';
import { ContactPage } from './pages/contact/contact.page';


const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: ProfilePage },
  { path: 'contact', component: ContactPage },
  { path: 'paymentgateway', component: PaymentGatewayPage },
  { path: 'article/:id', component: ArticlePage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
