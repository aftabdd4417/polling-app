import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { CreatePollComponent } from "./create-poll/create-poll.component";
import { AuthGuard } from "./auth.guard";
import { ViewPollComponent } from './view-poll/view-poll.component';
export const routes: Routes = [
  {
    path: "",
    redirectTo: "homepage",
    pathMatch: "full"
  },
  {
    path: "homepage",
    component: HomepageComponent,
    children: [
      {
        path:'',
        redirectTo: 'create-poll',
        pathMatch: 'full' 
    },
      {
        path: "create-poll",
        component: CreatePollComponent
      },
      {
        path: "view-poll",
        component: ViewPollComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "login-form",
    component: LoginFormComponent
  },
  {
    path: "registration-form",
    component: RegistrationFormComponent
  },
 
  {
    path: "**",
    redirectTo: 'login-form',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
