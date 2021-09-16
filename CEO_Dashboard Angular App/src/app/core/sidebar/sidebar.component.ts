import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { IUser } from 'src/app/_models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  user!:IUser;
  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    let result = this.authService.getCurrentUserFromLocalStorage()
    if(result != null){
      this.user = result;
    }
  }

  logout(){
    this.authService.removeCurrentFromLocalStorage();
    this.router.navigateByUrl('/user/login');
  }

}
