from fastapi import APIRouter
from fastapi import Depends, Path, Query
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from config.database import Session
from models.modelos import Usuarios as UsuarioModel
from fastapi.encoders import jsonable_encoder
from middlewares.jwt_bearer import JWTBearer
from services.usuarios import UsuariosService
from schemas.usuarios import Usuarios

usuarios_router = APIRouter()


@usuarios_router.get('/usuarios', tags=['Usuarios'], response_model=List[Usuarios], status_code=200)
def get_usuarios() -> List[Usuarios]:
    db = Session()
    result = UsuariosService(db).get_usuarios()
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.get('/usuarios/{id}', tags=['Usuarios'], response_model=Usuarios)
def get_usuarios(id: int = Path(ge=1, le=2000)) -> Usuarios:
    db = Session()
    result = UsuariosService(db).get_usuarios_id(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.get('/usuarios/', tags=['Usuarios'], response_model=List[Usuarios])
def get_usuarios_by_mail(email: str = Query(min_length=5, max_length=35)) -> List[Usuarios]:
    db = Session()
    result = UsuariosService(db).get_usuarios_by_mail(email)
    return JSONResponse(status_code=200, content=jsonable_encoder(result))


@usuarios_router.post('/usuarios', tags=['Usuarios'], response_model=dict, status_code=201)
def create_usuarios(usuario: Usuarios) -> dict:
    db = Session()
    UsuariosService(db).create_usuarios(usuario)
    return JSONResponse(status_code=201, content={"message": "Se ha registrado el usuario"})


@usuarios_router.put('/usuarios/{id}', tags=['Usuarios'], response_model=dict, status_code=200)
def update_usuarios(id: int, Usuarios: Usuarios)-> dict:
    db = Session()
    result = UsuariosService(db).get_usuarios(id)
    if not result:
        return JSONResponse(status_code=404, content={'message': "No encontrado"})
    
    UsuariosService(db).update_usuario(id, Usuarios)
    return JSONResponse(status_code=200, content={"message": "Se ha modificado el usuario"})


@usuarios_router.delete('/usuarios/{id}', tags=['Usuarios'], response_model=dict, status_code=200)
def delete_usuarios(id: int)-> dict:
    db = Session()
    result: UsuarioModel = db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
    if not result:
        return JSONResponse(status_code=404, content={"message": "No se encontró"})
    UsuariosService(db).delete_usuarios(id)
    return JSONResponse(status_code=200, content={"message": "Se ha eliminado el usuario"})