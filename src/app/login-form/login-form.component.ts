import { Component, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  registerdMessage: any;
  constructor(private apiService: ApiService, private router: Router) {}
  model: any = {};
  ngOnInit() {
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(["/homepage"]);
    }
  }

  async userLogin(formData) {
    try {
      const apiData = {
        username: formData["email"],
        password: formData["password"]
      };
      const res = await this.apiService.login(apiData).toPromise();
      this.registerdMessage = res["error"];
      if (this.registerdMessage === 0) {
        this.loginUser(apiData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async loginUser(apiData) {
    delete apiData["role"];
    const resp = await this.apiService.login(apiData).toPromise();
    if (resp["error"] === 0) {
      localStorage.setItem("accessToken", resp["token"]);
      this.router.navigate(["homepage"]);
    }
  }
}
