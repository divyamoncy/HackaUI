import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorrowersignupComponent } from './borrowersignup/borrowersignup.component';
import { HomeComponent } from './home/home.component';
import { BorroweronboardingComponent } from './borroweronboarding/borroweronboarding.component';

@NgModule({
  declarations: [
    AppComponent,
    BorrowersignupComponent,
    HomeComponent,
    BorroweronboardingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
