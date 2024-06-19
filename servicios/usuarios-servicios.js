const url = "http://127.0.0.1:8000/usuarios";
const urlLogin = "http://127.0.0.1:8000/login";

let token = "";

// Función para obtener el token JWT
async function getToken() {
  const response = await fetch(urlLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "admin@gmail.com",
      password: "admin",
    }),
  });
  const data = await response.json();
  token = data.token; // Guardamos el token globalmente para usarlo en las solicitudes
}
// Función para listar usuarios
async function listar(id) {
  if (!token) {
    await getToken(); // Obtener el token si no lo tenemos aún
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

// Función para crear un nuevo usuario
async function crear(nombre, email, password, rol) {
  if (rol === undefined) rol = "Cliente";
  try {
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

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzar un error con el mensaje del servidor
      const mensajeError = await response.text();
      throw new Error(mensajeError);
    }

    return response.json(); // Devolver la respuesta en formato JSON
  } catch (error) {
    throw new Error("Error en la solicitud: " + error.message);
  }
}

// Función para editar un usuario existente
async function editar(id, nombre, email, password, rol) {
  if (rol === undefined) rol = "Cliente";
  try {
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

    if (!response.ok) {
      // Si la respuesta no es exitosa, lanzar un error con el mensaje del servidor
      const mensajeError = await response.text();
      throw new Error(mensajeError);
    }

    return response.json(); // Devolver la respuesta en formato JSON
  } catch (error) {
    throw new Error("Error en la solicitud: " + error.message);
  }
}

// Función para borrar un usuario
async function borrar(id) {
  const urlDelete = `${url}/${id}`;
  const response = await fetch(urlDelete, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

// Objeto que exporta las funciones de servicios de usuarios
export const usuariosServices = {
  listar,
  crear,
  editar,
  borrar, // Incluir la función getToken en el export si necesitas llamarla explícitamente
};
