import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { PersonlistComponent } from './personlist/personlist.component';
import { PersonComponent } from './person/person.component';
import { PersonpageComponent } from './personpage/personpage.component';
import { DebtcolComponent } from './debtcol/debtcol.component';
import { DebtpageComponent } from './debtpage/debtpage.component';
import { DebtCreateComponent } from './debt-create/debt-create.component';
import { PersonCreateComponent } from './person-create/person-create.component';

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
    PersonlistComponent,
    PersonComponent,
    PersonpageComponent,
    DebtcolComponent,
    DebtpageComponent,
    DebtCreateComponent,
    PersonCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
