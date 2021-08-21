import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'login', component: LoginComponent  },
  { path: '', component: LoginComponent  }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
