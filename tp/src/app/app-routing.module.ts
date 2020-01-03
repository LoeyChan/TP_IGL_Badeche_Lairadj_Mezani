import { EtudiantsListComponent } from './admin/etudiants/etudiants-list/etudiants-list.component';
import { LoginGuard } from './login.guard';
import { AjouterEtudiantComponent } from './admin/etudiants/ajouter-etudiant/ajouter-etudiant.component';
import { EtudiantsComponent } from './admin/etudiants/etudiants.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConnectComponent } from './login/connect/connect.component';
import { ForgetPassComponent } from './login/forget-pass/forget-pass.component';
import { ResetPassComponent } from './login/reset-pass/reset-pass.component';
import { ResetSuccessComponent } from './login/reset-success/reset-success.component';
import { ForgetSuccessComponent } from './login/forget-success/forget-success.component' ;
import {RoleGuard} from './role.guard' ;
import { AdminComponent } from './admin/admin.component' ;
import { ProfileComponent } from './admin/etudiants/profile/profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';


const routes: Routes = [
  {path : '' , redirectTo : '/login' , pathMatch : "full" } ,
  {
    path : 'login' ,
    component : LoginComponent ,
    canActivate : [LoginGuard] ,
    children : [
      { path : '' ,component : ConnectComponent} ,
      { path : 'mot_de_passe_oublie' ,component : ForgetPassComponent} ,
      { path : 'mot_de_passe_oublie_succee' ,component : ForgetSuccessComponent } ,
      { path : 'mot_de_passe_recupere/:token' ,component : ResetPassComponent} ,
      { path : 'mot_de_passe_recupere_succee' ,component : ResetSuccessComponent } ,
    ]
  } ,
  {
    path : 'admin' ,
    component : AdminComponent ,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    } ,
    children : [
      {
        path : '' ,
        component : DashboardComponent
      },
      {
        path : 'etudiants' ,
        component : EtudiantsComponent ,
        children : [
          {
            path  : '' ,
            component : EtudiantsListComponent
          },
          {
            path : 'ajouter' ,
            component : AjouterEtudiantComponent
          },
          {
            path : 'profile/:id' ,
            component : ProfileComponent
          }
        ]
      }
    ]
  } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
