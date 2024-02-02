import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { DebtComponent } from './debt/debt.component';
import { DebtslistComponent } from './debtslist/debtslist.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DebtComponent,
    DebtslistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
