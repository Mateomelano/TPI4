from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date


class PaqueteViaje(BaseModel):
    id: int
    destino_id: int
    nombre: str = Field(min_length=5, max_length=25)
    precio: int
    cupo: int
    fecha_inicio: date
    fecha_fin: date


