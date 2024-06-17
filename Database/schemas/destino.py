from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List


class Destino(BaseModel):
    id:int 
    nombre: str = Field(min_length=1, max_length=50)
    descripcion: str = Field(min_length=10, max_length=200)
    pais: str = Field(min_length=2, max_length=50)