import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';
import { BorroweronboardingComponent } from './borroweronboarding/borroweronboarding.component';
import { BorrowerdashboardComponent } from './borrowerdashboard/borrowerdashboard.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganisationOnboardingComponent } from './organisation-onboarding/organisation-onboarding.component';

@NgModule({
  declarations: [
    AppComponent,
    BorrowersignupComponent,
    HomeComponent,
    BorroweronboardingComponent,
    BorrowerdashboardComponent,
    LoanRequestComponent,
    OrganisationOnboardingComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
