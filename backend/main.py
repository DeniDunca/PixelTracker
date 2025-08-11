from fastapi import FastAPI, Request,status
from routes import login, board, pixel
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(login.router)
app.include_router(board.router)
app.include_router(pixel.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def test(request: Request):
    return "hello"

