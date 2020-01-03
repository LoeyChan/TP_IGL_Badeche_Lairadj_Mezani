import { HttpClient , HttpHeaders , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from "@angular/router";
import { NgForm } from '@angular/forms';
import decode from 'jwt-decode';

export interface ResponseToken {
  result: boolean;
  email: string;
  token : string ;
  type : string ;
}
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  public email : string ;
  public password : string ;
  public loading  = false ;
  public hidden_form = false ;
  public error_credentials = false ;

  constructor (private router : Router , private route : ActivatedRoute , private http : HttpClient) {

  }

  goForget() {
    this.router.navigate(['mot_de_passe_oublie'] , {relativeTo : this.route}) ;
  }


  onLogin(form : NgForm) {
    if(form.valid) {
      console.log(form);

      var fd = new FormData() ;
      fd.append("email" , this.email) ;
      fd.append("password" , this.password) ;

      this.hidden_form = true ;
      let request = this.http.post("http://localhost:8000/api/login" , fd)
      .subscribe((response : ResponseToken) => {
        this.hidden_form = false  ;
        this.error_credentials = false ;
        if(response.token) {
          localStorage.setItem("token" , response.token) ;
          const tokenPayload = decode(response.token);
          this.router.navigate([tokenPayload.role]);
        }
      } ,
      (err : HttpErrorResponse) => {
        if(err instanceof Error) {
          console.log(err.status) ;
          console.log(err.error.message) ;
        }else{
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
        }
        this.hidden_form = false  ;
        this.error_credentials = true ;
      }
      );
      console.log(request);

    }
  }

  ngOnInit() {
  }

}
