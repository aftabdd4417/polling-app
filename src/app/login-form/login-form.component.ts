import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { PollService } from "../services/poll.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private pollServices: PollService
  ) {}
  
  registerdMessage: any;
  showSpinner: boolean = false;
  spinner: any = this.pollServices.spinnerGif;
  model: any = {};

  ngOnInit() {
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(["/homepage"]);
    }
  }

  async userLogin(formData) {
    this.showSpinner = true;
    try {
      const apiData = {
        username: formData["email"],
        password: formData["password"]
      };
      const res = await this.apiService.login(apiData).toPromise();
      this.registerdMessage = res["error"];
      if (this.registerdMessage === 0) {
        localStorage.setItem("accessToken", res["token"]);
        this.showSpinner = false;
        this.router.navigate(["homepage"]);
      }
    } catch (error) {
      this.showSpinner = false;
      console.error(error);
    }
    this.showSpinner = false;
  }
}
