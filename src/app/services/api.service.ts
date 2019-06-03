import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addUser(apiData) {
    try {
      return this.http.post(
        "https://secure-refuge-14993.herokuapp.com/add_user?username=" +
          apiData.username +
          "&password=" +
          apiData.password +
          "&role=" +
          apiData.role,
        apiData
      );
    } catch (error) {
      throw error;
    }
  }

  login(apiData) {
    try {
      return this.http.post(
        "https://secure-refuge-14993.herokuapp.com/login?username=" +
          apiData.username +
          "&password=" +
          apiData.password,
        apiData
      );
    } catch (error) {
      throw error;
    }
  }

  addPoll(apiData) {
    try {
      return this.http.post(
        "https://secure-refuge-14993.herokuapp.com/add_poll?title=" +
          apiData.pollquest +
          "&options=" +
          apiData.option1 +
          "____" +
          apiData.option2 +
          "____" +
          apiData.option3 +
          "____" +
          apiData.option4,
        apiData
      );
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem("accessToken");
  }

  viewPoll(apiData?) {
    try {
      return this.http.get(
        "https://secure-refuge-14993.herokuapp.com/list_polls"
      );
    } catch (error) {
      throw error;
    }
  }
  addOption(apiData) {
    try {
      return this.http.post(
        "https://secure-refuge-14993.herokuapp.com/add_new_option?id="+apiData.id+"&option_text="+apiData.option,
        apiData
      );
    } catch (error) {
      throw error;
    }
  }
  
  viewAPoll(id) {
    try {
      return this.http.get(
        "https://secure-refuge-14993.herokuapp.com/list_poll?id="+id
      );
    } catch (error) {
      throw error;
    }
  }
  deleteOption(id,option) {
    try {
      return this.http.delete(
        "https://secure-refuge-14993.herokuapp.com/delete_poll_option?id="+id+"&option_text="+option
      );
    } catch (error) {
      throw error;
    }
  }
  deletePoll(id) {
    try {
      return this.http.delete(
        "https://secure-refuge-14993.herokuapp.com/delete_poll?id="+id
      );
    } catch (error) {
      throw error;
    }
  }
  updatePollTitle(id,title) {
    try {
      return this.http.put(
        "https://secure-refuge-14993.herokuapp.com/update_poll_title?id="+id+"&title=newtitle"+title,
        id
      );
    } catch (error) {
      throw error;
    }
  }

}

