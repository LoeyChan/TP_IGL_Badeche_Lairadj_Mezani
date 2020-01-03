export class EtudiantItem {
    public id : number ;
    public name : string ;
    public lastname : string ;
    public name_c : string ;
    public sex : string ;
    public bacYear : number ;
    public currentYear : number ;
    public img : any ;

    constructor(id : number , name : string , lastname : string , sex : string , bacYear : number , currentYear : number , img : any ) {
      this.id = id  ;
      this.name = name ;
      this.lastname = lastname ;
      this.name_c = name+" "+lastname ;
      this.sex = sex ;
      this.bacYear = bacYear ;
      this.currentYear = currentYear ;
      this.img = img ;
    }
}
