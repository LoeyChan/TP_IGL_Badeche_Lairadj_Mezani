import { Etudiant } from './admin/etudiants/ajouter-etudiant/Etudiant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtudiantItem } from './admin/etudiants/etudiants-list/EtudiantItem';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {

  constructor(private http : HttpClient) { }
  etudianstListChange = new Subject<EtudiantItem[]>() ;

  public etudiantsList = [] ;


  public getEtudiantsList() {
    this.http.get("http://localhost:8000/api/etudiant").subscribe(
      (response :any )=> {
        console.log(response);
        this.etudiantsList = [] ;
        response = response[0] ;
        for(let i = 0 ; i < response.length ; i++) {
          let etudiant_this = new EtudiantItem(response[i].id , response[i].name , response[i].lastname , response[i].sex , response[i].bacYear , response[i].currentYear , response[i].pic) ;
          this.etudiantsList.push(etudiant_this) ;
        }
        this.etudianstListChange.next(this.etudiantsList) ;
      } ,
      (err : HttpErrorResponse) => {
        console.log(err);

      }
      ) ;

      return this.etudiantsList.slice() ;

  }

  addEtudiant(etudiant : EtudiantItem) {
    this.etudiantsList.push(etudiant) ;
    this.etudianstListChange.next(this.etudiantsList.slice()) ;
  }


  loadEtudiantsList() {

  }

  loadEtudiantInfo(id : number ){

  }


}
