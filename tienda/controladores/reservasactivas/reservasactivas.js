import { reservaServices } from "../../../servicios/reservas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";
import { paquetesServices } from "../../../servicios/paquetes-servicios.js";

function htmlReserva(
    id,
    usuario_id,
    paquete_id,
    fecha_reserva,
    cantidad_personas
){
    

    const resultado = `
    <div class="pro">
        <img src="./img/travelus-img/beach.jpg" alt="imagen"/>
        <div class="des">
            <span>${usuario_id} <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
            <div class="star">
              
            </div>
            <h4 class="title">${paquete_id}</h4>
            <p class="cupo">Fecha de la reservacion: ${fecha_reserva}</p>
            <p class="cupo">cantidad de personas: ${cantidad_personas}</p>
            <button class="cancelarReserva"> Cancelar Reserva <i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>
    `;
   
    return resultado;
}

export async function ReservasActivas() {

    const session = getUsuarioAutenticado();
    if (!session.autenticado) {
        Swal.fire({
          icon: "info",
          title: "Oops...",
          text: "Para ver las reservas debe iniciar sesión"
        }).then(() => {
            // 9
            location.replace("tienda.html");
          });
      } else {
        const carrusel = document.querySelector(".carrusel");
        const listarPaquetes = document.querySelector(".listarPaquetes");
        const seccionLogin = document.querySelector(".seccionLogin");
        const reservas = document.querySelector(".seccionReservas");

        seccionLogin.innerHTML = ""
        carrusel.innerHTML = "";
        reservas.innerHTML = "";
        listarPaquetes.innerHTML = "";

        const seccionReservas = document.querySelector(".seccionReservas");
        const reservasActivas = await reservaServices.listarPorUsuario(session.idUsuario);
        let reservasHTML = "";
        for (const reserva of reservasActivas) {
            const nombre = await paquetesServices.listar(reserva.paquete_id)
            reservasHTML += htmlReserva(
                reserva.id,
                reserva.usuario_id,
                `${nombre.nombre}`,
                reserva.fecha_reserva,
                reserva.cantidad_personas
            );
        }
        seccionReservas.innerHTML = reservasHTML;


    }

}

