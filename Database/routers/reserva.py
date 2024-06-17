from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.modelos import Reserva as ReservaModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.reserva import ReservaService
from schemas.reserva import Reserva

reserva_router = APIRouter()


@reserva_router.get('/reserva', tags=['Reserva'], response_model=List[Reserva], status_code=200)
def get_reserva() -> List[Reserva]:
    db = Session()
    result = ReservaService(db).get_reservas()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@reserva_router.get('/reserva/{id}', tags=['Reserva'], response_model=Reserva)
def get_reserva(id: int = Path(ge=1, le=2000)) -> Reserva:
    db = Session()
    result = ReservaService(db).get_reservas_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))



@reserva_router.post('/reserva', tags=['Reserva'], response_model=dict, status_code=201)
def create_reserva(reserva: Reserva) -> dict:
    db = Session()
    ReservaService(db).create_reserva(reserva)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la reserva"})


@reserva_router.put('/reserva/{id}', tags=['Reserva'], response_model=dict, status_code=200)
def update_reserva(id: int, reserva: Reserva)-> dict:
    db = Session()
    result = ReservaService(db).get_reservas(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    ReservaService(db).update_reserva(id, reserva)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la reserva"})


@reserva_router.delete('/reserva/{id}', tags=['Reserva'], response_model=dict, status_code=200)
def delete_reserva(id: int)-> dict:
    db = Session()
    result: ReservaModel = db.query(ReservaModel).filter(ReservaModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    ReservaService(db).delete_reserva(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la reserva"})