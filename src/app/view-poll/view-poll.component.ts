import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { FormControl, FormGroup } from "@angular/forms";
import { PollService } from "../services/poll.service";

@Component({
  selector: "app-view-poll",
  templateUrl: "./view-poll.component.html",
  styleUrls: ["./view-poll.component.css"]
})
export class ViewPollComponent implements OnInit {
  allPolls: any[];
  addOptionToggle: boolean = false;
  updatetitleToggle: boolean = false;
  pollIdToggle: any;
  editQuestion: FormControl;
  addOptionForm: any;
  showSpinner: boolean = false;
  apiInProgress: boolean = false;

  constructor(
    private apiService: ApiService,
    private pollServices: PollService
  ) {}
  spinner: any = this.pollServices.spinnerGif;

  ngOnInit() {
    this.showViewPoll();
    this.editQuestion = new FormControl();
    this.addOptionForm = new FormGroup({
      option: new FormControl("")
    });
  }

  async showViewPoll() {
    this.showSpinner = true;
    try {
      const res = await this.apiService.viewPoll().toPromise();
      this.allPolls = res["data"];
      this.showSpinner = false;
    } catch (error) {
      this.showSpinner = false;
      console.error(error);
    }
  }

  OptionToggle(pollId) {
    this.pollIdToggle = pollId;
    if (this.addOptionToggle) this.addOptionToggle = false;
    else this.addOptionToggle = true;
  }

  async addNewOption(formData, pollId, addFormReference, index) {
    const apiData = {
      option: formData["option"],
      id: pollId
    };
    try {
      const res = await this.apiService.addOption(apiData).toPromise();
      this.allPolls[index].options.push({ option: apiData.option });
      addFormReference.reset();
      this.addOptionToggle = false;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAnOption(id, option, index1, index2) {
    this.apiInProgress = true;
    try {
      const res = await this.apiService.deleteOption(id, option).toPromise();
      this.allPolls[index1].options.splice(index2, 1);
      this.apiInProgress = false;
    } catch (error) {
      this.apiInProgress = true;
      console.error(error);
    }
  }
  async deleteAPoll(id, index1) {
    this.apiInProgress = true;
    try {
      const res = await this.apiService.deletePoll(id).toPromise();
      this.allPolls.splice(index1, 1);
      this.apiInProgress = false;
    } catch (error) {
      this.apiInProgress = true;
      console.error(error);
    }
  }

  updatetitle(id) {
    this.pollIdToggle = id;
    if (this.updatetitleToggle) {
      this.updatetitleToggle = false;
      this.updateTitle(this.pollIdToggle, this.editQuestion.value);
    } else {
      this.updatetitleToggle = true;
    }
  }
  async updateTitle(id, title) {
    this.pollIdToggle = id;
    try {
      const res = await this.apiService.updatePollTitle(id, title).toPromise();
    } catch (error) {
      console.error(error);
    }
  }
}
