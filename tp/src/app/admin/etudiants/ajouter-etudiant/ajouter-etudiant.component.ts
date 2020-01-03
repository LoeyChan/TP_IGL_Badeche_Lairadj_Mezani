import { HttpClient } from '@angular/common/http';
import { OldYear } from './OldYear';
import {Etudiant} from "./Etudiant" ;
import { Router } from '@angular/router';
import { Component, OnInit , Inject , AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogLoadingComponent} from './dialog-loading/dialog-loading.component'
@Component({
  selector: 'app-ajouter-etudiant',
  templateUrl: './ajouter-etudiant.component.html',
  styleUrls: ['./ajouter-etudiant.component.scss']
})
export class AjouterEtudiantComponent implements OnInit , AfterViewInit {
  etudiant = null ;


  public steps = [] ;

  constructor( public dialog: MatDialog , private http : HttpClient , private router : Router) {
    this.etudiant = new Etudiant() ;
  }

  ngAfterViewInit(){

  }

  public validDocuments = false ;

  validateFiles() {
    let test = true ;
    if (!this.etudiant.bac.relevai || !this.etudiant.bac.attestation || !this.etudiant.currentYear.certificat) {
      test = false ;
    }

    for(let i =0 ; i < this.steps.length ; i++) {
      if (!this.steps[i].relevai || !this.steps[i].certificat) {
        test = false ;
      }
    }
    console.log(this.etudiant.contact.adresse);

    this.validDocuments = test ;
  }
  public max_year : number = 1 ;
  onBacYearChange() {
    let d = new Date() ;
    if(this.etudiant.info.bacYear > d.getFullYear()) {this.etudiant.info.bacYear = d.getFullYear() ;}
    else if (this.etudiant.info.bacYear < d.getFullYear()-8) {this.etudiant.info.bacYear = d.getFullYear()-8 ;}
    let this_year = d.getFullYear() ;
    let this_mounth = d.getMonth() ;
    if (this_mounth < 9 ) {
      this_year-- ;
    }
    let number_steps = this_year - this.etudiant.info.bacYear ;
    this.max_year = number_steps+1 ;
    this.steps = [] ;
    let step_title = "" ;
    for(let i = 0 ; i < number_steps ; i++) {
      step_title = "("+(this.etudiant.info.bacYear+i)+" - "+(this.etudiant.info.bacYear+i+1)+")" ;
      this.steps.push(new OldYear(step_title)) ;
    }
  }

  onUploadYearCertificat(event , i ) {
    this.steps[i].onCertificatChange(event) ;
  }

  onUploadYearRelevai(event , i ) {
    this.steps[i].onRelevaiChange(event) ;
  }

  onSubmit(form : NgForm){
    if( form.valid && this.validDocuments){
      if(this.etudiant.info.date) {
        var date =  this.etudiant.info.date ;
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = dd + '/' + mm + '/' + yyyy;
        this.etudiant.info.date = date ;
      }
      this.etudiant.oldYears = this.steps;
      this.openDialog() ;
    }
  }

  ngOnInit() {
  }

  onAnnuler() {
    this.etudiant = new Etudiant() ;
    this.router.navigate(["admin/etudiants"]) ;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLoadingComponent, {
      width: '250px',
      data: {etudiant: this.etudiant}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}


