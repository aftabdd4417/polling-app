import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { HomepageComponent } from "./homepage/homepage.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login-form",
    pathMatch: "full"
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
    path: "homepage",
    component: HomepageComponent
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
