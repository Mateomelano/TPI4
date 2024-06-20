const url = "http://127.0.0.1:8000/paquetes";
import { tokenServices } from "./token-servicios.js";

let token = "";

async function listar(id) {
    if (!token) {
        token=await tokenServices.getToken(); // Obtener el token si no lo tenemos aún
      }
      let cadUrl;
      if (isNaN(id)) 
        cadUrl = url;
      else
        cadUrl = `${url}/${id}`;
    
      const response = await fetch(cadUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    }

async function crear(id,nombre,destino_id, precio,cupo,fecha_inicio,fecha_fin) { //para crear un destino pide esos 3 datos sin importar el id por que es autoincremental
    if (!token) {
        token=await tokenServices.getToken(); // pide el token si no existe. PEDIIIILO
    }
    const response = await fetch(url, {  //hace un fecth a la url pero le pasa los datos en forma de jotason
        method: "POST", //como esta creando el metodo es POST
        headers: {
            Authorization: `Bearer ${token}`, //el header contiene el token 
            "Content-Type": "application/json", //y el tipo de contenido
        },
        body: JSON.stringify({ // el body es donde se manda en formato json el id, nombre, etc
            id: id,
            destino_id: destino_id,
            nombre: nombre,
            precio: precio,
            cupo:cupo,
            fecha_inicio:fecha_inicio,
            fecha_fin:fecha_fin
        })
    });
    return response; //retorna la respuesta ok o no
}

async function editar(id, destino_id, nombre, precio,cupo,fecha_inicio,fecha_fin) {

    if (!token) {
        token=await tokenServices.getToken(); // pide el token si no existe. PEDIIIILO
    }
    const urlPut = `${url}/${id}`;
    const response = await fetch(urlPut, {
        method: "PUT",  //aca el method es PUT por que esta ediando
        headers: {
            Authorization: `Bearer ${token}`,  //mas de lo mismo
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            destino_id: destino_id,
            nombre: nombre,
            precio: precio,
            cupo:cupo,
            fecha_inicio:fecha_inicio,
            fecha_fin:fecha_fin
        })
    });
    return response;  //amigo o enemigo
}

async function borrar(id) {
    if (!token) {
        token = await tokenServices.getToken(); // pide el token si no existe. PEDIIIILO
    }
    const urlDelete = `${url}/${id}`;
    const response = await fetch(urlDelete, {
        method: "DELETE", //aca el method es DELETE por que esta borrando
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response; //rivales no, enemigos
}

export const paquetesServices = {
    listar,
    crear,
    editar,
    borrar,
}