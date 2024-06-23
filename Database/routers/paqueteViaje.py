from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import SessionLocal
from models.modelos import PaqueteViaje as PaqueteViajeModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.paqueteViaje import PaqueteService
from schemas.paqueteViaje import PaqueteViaje

paquetes_router = APIRouter()


@paquetes_router.get('/paquetes', tags=['paquetes'], response_model=List[PaqueteViaje], status_code=200, dependencies=[Depends(JWTBearer())])
def get_paquetes() -> List[PaqueteViaje]:
    db = SessionLocal()
    result = PaqueteService(db).get_paquetes()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@paquetes_router.get('/paquetes/{id}', tags=['paquetes'], response_model=PaqueteViaje, dependencies=[Depends(JWTBearer())])
def get_paquetes(id: int = Path(ge=1, le=2000)) -> PaqueteViaje:
    db = SessionLocal()
    result = PaqueteService(db).get_paquetes_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@paquetes_router.post('/paquetes', tags=['paquetes'], response_model=dict, status_code=201, dependencies=[Depends(JWTBearer())])
def create_paquetes(paquetes: PaqueteViaje) -> dict:
    db = SessionLocal()
    PaqueteService(db).create_paquetes(paquetes)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el paquete"})


@paquetes_router.put('/paquetes/{id}', tags=['paquetes'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def update_paquetes(id: int, paquetes: PaqueteViaje)-> dict:
    db = SessionLocal()
    result = PaqueteService(db).get_paquetes_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    PaqueteService(db).update_paquete(id, paquetes)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el paquete"})


@paquetes_router.delete('/paquetes/{id}', tags=['paquetes'], response_model=dict, status_code=200, dependencies=[Depends(JWTBearer())])
def delete_paquetes(id: int)-> dict:
    db = SessionLocal()
    result: PaqueteViajeModel = db.query(PaqueteViajeModel).filter(PaqueteViajeModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    PaqueteService(db).delete_paquetes(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el paquete"})