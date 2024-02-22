import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { loggedGuard } from './logged.guard';
import { DebtslistComponent } from './debtslist/debtslist.component';
import { PersonlistComponent } from './personlist/personlist.component';
import { PersonpageComponent } from './personpage/personpage.component';

const routes: Routes = [
  {path:'', redirectTo:'/index', pathMatch: 'full'},
  {path:'index', component:IndexComponent, canActivate:[loggedGuard]},
  {path:'login', component:LoginComponent, canActivate: [loggedGuard]},
  {path:'register', component:RegisterComponent, canActivate: [loggedGuard]},
  {path:'home', component:HomeComponent, canActivate:[authGuard]},
  {path:'debts', component:DebtslistComponent, canActivate:[authGuard]},
  {path:'personlist', component:PersonlistComponent, canActivate:[authGuard]},
  {path:'personpage/:id', component:PersonpageComponent, canActivate:[authGuard]},
  {path:'**', component:PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
