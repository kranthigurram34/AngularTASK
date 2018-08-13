import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { FormGroup, FormArray, FormControl, FormBuilder, NgForm, Validators, ValidatorFn  } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../admin';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  empId:string="";
  empName:string="";
  designation:string="";
  feedback:string="";

  empForm:FormGroup;
  

   employees: Array<any>;
   showNew: Boolean = false;
   selectedRow: number;
   admin: Admin;

   constructor(private http: HttpClient, private adminService: AdminService, private frmbuilder:FormBuilder, private router:Router) {
    this.empForm=frmbuilder.group({
      empName:['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ][a-zA-Z ]+')])],
      
      designation:['',Validators.compose([Validators.required])],
         feedback:['',Validators.compose([Validators.required])]
    });
   }
  ngOnInit() {
    this.adminService.getAllEmployee().subscribe(data =>{
      this.employees = data;
    })
  }

   onNew() {
    /* this.showNew = true; */
    this.router.navigate(['/employee']);
  } 

  onEdit(index: number,admin,empId){
    this.showNew = true;
    this.selectedRow = index;
    this.admin=admin;
    this.admin.empId=empId;
  }

  editEmployee(empId,admin){
    this.empId=empId;
    this.admin=admin;
    this.adminService.editOneEmployee(empId,admin)
    .subscribe(data =>{
      this.router.navigate(['/admin',data]);
    }, error => console.log(error));
    this.showNew = false;
  }

  onDelete(index: number,empId){
    this.adminService.deleteOneEmployee(empId)
    .subscribe(()=>{
      this.employees.splice(index, 1);
      console.log(empId);
    });
  }

  onDeleteAll(){
    this.adminService.deleteAllEmployee()
      .subscribe(()=>{this.router.navigate(['/employee',]);
    },error => console.log(error));  
     this.router.navigate(['/employee']); 
  }

  onCancel() {
    this.showNew = false;
  }

}