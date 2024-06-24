const url = "http://127.0.0.1:8000/usuarios";
import { tokenServices } from "./token-servicios.js";

let token = "";
// Función para obtener el token JWT

// Función para listar usuarios
async function listar(id) {
  if (!token) {
    token=await tokenServices.getToken(); // Obtener el token si no lo tenemos aún
  }
  console.log(token);
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

// Función para crear un nuevo usuario
async function crear(nombre, email, password, rol) {
  if (rol === undefined) rol = "Cliente";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      id: 0,
      nombre: nombre,
      email: email,
      password: password,
      rol: rol,
    }),
  });
  return response;
}

// Función para editar un usuario existente
async function editar(id, nombre, email, password, rol) {
  if (!token) {
    token=await tokenServices.getToken(); // Obtener el token si no lo tenemos aún
  }
  if (rol === undefined) rol = "Cliente";

  const urlPut = `${url}/${id}`;
  const response = await fetch(urlPut, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nombre: nombre,
      email: email,
      password: password,
      rol: rol,
    }),
  });
  return response;
}

// Función para borrar un usuario
async function borrar(id) {
  try {
    // Obtener el token si no lo tenemos aún
    if (!token) {
      token = await tokenServices.getToken();
    }

    const urlDelete = `${url}/${id}`;
    const response = await fetch(urlDelete, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al borrar el elemento");
    }

    const responseData = await response.json();

    // Mostrar alerta de éxito usando SweetAlert2 con el mensaje de la respuesta
    Swal.fire({
      icon: 'success',
      title: responseData.message || 'Elemento borrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    });

    return response; // Devolver la respuesta si es necesario
  } catch (error) {
    // Mostrar alerta de error usando SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Error al intentar borrar el elemento',
      text: error.message,
      showConfirmButton: true
    });

    throw error; // Propagar el error para manejo adicional si es necesario
  }
}

// Objeto que exporta las funciones de servicios de usuarios
export const usuariosServices = {
  listar,
  crear,
  editar,
  borrar, // Incluir la función getToken en el export si necesitas llamarla explícitamente
};
