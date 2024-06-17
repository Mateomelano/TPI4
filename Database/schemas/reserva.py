from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import date

class Reserva(BaseModel):
    id: int
    usuario_id: int
    paquete_id: int
    fecha_reserva: date
    cantidad_personas: int
