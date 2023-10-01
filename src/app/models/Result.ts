export interface SignUpResult{
    successed : number;
    errors : string[];
}

export interface LoginResult{
    successed : number;
    message : string;
    token : string;
}

export interface LognStatus{
    isLoggedIn : number;
    username : string;
    role : string;
}

export interface TokenDecoded{
    role : string;
    unique_name : string;
    actort : string;
}