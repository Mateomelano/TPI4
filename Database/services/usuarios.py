from models.modelos import Usuarios as UsuariosModel
from schemas.usuarios import Usuarios


class UsuariosService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_usuarios(self):
        result = self.db.query(UsuariosModel).all()
        return result

    def get_usuarios_id(self, id):
        result = self.db.query(UsuariosModel).filter(UsuariosModel.id == id).first()
        return result

    def get_usuarios_by_mail(self, email):
        result = self.db.query(UsuariosModel).filter(UsuariosModel.email == email).all()
        return result

    def create_usuarios(self, Usuario: Usuarios):
        new_usuario = UsuariosModel(**Usuario.dict())
        self.db.add(new_usuario)
        self.db.commit()
        return
    def update_usuarios(self, id: int, data: Usuarios):
        usuario = self.db.query(UsuariosModel).filter(UsuariosModel.id == id).first()
        usuario.nombre = data.nombre
        usuario.email = data.email
        usuario.password = data.password
        usuario.rol = data.rol

        self.db.commit()
        return
    def delete_usuarios(self, id: int):
       self.db.query(UsuariosModel).filter(UsuariosModel.id == id).delete()
       self.db.commit()
       return