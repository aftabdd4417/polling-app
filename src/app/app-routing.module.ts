import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { CreatePollComponent } from "./create-poll/create-poll.component";
import { AuthGuard } from "./auth.guard";
export const routes: Routes = [
  {
    path: "",
    redirectTo: "homepage",
    pathMatch: "full"
  },
  {
    path: "homepage",
    component: HomepageComponent,
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
    path: "create-poll",
    component: CreatePollComponent
  },
  {
    path: "**",
    component: LoginFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
