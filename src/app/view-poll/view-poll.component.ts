import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-view-poll",
  templateUrl: "./view-poll.component.html",
  styleUrls: ["./view-poll.component.css"]
})
export class ViewPollComponent implements OnInit {
  allPolls: any[];
  ner: any = 20 + "%";
  optionMessage: any;
  adOptionToggle: boolean = false;
  updatetitleToggle: boolean = false;
  pollIdToggle: any;

  editQuestion: FormControl;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.showViewPoll();
    this.editQuestion = new FormControl();
  }

  async showViewPoll() {
    try {
      const res = await this.apiService.viewPoll().toPromise();
      this.allPolls = res["data"];
      console.log(res);
      console.log(res["data"].length);
    } catch (error) {
      console.error(error);
    }
  }

  OptionToggle(pollId) {
    this.pollIdToggle = pollId;
    if (this.adOptionToggle) this.adOptionToggle = false;
    else this.adOptionToggle = true;
  }
  async addNewOption(formData, pollId, f) {
    const apiData = {
      option: formData["option"],
      id: pollId
    };
    try {
      const res = await this.apiService.addOption(apiData).toPromise();
      this.optionMessage = res["error"];
      console.log(res);
      console.log(this.optionMessage);
      f.reset();
      this.adOptionToggle = false;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAnOption(id, option) {
    try {
      const res = await this.apiService.deleteOption(id, option).toPromise();
      const st = await this.apiService.viewAPoll(id).toPromise();
      console.log(res);
      console.log(st["data"]);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteAPoll(id) {
    try {
      const res = await this.apiService.deletePoll(id).toPromise();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  updatetitle(id) {
    this.pollIdToggle = id;
    if (this.updatetitleToggle) {
      this.updatetitleToggle = false;
      console.log(this.editQuestion);
      //this.updateTitle(this.pollIdToggle, this.editQuestion);
    } else {
      console.log(id);
      this.updatetitleToggle = true;
    }
  }
  async updateTitle(id, title) {
    this.pollIdToggle = id;
    console.log(title);

    // try {
    //   const res = await this.apiService.updatePollTitle(id, title).toPromise();
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    // }
  }
}
