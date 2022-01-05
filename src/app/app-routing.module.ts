import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'borrowersignup', component: BorrowersignupComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
