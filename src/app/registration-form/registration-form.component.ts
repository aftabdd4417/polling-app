import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { modelGroupProvider } from "@angular/forms/src/directives/ng_model_group";
import { ApiService } from "../services/api.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"]
})
export class RegistrationFormComponent implements OnInit {
  model: any = {};
  users: any = ["Admin", "Guest"];
  yourData: any = {};
  newUserData: any;
  registerdMessage: any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  async addNewUser(formData) {
    console.log(formData);
    const apiData = {
      username: formData["email"],
      password: formData["password"],
      role: formData["selectuser"]
    };
    try {
      const res = await this.apiService.addUser(apiData).toPromise();
      this.registerdMessage = res["error"];
      if (this.registerdMessage === 0) {
        this.loginUser(apiData);
        this.router.navigate(["homepage"]);
      }

      // console.log(res);
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
