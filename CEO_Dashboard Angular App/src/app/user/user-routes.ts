import { Routes } from "@angular/router";
import { NotfoundComponent } from "../core/notfound/notfound.component";
import { LoginComponent } from './login/login.component';

export const userRoutes:Routes = [
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {
      path:'**', component:NotfoundComponent
    }
];