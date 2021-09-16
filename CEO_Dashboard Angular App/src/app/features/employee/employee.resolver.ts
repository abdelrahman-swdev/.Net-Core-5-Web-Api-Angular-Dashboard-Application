import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { IEmployee } from "src/app/_models/employee.model";
import { EmployeeService } from "./employee.service";

@Injectable({
    providedIn:'root'
})
export class EmployeeResolver implements Resolve<object>{

    constructor(private employeeService:EmployeeService) {
    }
    resolve(){
        return this.employeeService.getAllEmployees();
    }
}