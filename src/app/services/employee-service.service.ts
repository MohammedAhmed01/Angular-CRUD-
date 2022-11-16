import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private http: HttpClient) {}

  //Add data in json-server
  postEmployee(data: any) {
    return this.http.post('http://localhost:3000/Employee/', data);
  }
  //Get data from json-server
  getEmployee() {
    return this.http.get('http://localhost:3000/Employee/');
  }
  //Edit data in json-server
  putEmployee(data: any, id: number) {
    return this.http.put('http://localhost:3000/Employee/' + id, data);
  }
  //Delete data in json-server
  deleteEmploye(id: number) {
    return this.http.delete('http://localhost:3000/Employee/' + id);
  }


}
