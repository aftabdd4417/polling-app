import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  registrationUrl = environment.apiBaseUrl1 + "/#/registration-form";
  registerdMessage: any;

  constructor(private apiService: ApiService, private router: Router) {}

  model: any = {};
  a(f) {
    console.log(f);
  }
  ngOnInit() {}

  async userLogin(formData) {
    console.log(formData);
    const apiData = {
      username: formData["email"],
      password: formData["password"]
    };
    try {
      const res = await this.apiService.login(apiData).toPromise();
      this.registerdMessage = res["error"];
      if (this.registerdMessage === 0) {
        this.loginUser(apiData);
        this.router.navigate(["homepage"]);
      }

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(apiData) {
    delete apiData["role"];
    const resp = await this.apiService.login(apiData).toPromise();
    if (resp["error"] === 0) {
      localStorage.setItem("accessToken", resp["token"]);
    }
  }
}
