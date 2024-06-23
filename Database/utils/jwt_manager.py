from jwt import encode, decode, ExpiredSignatureError, InvalidTokenError
from datetime import datetime, timedelta

SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"

def create_token(data: dict) -> str:
    # Agrega la expiración al payload
    expiration = datetime.utcnow() + timedelta(hours=1)  # Token expirará en 1 hora
    data.update({"exp": expiration})
    token: str = encode(payload=data, key=SECRET_KEY, algorithm=ALGORITHM)
    return token

def validate_token(token: str) -> dict:
    try:
        data: dict = decode(token, key=SECRET_KEY, algorithms=[ALGORITHM])
        return data
    except ExpiredSignatureError:
        raise Exception("Token expired")
    except InvalidTokenError:
        raise Exception("Invalid token")
