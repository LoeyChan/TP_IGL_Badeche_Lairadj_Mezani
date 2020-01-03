import { Component, OnInit } from '@angular/core';
import {
  trigger ,
  transition ,
  style ,
  query ,
  group ,
  animateChild ,
  animate ,
  keyframes
} from '@angular/animations' ;
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss'] ,
  animations : [
    trigger('routeAnimations' , [
      transition('* <=> *' , [
        query(':enter , :leave' , [
          style({
            position : 'absolute' ,
            left : 0 ,
            width : '100%' ,
            opacity :0 ,
            transform : 'scale(1) translateX(-100%)'
          })
        ]) ,
        query(':enter' , [
          animate('600ms ease' ,
          style({
            opacity :1 ,
            transform : 'scale(1) translateX(0)'
          })
          )
        ]) ,

      ] ),
    ])
  ]
})
export class EtudiantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepereRoute(outlet : RouterOutlet) {
    return outlet && outlet.activatedRouteData  ;
  }

}
