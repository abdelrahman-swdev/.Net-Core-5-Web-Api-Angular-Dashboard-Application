import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Injectable({
    providedIn:'root'
})
export class EmployeeFormResolver implements Resolve<any>{

    constructor(private empService:EmployeeService){
    }

    resolve(route:ActivatedRouteSnapshot){
        return this.empService.getById(+route.params['id']);
    }

}
