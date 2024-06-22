from models.modelos import PaqueteViaje as PaqueteViajeModel
from schemas.paqueteViaje import PaqueteViaje


class PaqueteService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_paquetes(self):
        result = self.db.query(PaqueteViajeModel).all()
        return result

    def get_paquetes_id(self, id):
        result = self.db.query(PaqueteViajeModel).filter(PaqueteViajeModel.id == id).first()
        return result
    
    def create_paquetes(self, Paquete: PaqueteViaje):
        new_Paquete = PaqueteViajeModel(**Paquete.dict())
        self.db.add(new_Paquete)
        self.db.commit()
        return
    def update_paquete(self, id: int, data: PaqueteViaje):
        paquete = self.db.query(PaqueteViajeModel).filter(PaqueteViajeModel.id == id).first()
        paquete.nombre = data.nombre
        paquete.destino_id = data.destino_id
        paquete.precio = data.precio
        paquete.cupo = data.cupo
        paquete.fecha_inicio = data.fecha_inicio
        paquete.fecha_fin = data.fecha_fin
        self.db.commit()
        return
    def delete_paquetes(self, id: int):
       self.db.query(PaqueteViajeModel).filter(PaqueteViajeModel.id == id).delete()
       self.db.commit()
       return