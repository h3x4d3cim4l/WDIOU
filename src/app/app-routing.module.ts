import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'/', component:IndexComponent},
  {path:'**', component:PageNotFoundComponent}
]

@NgModule({
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
