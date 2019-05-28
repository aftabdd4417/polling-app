import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  allUsers1: any = [];

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

  localStorageLogin(user: string, password: string): boolean {
    if (user === "userdemo" && password === "passworddemo") {
      localStorage.setItem("username", user);
      return true;
    }
    return false;
  }
}
