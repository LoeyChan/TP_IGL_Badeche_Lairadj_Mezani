import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup} from '@angular/forms' ;
import {RouterOutlet} from '@angular/router' ;
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] ,
  animations : [
    trigger('routeAnimations' , [
      transition('* <=> *' , [
        query(':enter , :leave' , [
          style({
            position : 'absolute' ,
            left : 0 ,
            width : '100%' ,
            opacity :0 ,
            transform : 'scale(0) translateY(100%)'
          })
        ]) ,
        query(':enter' , [
          animate('600ms ease' ,
          style({
            opacity :1 ,
            transform : 'scale(1) translateY(0)'
          })
          )
        ]) ,

      ] ),
    ])
  ]
})
export class LoginComponent implements OnInit {

  options: FormGroup;

  constructor() {}

  ngOnInit() {
  }

  prepereRoute(outlet : RouterOutlet) {
    return outlet && outlet.activatedRouteData  ;
  }

}
