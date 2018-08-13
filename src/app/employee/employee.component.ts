import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../admin';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  empName:string="";
  designation:string="";
  feedback:string="";
  empId:string="";

  empForm:FormGroup;
  employee:Admin=new Admin();

  constructor(private http: HttpClient, private adminService:AdminService, private frmbuilder:FormBuilder, private router:Router) {
    this.empForm=frmbuilder.group({
      empName:['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ][a-zA-Z ]+')])],
      designation:['',Validators.compose([Validators.required])],
      feedback:['',Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
  }
  saveEmployee(){
    this.adminService.createEmployee(this.employee)
   .subscribe(data => {
     this.router.navigate(['/admin',data]);
   }, error => console.log(error));
   this.employee = new Admin();    
 }
}

