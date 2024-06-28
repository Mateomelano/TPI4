import { reservaServices } from "../../../servicios/reservas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

function htmlReserva(
    id,
    usuario_id,
    paquete_id,
    fecha_reserva,
    cantidad_personas
){

    const resultado = `
    <a href="?idReserva=${id}#vistaReserva" class="pro">
        <img src="./img/travelus-img/beach.jpg" alt="imagen"/>
        <div class="des">
            <span>${usuario_id} <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
            <div class="star">
              
            </div>
            <h4>${paquete_id}</h4>
            <p class="cupo">Cupo: ${fecha_reserva}</p>
            <p class="cupo">Cupo: ${cantidad_personas}</p>
        </div>
    </a>
    `;
    return resultado;
}

export async function ReservasActivas() {

    const session = getUsuarioAutenticado();
    if (!session.autenticado) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Para realizar una compra debe iniciar sesión"
        }).then(() => {
            // 9
            location.replace("tienda.html");
          });
      } else {
        const carrusel = document.querySelector(".carrusel");
        const listarPaquetes = document.querySelector(".listarPaquetes");
        const seccionLogin = document.querySelector(".seccionLogin");
        const reservas = document.querySelector(".seccionReservas");
        const buscador = document.querySelector(".buscador");
        seccionLogin.innerHTML = ""
        carrusel.innerHTML = "";
        reservas.innerHTML = "";
        listarPaquetes.innerHTML = "";

        const seccionReservas = document.querySelector(".seccionReservas");
        const reservasActivas = await reservaServices.listar();
        let reservasHTML = "";
        for (const reserva of reservasActivas) {
            reservasHTML += htmlReserva(
                reserva.id,
                reserva.usuario_id,
                reserva.paquete_id,
                reserva.fecha_reserva,
                reserva.cantidad_personas
            );
        }
        seccionReservas.innerHTML = reservasHTML;


    }

}

