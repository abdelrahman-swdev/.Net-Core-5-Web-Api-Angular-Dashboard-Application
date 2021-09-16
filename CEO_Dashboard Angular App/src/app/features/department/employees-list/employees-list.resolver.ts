import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DepartmentService } from '../department.service';

@Injectable({
    providedIn:'root'
})
export class EmployeesListResolver implements Resolve<any>{

    constructor(private depService:DepartmentService){}

    resolve(route:ActivatedRouteSnapshot){
        return this.depService.getById(+route.params['id']);
    }
}