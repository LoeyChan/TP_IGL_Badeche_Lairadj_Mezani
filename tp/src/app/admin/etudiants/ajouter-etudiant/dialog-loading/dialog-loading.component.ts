import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EtudiantItem } from './../../etudiants-list/EtudiantItem';
import { EtudiantsService } from './../../../../etudiants.service';
import { Etudiant } from './../Etudiant';
import { AjouterEtudiantComponent } from './../ajouter-etudiant.component';
import { Component, OnInit , Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-loading',
  templateUrl: './dialog-loading.component.html',
  styleUrls: ['./dialog-loading.component.scss']
})
export class DialogLoadingComponent implements OnInit {
  public hidden_form = true ;
  public succee_msg = false ;
  public error_msg = false ;
  public etudiant : Etudiant ;
  public etudiants : EtudiantItem[] ;
  constructor(
    public dialogRef: MatDialogRef<AjouterEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any , private router : Router , private etudiantsService : EtudiantsService , private http : HttpClient ) {
      dialogRef.disableClose = true;
      this.etudiant = this.data.etudiant ;
      console.log(this.etudiant) ;

      if(this.etudiant instanceof Etudiant) {


        var fd = new FormData() ;

        fd.append("name" , this.etudiant.info.name) ;
        fd.append("lastname" , this.etudiant.info.lastname) ;
        fd.append("sex" , this.etudiant.info.sex) ;
        if(this.etudiant.info.img) {
          fd.append("img" , this.etudiant.info.img_file) ;
        }else {
          fd.append("img" , null) ;
        }
        fd.append("date" , this.etudiant.info.date) ;
        fd.append("lieu" , this.etudiant.info.lieu) ;
        fd.append("bacYear" , ""+this.etudiant.info.bacYear) ;
        fd.append("currentYear" , ""+this.etudiant.info.currentYear) ;


        fd.append("phone" , ""+this.etudiant.contact.tlf) ;
        fd.append("adresse" , ""+this.etudiant.contact.adresse) ;


        fd.append("email" , this.etudiant.compte.mail) ;
        fd.append("password" , this.etudiant.compte.password) ;
        fd.append("password_confirmation" , this.etudiant.compte.confirmation) ;


        fd.append("bacFiliere" , this.etudiant.bac.filiere) ;
        fd.append("bacMoyenne" , this.etudiant.bac.moyenne) ;
        fd.append("bacRegion" , this.etudiant.bac.region) ;
        fd.append("bacAttestation" , this.etudiant.bac.attestation_file) ;
        fd.append("bacRelevai" , this.etudiant.bac.relevai_file) ;
        fd.append("number_oldYears" , ""+this.etudiant.oldYears.length) ;
        for (let i = 0; i < this.etudiant.oldYears.length; i++) {
          const element = this.etudiant.oldYears[i];
          fd.append("year_title"+i , element.title) ;
          fd.append("year_year"+i , element.year) ;
          fd.append("year_univ"+i , element.univ) ;
          fd.append("year_avg"+i , element.avg ) ;
          fd.append("year_result"+i , ""+element.result) ;
          fd.append("year_certificat"+i , element.certificat_file) ;
          fd.append("year_relevai"+i , element.relevai_file) ;

        }


        this.http.post('http://localhost:8000/api/etudiant/ajouter' , fd)
        .subscribe(
          (response : any) => {
            console.log(response);
            let img_user = null ;
            if(response.img) {
              img_user = response.img ;
            }
            this.etudiants = this.etudiantsService.getEtudiantsList() ;
            let id_max : number = 0 ;
            this.etudiants.forEach(etudiant => {
              if(etudiant.id > id_max) {id_max = etudiant.id ;}
            });
            let new_etudiantItem = new EtudiantItem(
                (id_max+1) ,
                this.etudiant.info.name ,
                this.etudiant.info.lastname ,
                this.etudiant.info.sex ,
                this.etudiant.info.bacYear ,
                this.etudiant.info.currentYear ,
                img_user
              )
            this.etudiantsService.addEtudiant(new_etudiantItem) ;
            this.hidden_form = false ;
            this.succee_msg = true ;
            setTimeout(()=> {
              this.dialogRef.close() ;
              this.router.navigate(["admin/etudiants"]) ;
            } , 1000) ;
          } ,
          (err : HttpErrorResponse) => {
            console.log(err);
            this.hidden_form = false ;
            this.succee_msg = false ;
            this.error_msg = true ;

          }
        )
      }


    }

  onNoClick(): void {
    this.dialogRef.close() ;
  }

  ngOnInit() {
  }

}
