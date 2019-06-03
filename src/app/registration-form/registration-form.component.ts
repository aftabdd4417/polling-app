import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { PollService } from "../services/poll.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"]
})
export class RegistrationFormComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private pollServices: PollService
  ) {}
  model: any = {};
  users: any = ["Admin", "Guest"];
  registerdMessage: any;
  showSpinner: boolean = false;
  spinner: any = this.pollServices.spinnerGif;
  
  ngOnInit() {
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(["/homepage"]);
    }
  }

  async addNewUser(formData) {
    this.showSpinner = true;

    const apiData = {
      username: formData["email"],
      password: formData["password"],
      role: formData["selectuser"]
    };

    try {
      const res = await this.apiService.addUser(apiData).toPromise();
      this.registerdMessage = res["error"];
      this.showSpinner = false;
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
