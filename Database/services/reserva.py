from models.modelos import Reserva as ReservaModel
from schemas.reserva import Reserva


class ReservaService():
    
    def __init__(self, db) -> None:
        self.db = db

    def get_reservas(self):
        result = self.db.query(ReservaModel).all()
        return result

    def get_reservas_id(self, id):
        result = self.db.query(ReservaModel).filter(ReservaModel.id == id).first()
        return result

    def create_reserva(self, Product: Reserva):
        new_reserva = ReservaModel(**Product.dict())
        self.db.add(new_reserva)
        self.db.commit()
        return
    def update_reserva(self, id: int, data: Reserva):
        reserva = self.db.query(ReservaModel).filter(ReservaModel.id == id).first()
        reserva.usuario_id = data.usuario_id
        reserva.paquete_id = data.paquete_id
        reserva.fecha_reserva = data.fecha_reserva
        reserva.cantidad_personas = data.cantidad_personas
        self.db.commit()
        return
    def delete_reserva(self, id: int):
       self.db.query(ReservaModel).filter(ReservaModel.id == id).delete()
       self.db.commit()
       return