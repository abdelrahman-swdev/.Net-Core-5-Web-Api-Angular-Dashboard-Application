import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { addEmployee, apiUrl, deleteEmployee, employeesCount, getAllEmployees, getEmployee, updateEmployee } from "src/app/shared/constants";
import { IEmployee } from './../../_models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{

    constructor(private http:HttpClient){}


    getAllEmployees():Observable<object>{
        return this.http.get(`${apiUrl}${getAllEmployees}`);
    }

    getById(id:number){
        return this.http.get(`${apiUrl}${getEmployee}${id}`);
    }

    add(employee:any){
        return this.http.post(`${apiUrl}${addEmployee}`,employee);
    }

    update(employee:any){
        return this.http.put(`${apiUrl}${updateEmployee}`,employee);
    }

    delete(id:number){
        return this.http.delete(`${apiUrl}${deleteEmployee}${id}`);
    }

    getCount(){
        return this.http.get(`${apiUrl}${employeesCount}`);
    }
}