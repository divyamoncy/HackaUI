import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowerdashboardComponent } from './borrowerdashboard/borrowerdashboard.component';
import { BorroweronboardingComponent } from './borroweronboarding/borroweronboarding.component';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { LendersignupComponent } from './lendersignup/lendersignup.component';
import { SigninComponent } from './signin/signin.component';
import { LenderonboardingComponent } from './lenderonboarding/lenderonboarding.component';
import { NgoSignUpComponent } from './ngo-sign-up/ngo-sign-up.component';
import { OrganisationOnboardingComponent } from './organisation-onboarding/organisation-onboarding.component';
import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  { path: 'borrowersignup', component: BorrowersignupComponent },
  {path: 'borroweronboarding', component: BorroweronboardingComponent},
  {path: 'borrowerdashboard', component: BorrowerdashboardComponent},
  {path: 'loanrequest', component: LoanRequestComponent},
  { path: '', component: HomeComponent },
  { path :'lendersignup', component:LendersignupComponent},
  {path : 'signin', component : SigninComponent},
  {path : 'lenderonboarding', component : LenderonboardingComponent},
  { path: 'organisationOnboarding', component: OrganisationOnboardingComponent },
  { path: 'ngoSignUp', component: NgoSignUpComponent },
  { path: 'getStarted', component: GetStartedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
