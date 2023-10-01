import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginResult, SignUpResult, TokenDecoded } from 'src/app/models/Result';
import { Login, NewUser, ProfileData } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.baseApiUrl;
  jwtHelper = new JwtHelperService();
  user !: TokenDecoded;
  token = this.getToken(); 
  
  
  constructor(private http : HttpClient, private cookieService : CookieService) {}

  getUserId() : string {
    let token = this.getToken();
    let user = this.jwtHelper.decodeToken<TokenDecoded>(token!);
    
    return user?.unique_name!;
  }

  getUserFullName() : string {
    let token = this.getToken();
    let user = this.jwtHelper.decodeToken<TokenDecoded>(token!);
    
    return user?.actort!;
  }

  getProfailDetails(userId : string) : Observable<ProfileData>{
    const url = this.baseUrl + 'User?id=' + userId;

    return this.http.get<ProfileData>(url);
  }

  register(user : NewUser) : Observable<SignUpResult>{
    const url = this.baseUrl + 'User';

    return this.http.post<SignUpResult>(url, user);
  }

  login(login : Login) : Observable<LoginResult>{
    const url = this.baseUrl + 'User/login';

    return this.http.post<LoginResult>(url, login);
  }

  storeToken(tokenValue : string){
    this.cookieService.set('ddut', tokenValue);
  }

  gerRole() : string{
    const user = this.jwtHelper.decodeToken<TokenDecoded>(this.token!);
    
    return user?.role!;
  }


  getToken(){
    return this.cookieService.get('ddut');
  }

  isLoggedIn() : boolean{
    return!!this.getToken();
  }

  logOut() : boolean {
    this.cookieService.delete('ddut');
    return true;
  }

}
