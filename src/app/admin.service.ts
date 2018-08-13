import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = '//localhost:9090/api/';
  
  constructor(private http: HttpClient) { }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(this.baseUrl+`employee/create`, employee);
  }

  getAllEmployee():Observable<any> {
    return this.http.get(this.baseUrl+'/employees');
  }

  getOneEmployee(empId: string){
    return this.http.get(this.baseUrl+'employee/'+empId);
  }

  editOneEmployee(empId: string, employee: Object):Observable<any>{
    return this.http.put(this.baseUrl+'employee/'+empId, employee);
  }

  deleteOneEmployee(empId: string){
    return this.http.delete(this.baseUrl+'employee/'+empId);
  }

  deleteAllEmployee(){
    return this.http.delete(this.baseUrl+'employee/delete');
  }
   
}
