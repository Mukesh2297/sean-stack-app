import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  mobileDevice = true;

  images = [{path:'../../assets/Clothing.png'},
  {path:'../../assets/Electronics.png'},
  {path:'../../assets/Furniture.png'},
  {path:'../../assets/Footware.png'},
  {path:'../../assets/Kitchenware.png'},
  {path:'../../assets/Pantry.png'}]

  public showLogin:boolean = true;

  constructor(private apiService:ApiService, private http:HttpClient, public breakPointObserver:BreakpointObserver, private router:Router) { }

  ngOnInit(): void {

  this.breakPointObserver.observe(['(max-width: 480px )']).subscribe(response=>{
      if(response.matches){
        this.mobileDevice= true;
      }
      else{
        this.mobileDevice = false;
      }
      
    })

  }

  get date(){
    return `${this.monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`;
  }

  login(loginForm){
    const userCredentials = loginForm.value;
    console.log(userCredentials);

    this.http.post("https://node-salesforce-server.herokuapp.com/login",userCredentials,{headers:{skip:"true"}}).subscribe((response:any)=>{
    console.log("Below is the response");  
    console.log(response);
      if(response.message==="User available"){  
        localStorage.setItem("token",response.token);
        localStorage.setItem("userId",response.userId);
        return this.router.navigate(["/homepage"]);
      }
      else if(response.error==="Invalid password"){
        alert("Invalid password")
      }
      else{
        alert("User does not exist");
      }

    })
  }

  signup(signupForm){
    const userCredentials = signupForm.value;
    this.http.post("https://node-salesforce-server.herokuapp.com/signup",signupForm.value,
    {headers:new HttpHeaders().append('Content-Type','application/json').append('accept','application/json')}).subscribe((response:{message:string,id:string})=>{
      console.log(response);
      if(response.id){
        this.showLogin = true;
      }
    })
    //console.log(signupForm.value);
  }

  toggleSignUpLogin(){
    this.showLogin = !this.showLogin;
    console.log(this.showLogin);
  }

}
