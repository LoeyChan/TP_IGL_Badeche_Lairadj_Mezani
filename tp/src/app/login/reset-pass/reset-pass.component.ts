import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute , Params} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  public token : string ;
  public error_credentials = false ;
  public hidden_form = false ;
  public password : string ;
  public confirmation : string ;

  constructor (private router : Router , private route : ActivatedRoute , private http : HttpClient) {
    this.route.params.subscribe(
      (params : Params) => {
        this.token = params['token'] ;
      } ) ;

      let requet = this.http.get("http://localhost:8000/api/password/find/"+this.token )
      .subscribe(
        response => {
          this.error_credentials = false ;
          this.hidden_form = false ;
          console.log(response);

        } ,
        (err : HttpErrorResponse) => {
          this.hidden_form = false ;
          this.router.navigate(['login']) ;
        }) ;
  }

  goLogin() {
    this.router.navigate(['/login'] , {relativeTo : this.route}) ;
  }

  onSubmit(form : NgForm) {
    if(form.valid) {
      var fd = new FormData() ;
      fd.append('token' , this.token) ;
      fd.append('password' , this.password) ;
      fd.append('password_confirmation' , this.confirmation) ;

      this.hidden_form = true ;
      let request = this.http.post("http://localhost:8000/api/password/reset" , fd)
      .subscribe(
        (response) => {
          this.error_credentials = false ;
          this.hidden_form = false ;
          this.router.navigate(['login/mot_de_passe_recupere_succee']) ;


        } ,
        (err : HttpErrorResponse) => {
          this.hidden_form = false ;
          this.error_credentials = true ;
        }
      ) ;
    }

  }

  ngOnInit() {
  }

}
