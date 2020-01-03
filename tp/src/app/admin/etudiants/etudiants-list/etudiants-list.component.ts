import { EtudiantItem } from './EtudiantItem';
import { Router } from '@angular/router';
import { Etudiant } from './../ajouter-etudiant/Etudiant';
import { EtudiantsService } from './../../../etudiants.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-etudiants-list',
  templateUrl: './etudiants-list.component.html',
  styleUrls: ['./etudiants-list.component.scss']
})
export class EtudiantsListComponent implements OnInit , AfterViewInit , OnDestroy{


  etudiants  : EtudiantItem[]  ;
  search_value : string ;
  search_year : any ;
  myfilter = {
    name_c : "" ,
    currentYear : ""
  } ;

  onChangeSearch(){


  }
  constructor(public etudiantService : EtudiantsService , public router : Router) {


  }

  private etudiantsSubscription : Subscription ;

  ngOnInit() {
    this.etudiants = this.etudiantService.getEtudiantsList() ;
    this.etudiantsSubscription = this.etudiantService.etudianstListChange.subscribe(
      (etudiants : EtudiantItem[]) => {
        this.etudiants = etudiants ;
        console.log(this.etudiants);

      }
    )
  }

  ngAfterViewInit() {

  }

  clickEtudiant(id) {
    this.etudiants = [] ;
    this.router.navigate(["admin/etudiants/profile/"+id]) ;
  }

  ngOnDestroy() {
    this.etudiantsSubscription.unsubscribe() ;
  }

  onAddEtudiant() {
    this.etudiants = [] ;
    this.router.navigate(["admin/etudiants/ajouter"]) ;
  }

}
