// URL base de la API REST de usuarios
const url = "http://127.0.0.1:8000/usuarios";

// Función para listar usuarios

async function listar(id) {
  let cadUrl;
  if (isNaN(id)) 
    cadUrl = url;
  else
    cadUrl = `${url}/${id}`;  
  console.log(fetch(cadUrl).then((respuesta) => respuesta.json()));
  return await fetch(cadUrl).then((respuesta) => respuesta.json());
}

// Función para crear un nuevo usuario
async function crear(nombre, email, password, rol) {
  if (rol === undefined) rol = "Cliente";
  console.log(
    JSON.stringify({
      id: 0,
      nombre: nombre,
      email: email,
      password: password,
      rol: "Administrador",
    })
  )
  return await fetch(url, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      id: 0,
      nombre: nombre,
      email: email,
      password: password,
      rol: rol
    }),
  });
}

// Función para editar un usuario existente
async function editar(id, nombre, email, password, rol) {
  if (rol === undefined) rol = "Cliente";
  let urlPut = `${url}/${id}`;
  return await fetch(urlPut, {
    method: "PUT",
    headers: {
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
}

// Función para borrar un usuario
async function borrar(id) {
  let urlDelete = `${url}/${id}`;
  return await fetch(urlDelete, {
    method: "DELETE",
  });
}

// Objeto que exporta las funciones de servicios de usuarios
export const usuariosServices = {
  listar,
  crear,
  editar,
  borrar,
};
