import { LoginGuard } from './login.guard';
import { RoleGuard } from './role.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { FilterPipeModule } from 'ngx-filter-pipe';

//app component
import { AppComponent } from './app.component';

//login components
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import { ConnectComponent } from './login/connect/connect.component';
import { ForgetPassComponent } from './login/forget-pass/forget-pass.component';
import { ResetPassComponent } from './login/reset-pass/reset-pass.component';
import { ResetSuccessComponent } from './login/reset-success/reset-success.component';
import { ForgetSuccessComponent } from './login/forget-success/forget-success.component';

// Material Modules
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select"
import {MatToolbarModule} from '@angular/material/toolbar' ;
import {MatSidenavModule} from '@angular/material/sidenav' ;
import {MatBadgeModule} from '@angular/material/badge' ;
import {MatListModule} from '@angular/material/list' ;
import {MatCardModule} from '@angular/material/card' ;
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule } from '@angular/material/button' ;
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';



//admin components
import { AdminComponent } from './admin/admin.component' ;
import { EtudiantsComponent } from './admin/etudiants/etudiants.component';
import { AjouterEtudiantComponent } from './admin/etudiants/ajouter-etudiant/ajouter-etudiant.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { EtudiantsListComponent } from './admin/etudiants/etudiants-list/etudiants-list.component';
import {EtudiantsService} from './etudiants.service';
import { DialogLoadingComponent } from './admin/etudiants/ajouter-etudiant/dialog-loading/dialog-loading.component' ;
import { MatNativeDateModule } from '@angular/material/core';
import { SafeHtmlPipePipe } from './safe-html-pipe.pipe';
import { ProfileComponent } from './admin/etudiants/profile/profile.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConnectComponent,
    ForgetPassComponent,
    ResetPassComponent,
    ResetSuccessComponent,
    ForgetSuccessComponent,
    AdminComponent,
    EtudiantsComponent,
    AjouterEtudiantComponent,
    EtudiantsListComponent,
    DialogLoadingComponent,
    SafeHtmlPipePipe,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    BrowserAnimationsModule,
    HttpClientModule ,
    MatIconModule,
    MatInputModule ,
    MatFormFieldModule ,
    MatSelectModule ,
    MatCardModule ,
    MatToolbarModule ,
    MatSidenavModule ,
    MatBadgeModule ,
    MatListModule,
    MatCardModule,
    NgScrollbarModule ,
    MatStepperModule ,
    MatButtonModule ,
    MatProgressBarModule,
    FormsModule ,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatDialogModule ,
    StorageServiceModule ,
    FilterPipeModule ,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/login']
      }
    })
  ],
  entryComponents: [
    DialogLoadingComponent
  ],
  providers: [AuthService , RoleGuard , LoginGuard , EtudiantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
