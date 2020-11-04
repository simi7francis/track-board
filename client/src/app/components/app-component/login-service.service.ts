import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  readonly baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  checkLoginCredentials(user) {
    console.log(user)
    return this.http.post(this.baseURL + "/api/v1/auth/signin", user);
  }
  getAllUsers() {
    return this.http.get(this.baseURL + "/api/v1/users?role=executive");
  }
  getSingleDetailsById(id) {
    console.log(id)
    return this.http.get(`${this.baseURL}/api/v1/schedules?executive_id=${id}`);
  }

  createSchedule(in_time, out_time, retailer_name, executive_id) {
    return this.http.post(this.baseURL + "/api/v1/schedules", { executive_id, retailer_name, in_time, out_time });
  }

  // getEmployeeList() {
  //   return this.http.get(this.baseURL);
  // }

  // putEmployee(emp: Employee) {
  //   return this.http.put(this.baseURL + `/${emp._id}`, emp);
  // }

  // deleteEmployee(_id: string) {
  //   return this.http.delete(this.baseURL + `/${_id}`);
  // }
}
