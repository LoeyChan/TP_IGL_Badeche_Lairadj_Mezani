export class Etudiant {
  public d = new Date();

  public info = {
    name : ""  ,
    lastname : "" ,
    sex : "" ,
    date : "" ,
    lieu : "" ,
    bacYear : this.d.getFullYear() ,
    currentYear : 1 ,
    img : false ,
    img_file :  null ,
    img_url : null ,
    onImageChange : function(event){
      var mimeType = event.target.files[0].type;
      if (!(mimeType.match(/image\/*/) == null)) {
        this.img_file = <File>event.target.files[0] ;
        this.img = true ;
        var reader = new FileReader();
        reader.readAsDataURL(this.img_file);
        reader.onload = (_event) => {
          this.img_url = reader.result;
        }
      }
    }
  } ;

  public contact = {
    tlf : "" ,
    adresse : ""
  } ;

  public compte = {
    mail : "" ,
    password : "" ,
    confirmation : ""
  } ;

  public bac = {
    filiere : "" ,
    moyenne : "" ,
    region : "" ,
    attestation : false ,
    attestation_file : null ,
    relevai : false ,
    relevai_file : null ,
    onAttestationChange : function(event){
      this.attestation_file = <File>event.target.files[0] ;
      this.attestation = true ;
    } ,
    onRelevaiChange : function(event){
      this.relevai_file = <File>event.target.files[0] ;
      this.relevai = true ;
    }
  } ;

  public currentYear = {
    certificat : false ,
    certificat_file  : true ,
    onCertificatChange : function(event){
      this.certificat_file = <File>event.target.files[0] ;
      this.certificat = true ;
    }
  } ;

  public oldYears = [] ;


}
