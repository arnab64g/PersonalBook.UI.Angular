import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from 'src/app/gaurds/auth.guard';
import { TokenDecoded } from 'src/app/models/Result';
import { UserService } from 'src/services/user.service';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: boolean;
  fullName !: string;
  isAdmin!: boolean;
  school = faSchool;
  finance = faMoneyBill;
  
  constructor(private authGaurd : AuthGuard, private userService : UserService, private router : Router ){}
  
  ngOnInit(): void {
    const token = this.userService.getToken(); 
    const jwtHelper = new JwtHelperService();
    const user = jwtHelper.decodeToken<TokenDecoded>(token!);
    
    this.fullName = user?.actort!;
    if(user?.role == "Admin"){
      this.isAdmin = true;
    }
    this.isLoggedIn = this.authGaurd.canActivate();
  }

  async logOut(){
    this.userService.logOut();
    await this.router.navigate(['login']);
    window.location.reload();
  }

  public onChangeUser(){
    this.isLoggedIn = this.authGaurd.canActivate();
  }
}
