import { IEmployee } from './employee.model';
export interface IDepartment{
    depId:number,
    name:string,
    employees:IEmployee[]
}