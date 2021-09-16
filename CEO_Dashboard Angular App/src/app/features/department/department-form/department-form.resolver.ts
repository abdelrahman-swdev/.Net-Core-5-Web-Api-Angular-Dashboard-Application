import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { DepartmentService } from "../department.service";

@Injectable({
    providedIn:'root'
})
export class DepartmentFormResolver implements Resolve<any>{

    constructor(private depService:DepartmentService){
    }
    resolve(route:ActivatedRouteSnapshot):any{
        return this.depService.getById(+route.params['id']);
    }
}