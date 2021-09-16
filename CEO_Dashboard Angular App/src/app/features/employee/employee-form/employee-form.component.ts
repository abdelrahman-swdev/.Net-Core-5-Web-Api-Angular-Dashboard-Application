import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepartment } from 'src/app/_models/department.model';
import { DepartmentService } from '../../department/department.service';
import { EmployeeService } from '../employee.service';
import { IEmployee } from './../../../_models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employee!: IEmployee;
  departments!: any;

  employeeForm!: FormGroup;
  idControl!: FormControl;
  addressIdControl!: FormControl;
  departmentIdControl!: FormControl;
  fullNameControl!: FormControl;
  ageControl!: FormControl;
  emailControl!: FormControl;
  phoneControl!: FormControl;
  salaryControl!: FormControl;
  countryControl!: FormControl;
  cityControl!: FormControl;
  streetControl!: FormControl;
  addressGroup!: FormGroup;

  constructor(
    private depService: DepartmentService,
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.depService.getAllDepartments().subscribe(result => {
      this.departments = result;
    });
    if (this.route.data) {
      this.route.data.forEach((e) => {
        this.employee = e.employee;
      });
    }
    this.createForm();
  }

  private createForm() {
    this.idControl = this.fb.control(this.employee ? this.employee.id : 0);
    this.addressIdControl = this.fb.control(this.employee ? this.employee.address?.addressId : 0);
    this.fullNameControl = this.fb.control(this.employee?.fullName, [
      Validators.required,
      Validators.maxLength(255),
    ]);
    this.ageControl = this.fb.control(this.employee?.age, [
      Validators.required,
    ]);
    this.emailControl = this.fb.control(this.employee?.email, [
      Validators.required,
      Validators.email,
    ]);
    this.phoneControl = this.fb.control(this.employee?.phoneNumber, [
      Validators.required,
    ]);
    this.salaryControl = this.fb.control(this.employee?.salary, [
      Validators.required,
    ]);
    this.countryControl = this.fb.control(this.employee?.address?.country, [
      Validators.required,
    ]);
    this.cityControl = this.fb.control(this.employee?.address?.city, [
      Validators.required,
    ]);
    this.streetControl = this.fb.control(this.employee?.address?.street, [
      Validators.required,
    ]);
    this.addressGroup = this.fb.group({
      addressId: this.addressIdControl,
      country: this.countryControl,
      city: this.cityControl,
      street: this.streetControl,
    });
    this.departmentIdControl = this.fb.control(this.employee?.departmentId);

    this.employeeForm = this.fb.group({
      id: this.idControl,
      fullName: this.fullNameControl,
      age: this.ageControl,
      email: this.emailControl,
      phoneNumber: this.phoneControl,
      salary: this.salaryControl,
      address: this.addressGroup,
      departmentId: this.departmentIdControl,
    });
  }

  saveEmployee(formValues: any) {
    if (formValues.id != null && formValues.address.addressId != null) {
      this.empService.update(formValues).subscribe(res => {
        if(res){
          this.router.navigate(['/dashboard/employees']);
        }
      },e => {console.error(e)});
      
    } else {
      this.empService.add(formValues).subscribe(result => {
        if(result){
          this.router.navigate(['/dashboard/employees']);
        }
      },er => console.error(er));
    }
  }

  validName() {
    return this.fullNameControl.valid || this.fullNameControl.untouched;
  }
}
