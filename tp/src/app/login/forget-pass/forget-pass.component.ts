import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute , Params} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {
  public error_credentials = false ;
  public hidden_form = false ;
  public email = "" ;
  public token = "" ;

  constructor (private router : Router , private route : ActivatedRoute , private http : HttpClient) {

  }


  goLogin() {
    this.router.navigate(['/login'] , {relativeTo : this.route}) ;
  }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    var fd = new FormData() ;
    if (form.valid) {
      fd.append("email" , this.email) ;
      this.hidden_form = true ;
      let requet = this.http.post("http://localhost:8000/api/password/create" , fd)
      .subscribe(
        response => {
          this.error_credentials = false ;
          this.hidden_form = false ;
          this.router.navigate(['login/mot_de_passe_oublie_succee']) ;
        } ,
        (err : HttpErrorResponse) => {
          this.hidden_form = false ;
          this.error_credentials = true ;
        }) ;
    }

  }

}
