import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { addDepartment, apiUrl, deleteDepartment, DepartmentsCount, getAllDepartments, getDepartment, updateDepartment } from 'src/app/shared/constants';
import { IDepartment } from 'src/app/_models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  constructor(private http:HttpClient){
  }

  getAllDepartments(){
    return this.http.get(`${apiUrl}${getAllDepartments}`)
    .pipe(catchError(e => {
      return of(false);
    }));
  }

  getById(id: number){
    return this.http.get(`${apiUrl}${getDepartment}${id}`);
  }

  add(departmentName:string){
    let data = {
      'id':0,
      'name': departmentName
    };
    return this.http.post(`${apiUrl}${addDepartment}`,data)
    .pipe(catchError(e => {
      return of(false);
    }));
  }

  delete(id:number){
    return this.http.delete(`${apiUrl}${deleteDepartment}${id}`);
  }

  update(id:number, name: string){
    let body = {
      id:id,
      name:name
    };
    return this.http.put(`${apiUrl}${updateDepartment}`,body);
  }

  count(){
    return this.http.get(`${apiUrl}${DepartmentsCount}`);
  }
}
