import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowerdashboardComponent } from './borrowerdashboard/borrowerdashboard.component';
import { BorroweronboardingComponent } from './borroweronboarding/borroweronboarding.component';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'borrowersignup', component: BorrowersignupComponent },
  {path: 'borroweronboarding', component: BorroweronboardingComponent},
  {path: 'borrowerdashboard', component: BorrowerdashboardComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
