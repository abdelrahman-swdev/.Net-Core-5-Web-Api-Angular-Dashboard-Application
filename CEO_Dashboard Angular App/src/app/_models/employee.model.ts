import { IAddress } from "./address.model";

export interface IEmployee{
    id:number;
    fullName:string;
    age:number;
    phoneNumber:string;
    email:string;
    salary:number;
    address:IAddress;
    departmentId:number;
}