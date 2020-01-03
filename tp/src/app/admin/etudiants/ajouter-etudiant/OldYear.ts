import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
export class OldYear {
  public title :string ;
  public univ : string ;
  public year : number ;
  public avg : number ;
  public result : string ;
  public certificat = false ;
  public relevai = false ;
  public certificat_file : File ;
  public relevai_file : File ;
  onCertificatChange(event){
    this.certificat_file = <File>event.target.files[0] ;
    this.certificat = true ;
  }

  onRelevaiChange(event){
    this.relevai_file = <File>event.target.files[0] ;
    this.relevai = true ;
  }

  constructor(title : string ) {
    this.title = title ;
  }

}
