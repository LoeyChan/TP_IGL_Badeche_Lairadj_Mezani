import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private router : Router) { }

  sidenav_opened = true ;
  activateState = 'dash' ;

  onStatsClick(type) {
    switch (type) {
      case "dash":
        this.activateState = 'dash' ;
        this.router.navigate(["admin"]) ;
        break;
      case "etudiants" :
      this.activateState = 'etudiants' ;
       this.router.navigate(["admin/etudiants"]) ;

      default:
        break;
    }
  }

  sidenav_class = {
    'open-sidenav' : this.sidenav_opened ,
    'close-sidenav' : !this.sidenav_opened
  }

  onOpenSidenav () {
    this.sidenav_opened = !this.sidenav_opened ;
    this.sidenav_class = {
      'open-sidenav' : this.sidenav_opened ,
      'close-sidenav' : !this.sidenav_opened
    }
  }


  ngOnInit() {
  }

  onLogout () {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token') ;
      this.router.navigate(['login']);
    }
  }

}
