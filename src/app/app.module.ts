import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePage } from './pages/home/home.page';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ProfilePage } from './pages/profile/profile.page';
import { ArticlePage } from './pages/article/article.page';
import { PaymentGatewayPage } from './pages/payment-gateway/payment-gateway.page';
import { FooterComponent } from './components/footer/footer.component';
import { ContactPage } from './pages/contact/contact.page';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    RegisterPage,
    LoginPage,
    LimitToPipe,
    ProfilePage,
    ArticlePage,
    PaymentGatewayPage,
    FooterComponent,
    ContactPage,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
