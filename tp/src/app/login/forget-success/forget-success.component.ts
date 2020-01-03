import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-forget-success',
  templateUrl: './forget-success.component.html',
  styleUrls: ['./forget-success.component.scss']
})
export class ForgetSuccessComponent implements OnInit {

  constructor (private router : Router , private route : ActivatedRoute) {}

  goLogin() {
    this.router.navigate(['/login'] , {relativeTo : this.route}) ;
  }

  ngOnInit() {
  }

}
