import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.css"]
})
export class CreatePollComponent implements OnInit {
  model: any = {};
  pollMessage: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  async addNewPoll(formData) {
    const apiData = {
      pollquest: formData["pollquest"],
      option1: formData["option1"],
      option2: formData["option2"],
      option3: formData["option3"],
      option4: formData["option4"]
    };
    try {
      const res = await this.apiService.addPoll(apiData).toPromise();
      this.pollMessage = res["error"];
    } catch (error) {
      console.error(error);
    }
  }
}
