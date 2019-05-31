import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { CreatePollComponent } from "./create-poll/create-poll.component";
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    HomepageComponent,
    CreatePollComponent
  ],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, AppRoutingModule, HttpClientModule],
  providers: [ApiService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
