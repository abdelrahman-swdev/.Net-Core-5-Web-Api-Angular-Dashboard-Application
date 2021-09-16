import { Injectable } from "@angular/core";
import {  Resolve } from "@angular/router";
import { DepartmentService } from "./department.service";

@Injectable({
    providedIn:'root'
})
export class DepartmentResolver implements Resolve<any>{

    constructor(private depService:DepartmentService) {        
    }
    resolve(){
        return this.depService.getAllDepartments();
    }
}