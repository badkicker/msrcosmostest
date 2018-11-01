import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurd } from './services/authGaurd.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate: [AuthGaurd]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent, 
    canActivate: [AuthGaurd]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // {
      //   preloadingStrategy: PreloadAllModules,
      //   // enableTracing: true,
      // }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
