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
}
