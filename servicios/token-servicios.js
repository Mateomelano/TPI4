const urlLogin = "http://127.0.0.1:8000/token";
import { get_mail, get_pass } from "../controladores/login-controler.js";

// Función para obtener el token JWT
async function getToken() {
  try {
    let email = get_mail();
    let password = get_pass();
    const response = await fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Espera correctamente a que la respuesta se convierta en JSON

    console.log(data);
    return data.access_token; // Guarda el token globalmente para usarlo en las solicitudes
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

export const tokenServices = {
  getToken,
};