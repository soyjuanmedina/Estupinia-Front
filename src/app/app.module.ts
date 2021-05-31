import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePage } from './pages/home/home.page';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ProfilePage } from './pages/profile/profile.page';
import { UserComunicationPage } from './pages/user-comunication/user-comunication.page';
import { PaymentGatewayPage } from './pages/payment-gateway/payment-gateway.page';
import { FooterComponent } from './components/footer/footer.component';
import { ContactPage } from './pages/contact/contact.page';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ConfirmemailPage } from './pages/confirmemail/confirmemail.page';

const agoraConfig: AgoraConfig = {
  AppID: 'ee3542d8f5e941b3abf7e5a2e356c4ac',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePage,
    RegisterPage,
    LoginPage,
    LimitToPipe,
    ProfilePage,
    UserComunicationPage,
    PaymentGatewayPage,
    FooterComponent,
    ContactPage,
    SideMenuComponent,
    ConfirmemailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
