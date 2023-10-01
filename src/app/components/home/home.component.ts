import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/gaurds/auth.guard';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isActive : boolean = false;

  constructor(private userService : UserService, private router : Router, private authGaurd : AuthGuard) {  }
  
  ngOnInit(): void {
    this.isActive = this.authGaurd.canActivate();
  }

  toFinance(){
    this.router.navigate(['finance']);
  }

  toEducation(){
    this.router.navigate(['education']); 
  }

  async logOut(){
    this.userService.logOut();
    await this.router.navigate(['login']);
    window.location.reload();
  }
}
