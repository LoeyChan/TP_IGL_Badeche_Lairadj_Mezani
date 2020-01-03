import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-success',
  templateUrl: './reset-success.component.html',
  styleUrls: ['./reset-success.component.scss']
})
export class ResetSuccessComponent implements OnInit {

  constructor (private router : Router , private route : ActivatedRoute) {}

  goLogin() {
    this.router.navigate(['/login'] , {relativeTo : this.route}) ;
  }

  ngOnInit() {
  }

}
