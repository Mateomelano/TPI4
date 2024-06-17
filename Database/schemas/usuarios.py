from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional, List


class Usuarios(BaseModel):
    id: int
    nombre: str = Field(min_length=5, max_length=20)
    email: EmailStr
    password: str = Field(min_length=8)
    rol: str
    @field_validator('rol')
    def validate_rol(cls, roll):
        if roll not in ["Cliente", "Administrador"]:
            raise ValueError('El campo "rol" debe ser "Cliente" o "Administrador"')
        return roll


