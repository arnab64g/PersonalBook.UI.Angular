import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  logInForm!: FormGroup;
  logIn!: Login;

  constructor(private fb : FormBuilder, private userService : UserService, private router : Router, private toaster : ToastrService) {}
  
  ngOnInit(){
    this.logInForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.logInForm.valid) {
      this.logIn = {
        username : this.logInForm.get('username')?.value,
        password : this.logInForm.get('password')?.value
      };
      
      this.userService.login(this.logIn).subscribe({
        next : async (response) => {
          if(response.successed){
              this.toaster.success('Log in Successfully.', 'Successed');
              this.userService.storeToken(response.token);
              await this.router.navigate(['home']);
              window.location.reload();
          }
          else{
            this.toaster.error(response.message, 'Log in failed');
          }
        }
    });
    }
  }
}
