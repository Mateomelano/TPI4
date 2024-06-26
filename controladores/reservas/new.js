import { reservaServices } from "../../servicios/reservas-servicios.js";
import { paquetesServices } from "../../servicios/paquetes-servicios.js";
import { usuariosServices } from "../../servicios/usuarios-servicios.js";

const htmlAmreservas = `
<div class="card card-dark card-outline">

    <form  class="needs-validation frmAmReservas"  enctype="multipart/form-data">
    
        <div class="card-header">
               
            <div class="col-md-8 offset-md-2">	
               

                <!--=====================================
                Usuario_ID
                ======================================-->   

                <div class="form-group mt-2">
                    
                    <label>ID usuario</label>


                    <select class="form-control select2" name="usuario_id" id="usuario_id" required>
                      <option value="">Seleccionar id usuario</option>
                      
                    </select>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Paquete_ID
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>ID paquete</label>

                    <select class="form-control select2" name="paquete_id" id="paquete_id" required>
                      <option value="">Seleccionar id paquete</option>
                      
                    </select>


                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>



                <!--=====================================
                Fecha_Reserva
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label for="Fecha Reserva">Fecha Reserva</label>

                    <input 
                          type="date"
                          class="form-control"
                          onchange="validateJS(event,'date')"
                          name="fecha_reserva"
                          id="fecha_reserva"
                          required
                    >


                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                 <!--=====================================
                Cantidad_Personas
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>Cantidad de Personas</label>

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
var selUsuario_id = '';
var selPaquete_id = '';
var txtFecha_reserva = '';
var txtCantidad_personas = '';
var idReserva = "";

export async function newRegister(){

    let d = document;

    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML += ' Agregar';

    crearFormulario();

    formulario = d.querySelector('.frmAmReservas');
    formulario.addEventListener('submit', guardar);
}

export async function editRegister(id){
    let d = document;
    idReserva = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Reserva';
    d.querySelector('.contenidoTituloSec').innerHTML += ' Editar';

    crearFormulario();

    formulario = d.querySelector('.frmAmReservas');
    formulario.addEventListener('submit', modificar);

    let reserva = await reservaServices.listar(id);

    selUsuario_id.value = reserva.usuario_id;
    selPaquete_id.value = reserva.paquete_id;
    txtFecha_reserva.value = reserva.fecha_reserva;
    txtCantidad_personas.value = reserva.cantidad_personas;
}

async function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Reservas";
    d.querySelector('.rutaMenu').setAttribute('href',"#/reservas");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmreservas;

    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = "../controladores/validaciones.js";
    cP.appendChild(script);

    txtFecha_reserva = d.getElementById('fecha_reserva');
    txtCantidad_personas = d.getElementById('cantidad_personas');

    selUsuario_id = d.getElementById('usuario_id');
    let usuariosres = await usuariosServices.listar();
    usuariosres.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.text = "ID: " + element.id + " - " + element.nombre;
        selUsuario_id.appendChild(option);
    });


    selPaquete_id = d.getElementById('paquete_id');
    let paquetesres = await paquetesServices.listar();
    paquetesres.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.text = "ID: " + element.id + " - " + element.nombre;
        selPaquete_id.appendChild(option);
    });
}


async function guardar(e) {
    e.preventDefault();

    var usuario_id = selUsuario_id.options[selUsuario_id.selectedIndex];
    var paquete_id = selPaquete_id.options[selPaquete_id.selectedIndex];
    var fecha_reserva = txtFecha_reserva.value;
    var cantidad_personas = parseInt(txtCantidad_personas.value);

    // Obtener información del paquete seleccionado
    let paquete = await paquetesServices.listar(paquete_id.value);

    if (paquete && cantidad_personas <= paquete.cupo) {
        // Crear la reserva si hay suficiente cupo
        try {
            await reservaServices.crear(usuario_id.value, paquete_id.value, fecha_reserva, cantidad_personas);
            // Actualizar el cupo del paquete
            let nuevoCupo = paquete.cupo - cantidad_personas;
            await paquetesServices.editar(paquete.id, paquete.destino_id, paquete.nombre, paquete.precio, nuevoCupo, paquete.fecha_inicio, paquete.fecha_fin);
            formulario.reset();
            window.location.hash = "#/reservas";
            swal.fire({
                icon: 'success',
                title: 'Reserva Creada',
                text: 'La reserva se ha creado',
            });
        } catch (error) {
            console.log(error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    } else {
        // Mostrar error si no hay suficiente cupo
        swal.fire({
            icon: 'error',
            title: 'Cupo Insuficiente',
            text: 'No hay suficiente cupo para la cantidad de personas en este paquete.',
        });
    }
}
async function modificar(e) {
    e.preventDefault();

    var usuario_id = selUsuario_id.options[selUsuario_id.selectedIndex];
    var paquete_id = selPaquete_id.options[selPaquete_id.selectedIndex];
    var fecha_reserva = txtFecha_reserva.value;
    var cantidad_personas = parseInt(txtCantidad_personas.value);

    // Obtener información del paquete seleccionado
    let paquete = await paquetesServices.listar(paquete_id.value);
    let reservaOriginal = await reservaServices.listar(idReserva);

    let cantidadOriginal = reservaOriginal.cantidad_personas;
    let diferenciaCantidad = cantidad_personas - cantidadOriginal;

    if (paquete && (diferenciaCantidad <= 0 || diferenciaCantidad <= paquete.cupo)) {
        // Modificar la reserva si hay suficiente cupo para la diferencia
        try {
            await reservaServices.editar(idReserva, usuario_id.value, paquete_id.value, fecha_reserva, cantidad_personas);
            // Actualizar el cupo del paquete
            let nuevoCupo = paquete.cupo - diferenciaCantidad;
            await paquetesServices.editar(paquete.id, paquete.destino_id, paquete.nombre, paquete.precio, nuevoCupo, paquete.fecha_inicio, paquete.fecha_fin);
            formulario.reset();
            window.location.hash = "#/reservas";
            swal.fire({
                icon: 'success',
                title: 'Reserva Modificada',
                text: 'La reserva se ha modificado',
            });
        } catch (error) {
            console.log(error);
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    } else {
        // Mostrar error si no hay suficiente cupo
        swal.fire({
            icon: 'error',
            title: 'Cupo Insuficiente',
            text: 'No hay suficiente cupo para la cantidad de personas en este paquete.',
        });
    }
}