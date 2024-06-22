import { reservaServices } from "../../servicios/reservas-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";


const htmlReservas = 
`<div class="card">
    <div class="card-header">
    
    <h3 class="card-title"> 
         <a class="btn bg-dark btn-sm btnAgregarReserva" href="#/newReserva">Agregar Reserva</a>
    </h3>   

    </div>
    <!-- /.card-header -->
    <div class="card-body">            
    <table id="reservasTable" class="table table-bordered table-striped tableReserva" width="100%">
        <thead>
            <tr>
            <th># </th>
            <th>Usuario_id</th>
            <th>Paquete_id</th>
            <th>Fecha_Reserva</th>
            <th>Cantidad_Personas</th>
            <th>Acciones</th>
            </tr>
        </thead>

    </table>
    </div>
    <!-- /.card-body -->
</div> `;

export async function Reservas(){
    let d = document
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Reservas';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Reservas";
    d.querySelector('.rutaMenu').setAttribute('href',"#/reservas");
    let cP =d.getElementById('contenidoPrincipal');

    res = await reservaServices.listar();
    res.forEach(element => {
        element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarReserva'  href='#/editReserva' data-idReserva='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarReserva'href='#/delReserva' data-idReserva='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
    });  
     
    cP.innerHTML =  htmlReservas;

    llenarTabla(res);

    let btnAgregar = d.querySelector(".btnAgregarReserva");
    let btnEditar = d.querySelectorAll(".btnEditarReserva");
    let btnBorrar = d.querySelectorAll(".btnBorrarReserva");

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
    let id = this.getAttribute('data-idReserva');
    editRegister(id);
}

async function borrar(){
    let id = this.getAttribute('data-idReserva');
    let borrar=0;
    await Swal.fire({
        title: 'Esta seguro que desea eliminar la Reserva?',
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
        const borrado = await reservaServices.borrar(id);
        Swal.fire({
            icon: 'success',
            title: borrado.message,
            showConfirmButton: true,
            timer: 1500
        })
    }
    window.location.href = "#/reservas"; 
}

function llenarTabla(res){
    new DataTable('#reservasTable', {
        responsive: true,
        data: res,
        columns: [
            { data: 'id' },
            { data: 'usuario_id' },
            { data: 'paquete_id' },
            { data: 'fecha_reserva' },
            { data: 'cantidad_personas' },
            { data: 'action', orderable: false}
        ],
        deferRender: true,
        retrive: true,
        progresing: true,
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