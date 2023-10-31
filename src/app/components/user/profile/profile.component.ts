import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDecoded } from 'src/app/models/Result';
import { ProfileData } from 'src/app/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userId !: string;
  user !: ProfileData;
  constructor(private userService: UserService, private titleService : Title) {}
  
  ngOnInit(): void {
    const token = this.userService.getToken(); 
    const jwtHelper = new JwtHelperService();
    const user = jwtHelper.decodeToken<TokenDecoded>(token!);
    this.titleService.setTitle(`PersonalBook - ${user?.actort}`)
    this.userId =String(user?.unique_name);
    this.userService.getProfailDetails(this.userId).subscribe(
      retponse => {
        this.user = retponse;
      }
    );
  }
}
