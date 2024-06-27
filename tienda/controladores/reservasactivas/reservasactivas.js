import { paquetesServices } from "../../../servicios/paquetes-servicios.js";


export async function ReservasActivas() {

    const carrusel = document.querySelector(".carrusel");
    const listarPaquetes = document.querySelector(".listarPaquetes");
    const seccionLogin = document.querySelector(".seccionLogin");
    const reservas = document.querySelector(".seccionReservas");
    const buscador = document.querySelector(".buscador");
    buscador.style.display = "none";
    seccionLogin.innerHTML = ""
    carrusel.innerHTML = "";
    reservas.innerHTML = "";
    listarPaquetes.innerHTML = "";


}

