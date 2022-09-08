import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private _http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email: ['', Validators.required ],
      password:['',Validators.required]
    })
  }
  submitLogin(){
    this._http.get<any>('http://localhost:3000/signup').subscribe(res=>{
      const user = res.find((s:any)=>{
        return s.email === this.loginForm.value.email && s.password === this.loginForm.value.password
      })
      if(user){
        alert("welcome On Dashboard")
        this.loginForm.reset();
        this.router.navigate(['rest'])
      }else{
        alert('user Not Found !!')
      }
    },err=>{
      alert("server side something missing")
    })
  }


}
