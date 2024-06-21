import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { destinosServices } from "../../servicios/destinos-servicios.js";
import { paquetesServices } from "../../servicios/paquetes-servicios.js";

const htmlHome = 
` <div class="row" >
    <!-- ./col -->
    
    <!-- ./col -->
    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box">
            <div class="inner">
            <h3 id="indUsuarios">44</h3>

            <p>Usuarios Registrados</p>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/usuarios" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box">
            <div class="inner">
            <h3 id="indDestinos">44</h3>

            <p>Destinos</p>
            </div>
            <div class="icon">
            <i class="ion ion-person-add"></i>
            </div>
            <a href="#/destinos" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>

    <div class="col-lg-3 col-6">
        <!-- small box -->
        <div class="small-box">
            <div class="inner">
            <h3 id="indPaquetes">0</h3>
            <p>Paquetes</p>
            </div>
            <div class="icon">
            <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#/paquetes" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
        </div>
    </div>
    <!-- ./col -->
</div>`

export async function Home(){
    let d = document
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Home';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Home";
    d.querySelector('.rutaMenu').setAttribute('href',"#/home");
    let cP =d.getElementById('contenidoPrincipal');
           
     
    cP.innerHTML =  htmlHome;
    let indUsuarios = d.getElementById ("indUsuarios");
    let indDestinos = d.getElementById ("indDestinos");
    let indPaquetes = d.getElementById ("indPaquetes");
    //CANTIDAD DE USUARIOS

    res = await usuariosServices.listar();
    //CANTIDAD DE USUARIOS
    indUsuarios.innerHTML = res.length;
    
    //CANTIDAD DE VENTAS

    res = await destinosServices.listar();
    indDestinos.innerHTML = res.length;

    res = await paquetesServices.listar();
    indPaquetes.innerHTML = res.length;

}
