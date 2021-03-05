import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  checkTokenExpiration(){

    let token = localStorage.getItem('token');
    const decodedToken:any = jwt_decode(token);
    if(decodedToken.exp===undefined){
      return false;
    }
    const date = new Date(0);
    let tokenExpDate = date.setUTCSeconds(decodedToken.exp);
    console.log("New Date:" +new Date().valueOf());
    console.log("Token Date:"+tokenExpDate.valueOf());
    if(tokenExpDate.valueOf() > new Date().valueOf()){
      return true;
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      return false;
    } 

  }
}
