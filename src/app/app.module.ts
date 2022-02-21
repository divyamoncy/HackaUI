import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';
import { BorroweronboardingComponent } from './borroweronboarding/borroweronboarding.component';
import { BorrowerdashboardComponent } from './borrowerdashboard/borrowerdashboard.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LendersignupComponent } from './lendersignup/lendersignup.component';
import { SigninComponent } from './signin/signin.component';
import { LenderonboardingComponent } from './lenderonboarding/lenderonboarding.component';

@NgModule({
  declarations: [
    AppComponent,
    BorrowersignupComponent,
    HomeComponent,
    BorroweronboardingComponent,
    BorrowerdashboardComponent,
    LoanRequestComponent,
    LendersignupComponent,
    SigninComponent,
    LenderonboardingComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
