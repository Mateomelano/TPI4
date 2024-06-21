import { paquetesServices } from "../../servicios/paquetes-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";


const htmlPaquetes = 
`<div class="card">
    <div class="card-header">
    
    <h3 class="card-title"> 
         <a class="btn bg-dark btn-sm btnAgregarPaquete" href="#/newPaquete">Agregar Paquete</a>
    </h3>   

    </div>
    <!-- /.card-header -->
    <div class="card-body">            
    <table id="paquetesTable" class="table table-bordered table-striped tablePaquete" width="100%">
        <thead>
            <tr>
            <th># </th>
            <th>Nombre</th>
            <th>IdDestino</th>
            <th>Precio</th>
            <th>Cupo</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
            </tr>
        </thead>

    </table>
    </div>
    <!-- /.card-body -->
</div> `;

export async function Paquetes(){
    let d = document
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Paquetes';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Paquetes";
    d.querySelector('.rutaMenu').setAttribute('href',"#/paquetes");
    let cP =d.getElementById('contenidoPrincipal');

    res = await paquetesServices.listar();
    console.log(res);
    res.forEach(element => {
        element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarPaquete'  href='#/editPaquete' data-idPaquete='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarPaquete'href='#/delPaquete' data-idPaquete='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
    });  
     
    cP.innerHTML =  htmlPaquetes;

    llenarTabla(res);

    let btnAgregar = d.querySelector(".btnAgregarPaquete");
    let btnEditar = d.querySelectorAll(".btnEditarPaquete");
    let btnBorrar = d.querySelectorAll(".btnBorrarPaquete");

    btnAgregar.addEventListener("click", agregar);
    for(let i=0 ; i< btnEditar.length ; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }
}

function agregar(){
    newRegister();
}

function editar(){
    let id = this.getAttribute('data-idPaquete');
    editRegister(id);
}

async function borrar(){
    let id = this.getAttribute('data-idPaquete');
    let borrar=0;
    await Swal.fire({
        title: 'Esta seguro que desea eliminar el paquete?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        if (result.isConfirmed) {
            borrar=1;
        } else if (result.isDenied) {
            borrar=0;
            Swal.fire('Se cancelo la eliminacion', '', 'info');
        }
    })
    if(borrar===1){
        const borrado = await paquetesServices.borrar(id);
    }
    window.location.href = "#/paquetes"; 
}

function llenarTabla(res) {
    new DataTable('#paquetesTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'destino_id' },
            { data: 'precio' },
            { data: 'cupo' },
            { data: 'fecha_inicio' },
            { data: 'fecha_fin' },
            { data: 'action', orderable: false },
        ],
        deferRender: true,
        retrive: true,
        procesing: true,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}
