import { Etudiant } from './../ajouter-etudiant/Etudiant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public id : number ;
  public hidden_form = true ;
  public user_not_found = false ;
  public user_found = false ;
  public etudiant = new Etudiant() ;


  constructor(private router : Router , private route : ActivatedRoute , private http : HttpClient ) {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = params['id'] ;
      } ) ;

      this.http.get('http://localhost:8000/api/etudiant/'+this.id)
        .subscribe(
          (response :any ) => {
            console.log(response);

            if(response.etudiant) {
              this.etudiant = response.etudiant ;

              setTimeout(()=>{
                this.hidden_form = false ;
                this.user_found = true ;
              } , 1000) ;
            }
            console.log(this.etudiant);

          } ,
          (err : HttpErrorResponse) => {
            console.log(err);
            setTimeout(()=>{
              this.hidden_form = false ;
              this.user_not_found = true ;
            } , 1000) ;
          }
        );
   }

  ngOnInit() {
  }

}
