/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { paquetesServices } from "../../../servicios/paquetes-servicios.js";
import { reservaServices } from "../../../servicios/reservas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaPaquete() {
  /**1-En esta función se deben capturar los elementos html: .carrusel, .seccionProducto, .seccionLogin. Para luego
   * blanquear su contenido.
   * 2-Se deberá capturar el elemento .vistaProducto.
   * 3-Se deberá llamar a la función leerParametro para recuperar de la url el idProducto.
   * 4-Luego se deberán leer los datos del producto indentificado con el idProducto recuperado.
   * 5-Llamar a la función htmlVistaProducto.
   * 6-El resultado de la función deberá asignarse al elemento .vistaProducto capturado previamente.
   * 7-Se deberá capturar el elemento html correspondiente al anchor btnComprar y enlazar el evento click a la función registrarCompra.
   */
  /*1*/
  const carrusel = document.querySelector(".carrusel");
  const seccionPaquetes = document.querySelector(".seccionPaquetes");
  const seccionLogin = document.querySelector(".seccionLogin");
  const buscador = document.querySelector(".buscador");
  const reservas = document.querySelector(".seccionReservas");
  buscador.style.display = "none";
  
  seccionLogin.innerHTML = ""
  carrusel.innerHTML = "";
  reservas.innerHTML = "";
  //seccionPaquetes.innerHTML = "";

  /*2*/
  const vistaPaquetes = document.querySelector(".vistaPaquetes");
  /*3*/
  const idPaquete = leerParametro();
  /*4*/
  if (idPaquete) {
    const paquete = await paquetesServices.listar(idPaquete);
    const htmlPaquete = htmlVistaPaquete(
      paquete.id,
      paquete.nombre,
      paquete.precio,
      paquete.destino_id,
      paquete.cupo,
      paquete.fecha_inicio,
      paquete.fecha_fin
    );
    vistaPaquetes.innerHTML = htmlPaquete;
    document.getElementById("btnComprar").addEventListener('click',registrarCompra)
  }
}

function htmlVistaPaquete(id, nombre, precio, destino_id, cupo, fecha_inicio, fecha_fin) {
  /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
  /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
  /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
  /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `.
   *
   *  ejemplo
   *   let titulo = 'Señora';
   *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
   *
   */

  const resultado = `
  <div class="contenedor-paquete">
    <div class="imagen">
      <img src="./img/travelus-img/beach.jpg" alt="producto">
    </div>
    <div class="texto">
      <p class="tag">NUEVO</p>
      <p id="namePaquete" data-idPaquete=${id}>${nombre}</p>

      <p id="IdPaquete" data-idPaquete=${id}></p>

      <p id="precioPaquete">$${precio}</p>

      <p class="cupo">Cupo: ${cupo}</p>

      <p class="fecha">fechas: <br>del ${fecha_inicio} al ${fecha_fin}</p>

        <div class="form-group">
          <label for="cantidadPersonas">Cantidad</label>
          <input type="number" step="1" min ="1" value="1" id="cantidadPersonas">
        </div>

      <a id="btnComprar">Comprar</a>
    </div>
    </div>
  `;
    return resultado;
}
function leerParametro() {
  // Captura el idProducto de la dirección URL enviada por la página que llama
  const words = new URLSearchParams(window.location.search);
  let cad = words.get("idPaquete");
  if (!cad) return null;
  return cad.trim();
}

function registrarCompra() {
  /**1-Esta función es la encargada de procesar el evento click del anchor btnComprar.
   * 2-Luego deberá recuperar con la función getUsuarioAutenticado presente en el módulo login.js el objeto session
   * 3-Si la propiedad autenticado del objeto session es falso, el usuario no ha iniciado sesión, y se deberá emitir
   *   una alerta que comunique al usuario que antes de realizar una compra debe haber iniciado sesión y salir de la
   * ejecución de la función.
   * 4-Si la propiedad autenticado es true la ejecución continua.
   * 5-En este punto se deben almacenar los datos necesario para registrar la venta.
   * 5-Necesitamos idUsuario, emailUsuario, idProducto, nameProducto, cantidad y fecha.
   * 6-Los dos primeros los extraemos del objeto session.
   * 7-El resto de los datos los capturamos desde el objeto document utilizando los id: nameProducto, cantidadProducto.
   *   El idProducto lo recuperamos desde el atributo data-idproducto y a fecha la obtenemos desde la fecha del sistema con
   *   el objeto Date() de javascript.
   * 8-Una vez reunido todos los datos necesarios llamamos a la función ventasServices.crear pasando lo parámetros obtenidos.
   * 9-Luego de registrar la venta utilizando el objeto location.replace("tienda.html") renderizamos nuevamente la página
   *   dejando el sitio en el estado inicial.
   * 10-Finalmente emitimos una alerta con la leyenda "Compra finalizada."
   *
   */


  // 1
  // 2
  const session = getUsuarioAutenticado();
  // 3
  if (!session.autenticado) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Para ver las reservas debe iniciar sesión"
    });
  } else {
    // 4-5-6-7-8
    const idUsuario = session.idUsuario;
    const idPaquete = document.getElementById('IdPaquete').getAttribute('data-idPaquete');
    const cantidad_personas = document.getElementById("cantidadPersonas").value;
    const fecha = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO

    reservaServices.crear(idUsuario, idPaquete, fecha, cantidad_personas)
    .then((res) => {
      if (res.ok == 'true') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.message
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Listo!",
          text: "Compra finalizada"
        }).then(() => {
          // 9
          location.replace("tienda.html");
        });
      }
    });

    // 10
  }
}

