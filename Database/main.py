from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from config.database import engine, Base
from middlewares.error_handler import ErrorHandler
from routers.user import user_router
from routers.reserva import reserva_router
from routers.usuarios import usuarios_router
from routers.destino import destino_router
from routers.paqueteViaje import paquetes_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()



@app.get("/")
def read_root():
    return {"Hello": "World"}

app = FastAPI()
app.title = "Mi aplicación con  FastAPI"
app.version = "0.0.1"

app.add_middleware(ErrorHandler)
app.add_middleware(CORSMiddleware,allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],)
app.include_router(user_router)
app.include_router(reserva_router)
app.include_router(usuarios_router)
app.include_router(destino_router)
app.include_router(paquetes_router)

Base.metadata.create_all(bind=engine)



@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')

