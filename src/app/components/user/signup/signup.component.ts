import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/models/User';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})

export class SignupComponent implements OnInit{
  signUpForm!: FormGroup;
  user! : NewUser;
  shortPass : boolean = false;
  errors = Array<string>();

  constructor(private router: Router, private userService : UserService,  private fb :FormBuilder, private toaster : ToastrService ){}
  
  ngOnInit() : void{
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName : ['', Validators.required],
      email:['', Validators.required],
      username:['', Validators.required],
      phone:['', Validators.required],
      address:[''],
      password:['', Validators.minLength(6)], 
    });
  }

  onSubmit(){
    if(this.signUpForm.get('password')?.value.length < 6){
      this.toaster.error('Password minimum length must be 6', 'Password too short');
    }

    if(this.signUpForm.valid){
      this.user = {
        firstName : this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        email : this.signUpForm.get('email')?.value,
        username : this.signUpForm.get('username')?.value,
        phoneNumber : this.signUpForm.get('phone')?.value,
        address : this.signUpForm.get('address')?.value,
        password : this.signUpForm.get('password')?.value,
      }

      this.userService.register(this.user).subscribe({
        next : (response) => {        
          if(response.successed){
            this.toaster.success('Account has been created log in now.','Sign up successfully');
            this.router.navigate(['/login']);
          }
          else{
            this.errors = response.errors;
            this.toaster.error(response.errors.toString(), 'Sign Up Failed');
          }
        }
      });
    }
  }
}
