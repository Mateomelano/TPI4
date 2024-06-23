import jwt 
import time

# Token de ejemplo
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4ifQ.ERWUnQJ6Fi5mlIC_t9ejAk4PjOuKMr7Jv02CltW-5N0"

# Decodificar el token sin verificar la firma (para propósitos de ejemplo)
decoded_token = jwt.decode(token, options={"verify_signature": False})

# Extraer el tiempo de expiración del token
expiration_time = decoded_token.get('exp')

if expiration_time:
    current_time = time.time()
    is_expired = current_time >= expiration_time

    if is_expired:
        print("El token ha expirado")
    else:
        print("El token es válido y expira en:", time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(expiration_time)))
else:
    print("El token no contiene un campo de expiración")
