from fastapi import FastAPI, Request,status
from routes import login, board, pixel
from database import engine, Base


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(login.router)
app.include_router(board.router)
app.include_router(pixel.router)

@app.get("/")
def test(request: Request):
    return "hello"

