from config.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.orm import relationship, declarative_base

class Usuarios(Base):
    __tablename__ = 'usuarios'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(16), nullable=False)
    email = Column(String(25), unique=True, nullable=False, index=True)
    password = Column(String(25), nullable=False)
    rol = Column(String(10), nullable=False)

    reservas = relationship("Reserva", back_populates="usuario")  # Corrected: Use "usuario" class

class Reserva(Base):
    __tablename__ = 'reservas'
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    paquete_id = Column(Integer, ForeignKey('paquetes_viaje.id'), nullable=False)
    fecha_reserva = Column(Date, nullable=False)
    cantidad_personas = Column(Integer, nullable=False)

    usuario = relationship(Usuarios, back_populates="reservas" )  # Use Usuarios class with forward reference
    paquete = relationship("PaqueteViaje", back_populates="reservas")
class PaqueteViaje(Base):
    __tablename__ = 'paquetes_viaje'
    id = Column(Integer, primary_key=True, index=True)
    destino_id = Column(Integer, ForeignKey('destinos.id'), nullable=False)
    nombre = Column(String(16), nullable=False)
    precio = Column(Float, nullable=False)
    cupo = Column(Integer, nullable=False)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=False)

    destino = relationship("Destino", back_populates="paquetes")
    reservas = relationship("Reserva", back_populates="paquete")
class Destino(Base):
    __tablename__ = 'destinos'
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(16), nullable=False)
    descripcion = Column(String(35), nullable=False)
    pais = Column(String(15), nullable=False)

    paquetes = relationship("PaqueteViaje", back_populates="destino")
