import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PollService } from '../services/poll.service';

@Component({
  selector: "app-create-poll",
  templateUrl: "./create-poll.component.html",
  styleUrls: ["./create-poll.component.css"]
})
export class CreatePollComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private pollServices: PollService
  ) {}
  
  pollMessage: any;
  createPollForm: any;
  apiInProgress: boolean;
  spinner: any = this.pollServices.spinnerGif;

  createFormControl() {
    this.createPollForm = new FormGroup({
      pollquest: new FormControl("", [Validators.required]),
      option1: new FormControl("", [Validators.required]),
      option2: new FormControl("", [Validators.required]),
      option3: new FormControl("", [Validators.required]),
      option4: new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.createFormControl();
  }
  async addNewPoll(formValue) {
    const apiData = {
      pollquest: formValue["pollquest"],
      option1: formValue["option1"],
      option2: formValue["option2"],
      option3: formValue["option3"],
      option4: formValue["option4"]
    };
    try {
      this.apiInProgress = true;
      const res = await this.apiService.addPoll(apiData).toPromise();
      this.pollMessage = res["error"];
      this.apiInProgress = false;
      this.createPollForm.reset();
    } catch (error) {
      this.apiInProgress = false;
      console.error(error);
    }
  }
}
