import { paquetesServices } from "../../servicios/paquetes-servicios.js";

const htmlAmpaquetes = `
<div class="card card-dark card-outline">

    <form  class="needs-validation frmAmPaquetes"  enctype="multipart/form-data">
    
        <div class="card-header">
               
            <div class="col-md-8 offset-md-2">	
               
                <!--=====================================
                Nombre
                ======================================-->
                
                <div class="form-group mt-5">
                    
                    <label>Nombre</label>

                    <input 
                    type="text" 
                    class="form-control"
                    pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
                    onchange="validateJS(event,'text')"
                    name="nombre"
                    id="paqueteNombre"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                id_destino
                ======================================-->
                
                <div class="form-group mt-5">
                    
                    <label>Id_destino</label>

                    <input 
                    type="text" 
                    class="form-control"

                    onchange="validateJS(event,'number')"
                    name="id_destino"
                    id="paqueteIdDestino"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Precio
                ======================================-->   

                <div class="form-group mt-2">
                    
                    <label>Precio</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'number')"
                    name="precio"
                    id="paquetePrecio"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Cupo
                ======================================-->

                <div class="form-group mt-2">
                    
                    <label>Cupo</label>

                    <input 
                    type="text" 
                    class="form-control"
                    onchange="validateJS(event,'number')"
                    name="cupo"
                    id="paqueteCupo"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Fecha Inicio
                ======================================-->
                
                <div class="form-group mt-2">
                    
                    <label>Fecha Inicio</label>

                    <input 
                    
                    class="form-control"
                    onchange="validateJS(event,'date')"
                    name="fecha_inicio"
                    id="paqueteFechaInicio"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>

                <!--=====================================
                Fecha Fin
                ======================================-->
                
                <div class="form-group mt-2">
                    
                    <label>Fecha Fin</label>

                    <input 
                    
                    class="form-control"
                    onchange="validateJS(event,'date')"
                    name="fecha_fin"
                    id="paqueteFechaFin"
                    required>

                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Please fill out this field.</div>

                </div>
            </div>

        </div>
        <div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/paquetes" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>
    </form>
</div>
`;

var formulario = "";
var txtNombre = "";
var txtid_destino = "";
var txtPrecio = "";
var txtCupo = "";
var txtFechaInicio = "";
var txtFechaFin = "";
var idPaquete;

export async function newRegister() {
  let d = document;

  d.querySelector(".contenidoTitulo").innerHTML = "Agregar Paquete";
  d.querySelector(".contenidoTituloSec").innerHTML += " Agregar";

  crearFormulario();

  formulario = d.querySelector(".frmAmPaquetes");
  formulario.addEventListener("submit", guardar);
}

export async function editRegister(id) {
  let d = document;
  idPaquete = id;
  d.querySelector(".contenidoTitulo").innerHTML = "Editar Paquete";
  d.querySelector(".contenidoTituloSec").innerHTML += " Editar";

  crearFormulario();

  formulario = d.querySelector(".frmAmPaquetes");
  formulario.addEventListener("submit", modificar);

  let paquete = await paquetesServices.listar(id);

  txtNombre.value = paquete.nombre;
  txtid_destino.value = paquete.id_destino;
  txtPrecio.value = paquete.precio;
  txtCupo.value = paquete.cupo;
  txtFechaInicio.value = paquete.fecha_inicio;
  txtFechaFin.value = paquete.fecha_fin;
}

function crearFormulario() {
  let d = document;
  d.querySelector(".rutaMenu").innerHTML = "Paquetes";
  d.querySelector(".rutaMenu").setAttribute("href", "#/paquetes");

  let cP = d.getElementById("contenidoPrincipal");
  cP.innerHTML = htmlAmpaquetes;

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "../controladores/validaciones.js";
  cP.appendChild(script);

  txtNombre = d.getElementById("paqueteNombre");
  txtid_destino = d.getElementById("paqueteIdDestino");
  txtPrecio = d.getElementById("paquetePrecio");
  txtCupo = d.getElementById("paqueteCupo");
  txtFechaInicio = d.getElementById("paqueteFechaInicio");
  txtFechaFin = d.getElementById("paqueteFechaFin");
}

function guardar(e) {
  e.preventDefault();

  var nombre = txtNombre.value;
  var id_destino = txtid_destino.value;
  var precio = txtPrecio.value;
  var cupo = txtCupo.value;
  var fechaInicio = txtFechaInicio.value;
  var fechaFin = txtFechaFin.value;

  paquetesServices
    .crear(nombre, id_destino, precio, cupo, fechaInicio, fechaFin)
    .then((respuesta) => {
      formulario.reset();
      window.location.hash = "#/paquetes";
      swal.fire({
        icon: "success",
        title: "Paquete Creado",
        text: respuesta.message,
      });
    })
    .catch((error) => {
      console.log(error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    });
}

function modificar(e) {
  e.preventDefault();

  var nombre = txtNombre.value;
  var id_destino = txtid_destino.value;
  var precio = txtPrecio.value;
  var cupo = txtCupo.value;
  var fechaInicio = txtFechaInicio.value;
  var fechaFin = txtFechaFin.value;

  paquetesServices
    .editar(idPaquete, nombre, id_destino, precio, cupo, fechaInicio, fechaFin)
    .then((respuesta) => {
      formulario.reset();
      window.location.hash = "#/paquetes";
      swal.fire({
        icon: "success",
        title: "Paquete Modificado",
        text: respuesta.message,
      });
    })
    .catch((error) => {
      console.log(error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    });
}
