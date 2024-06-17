from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.modelos import Destino as DestinoModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.destino import DestinoService
from schemas.destino import Destino

destino_router = APIRouter()


@destino_router.get('/destino', tags=['Destino'], response_model=List[Destino], status_code=200)
def get_destino() -> List[Destino]:
    db = Session()
    result = DestinoService(db).get_destinos()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@destino_router.get('/destino/{id}', tags=['Destino'], response_model=Destino)
def get_destino(id: int = Path(ge=1, le=2000)) -> Destino:
    db = Session()
    result = DestinoService(db).get_destino_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@destino_router.post('/destino', tags=['Destino'], response_model=dict, status_code=201)
def create_destino(destino: Destino) -> dict:
    db = Session()
    DestinoService(db).create_destino(destino)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado la Categoria"})


@destino_router.put('/destino/{id}', tags=['Destino'], response_model=dict, status_code=200)
def update_destino(id: int, destino: Destino)-> dict:
    db = Session()
    result = DestinoService(db).get_destino_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})

    DestinoService(db).update_destino(id, destino)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado la categoria"})


@destino_router.delete('/destino/{id}', tags=['Destino'], response_model=dict, status_code=200)
def delete_destino(id: int)-> dict:
    db = Session()
    result: DestinoModel = db.query(DestinoModel).filter(DestinoModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    DestinoService(db).delete_destino(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado la categoria"})