export class User {
    
    ID             :string 
	Username       :string
	Nombre         :string             
	Ape_paterno    :string             
	Ape_materno    :string             
	Telefono       :string             
	Direccion      :string             
	Contraseña     :string             
	Token          :string             
	Token_Act      :string             
	Fch_Creacion   :Date 
	Fch_Renovacion :Date
    exp            :Date

    constructor() {

        this.ID = "";
        this.Username = "";
        this.Nombre = "";
        this.Ape_materno = "";
        this.Ape_paterno = "";
        this.Telefono = "";
        this.Direccion = "";
        this.Contraseña = "";
        this.Token = "";
        this.Token_Act = "";
        this.Fch_Creacion = new Date(0);
        this.Fch_Renovacion = new Date(0);
        this.exp = new Date(0);

    }
}