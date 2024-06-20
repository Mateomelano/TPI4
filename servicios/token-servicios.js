const urlLogin = "http://127.0.0.1:8000/login";

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
  return data.token; // Guardamos el token globalmente para usarlo en las solicitudes
}

export const tokenServices = {
  getToken,
}