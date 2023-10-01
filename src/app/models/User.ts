export interface NewUser{
    firstName:string;
    lastName : string;
    email:string;
    username:string;
    phoneNumber:string;
    address:string;
    password:string;
  }
  
export interface Login{
  username : string;
  password : string;
}

export interface ProfileData{
  firstName : string;
  lastName : string;
  email : string;
  username : string;
  phoneNumber : string;
  address : string;
  role : string;
  created : string;
}