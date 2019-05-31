import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  polingtype: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.polingtype = "createPoll";
  }

  showPage(pagetype) {
    this.polingtype = pagetype;
  }
  logOut() {
    localStorage.removeItem("accessToken");
    this.router.navigate(["/login-form"]);
  }
}
