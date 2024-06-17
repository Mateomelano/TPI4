from models.modelos import Destino as DestinoModel
from schemas.destino import Destino


class DestinoService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_destinos(self):
        result = self.db.query(DestinoModel).all()
        return result

    def get_destino_id(self, id):
        result = self.db.query(DestinoModel).filter(DestinoModel.id == id).first()
        return result

    def create_destino(self, destino: Destino):
        new_destino = DestinoModel(**destino.dict())
        self.db.add(new_destino)
        self.db.commit()
        return
    def update_destino(self, id: int, data: Destino):
        destino = self.db.query(DestinoModel).filter(DestinoModel.id == id).first()
        destino.name = data.name
        destino.description = data.description
        destino.pais = data.pais
        self.db.commit()
        return
    def delete_destino(self, id: int):
       self.db.query(DestinoModel).filter(DestinoModel.id == id).delete()
       self.db.commit()
       return