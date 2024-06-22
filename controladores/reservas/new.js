import { reservaServices } from "../../servicios/reservas-servicios.js";

const htmlAmreserva = `
<div class="card card-dark card-outline">

    <form  class="needs-validation frmAmReserva"  enctype="multipart/form-data">
    
        <div class="card-header">
               
            <div class="col-md-8 offset-md-2">	
               

                <!--=====================================
                Usuario_ID
                ======================================-->   

                <div class="form-group mt-2">
                    
                    <label>Usuario_id</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'')"
                    name="usuario_id"
                    id="usuario_id"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Paquete_ID
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>Paquete_ID</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'number')"
                    name="paquete_id"
                    id="paquete_id"
                    required>


                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>



                <!--=====================================
                Fecha_Reserva
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>Fecha_Reservas</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'')"
                    name="fecha_reserva"
                    id="fecha_reserva"
                    required>


                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                 <!--=====================================
                Cantidad_Personas
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>Cantidad_Personas</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'')"
                    name="cantidad_personas"
                    id="cantidad_personas"
                    required>


                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

            </div>

        </div>
        <div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/reservas" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>
    </form>
</div>
`;

var formulario ='';
var txtId = '';
var txtUsuario_id = '';
var txtPaquete_id = '';
var txtFecha_reserva = '';
var txtCantidad_personas = '';
var idReserva;

export async function newRegister(){

    let d = document;

    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML += ' Agregar';

    crearFormulario();

    formulario = d.querySelector('.frmAmReseva');
    formulario.addEventListener('submit', guardar);
}

export async function editRegister(id){
    let d = document;
    idReserva = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML += ' Editar';

    crearFormulario();

    formulario = d.querySelector('.frmAmReserva');
    formulario.addEventListener('submit', modificar);

    let reserva = await reservaServices.listar(id);

    txtId.value = reserva.id;
    txtUsuario_id.value = reserva.usuario_id;
    txtPaquete_id.value = reserva.paquete_id;
    txtFecha_reserva.value = reserva.fecha_reserva;
    txtCantidad_personas.value = reserva.cantidad_personas;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Reservas";
    d.querySelector('.rutaMenu').setAttribute('href',"#/reservas");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmreserva;

    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = "../controladores/validaciones.js";
    cP.appendChild(script);

    txtId = d.getElementById('id');
    txtUsuario_id = d.getElementById('usuario_id');
    txtPaquete_id = d.getElementById('paquete_id');
    txtFecha_reserva = d.getElementById('fecha_reserva');
    txtCantidad_personas = d.getElementById('cantidad_personas');

}


function guardar(e){
    e.preventDefault();

    var usuario_id = txtUsuario_id.value;
    var paquete_id = txtPaquete_id.value;
    var fecha_reserva = txtFecha_reserva.value;
    var cantidad_personas = txtCantidad_personas.value;



    reservaServices.crear(usuario_id, paquete_id, fecha_reserva, cantidad_personas)
        .then(respuesta => {
            formulario.reset();
            window.location.hash = "#/reservas";
            swal.fire({
                icon: 'success',
                title: 'Reserva Creada',
                text: respuesta.message,
            })
        })
        .catch(error => {
            console.log(error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            })
        });
}

function modificar(e){
    e.preventDefault();

    var usuario_id = txtUsuario_id.value;
    var paquete_id = txtPaquete_id.value;
    var fecha_reserva = txtFecha_reserva.value;
    var cantidad_personas = txtCantidad_personas.value; 

    reservaServices.editar(usuario_id, paquete_id, fecha_reserva, cantidad_personas)
        .then(respuesta => {
            formulario.reset();
            window.location.hash = "#/reservas";
            swal.fire({
                icon: 'success',
                title: 'Reserva Modificado',
                text: respuesta.message,
            })
        })
        .catch(error => {
            console.log(error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            })
        });
}
