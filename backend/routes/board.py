
from fastapi import APIRouter, Depends, HTTPException
from database import SessionLocal
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from models.schemas import BoardDto, BoardDtoUpdate
from models.models import Board

router = APIRouter(
    prefix="/board",
    tags=["board"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/{user_id}/")
async def get_boards_for_user(db: db_dependency, user_id: str, search: str = ""):
    boards = db.query(Board).filter(Board.user_id == user_id).filter(Board.category.contains(search.strip())).all()
    return boards

@router.get("/tracker/{id}")
async def get_board_by_id(db: db_dependency, id: str):
    board = db.query(Board).filter(Board.id == id).all()
    return board

@router.post("/create")
async def create_board(db: db_dependency, board: BoardDto):
    create_board_model = Board(
        user_id = board.user_id,
        category = board.category,
        start_date = board.start_date,
        finish_date = board.finish_date
    )

    db.add(create_board_model)
    db.commit()
    db.refresh(create_board_model)
    
    return create_board_model
    
@router.put("/update/{id}")
async def update_board(db: db_dependency, id:str, board: BoardDtoUpdate):
    existing_board = db.query(Board).filter(Board.id == id).first()
    if not existing_board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    existing_board.category = board.category
    existing_board.start_date = board.start_date
    existing_board.finish_date = board.finish_date
    
    db.commit()
    db.refresh(existing_board) 

    return existing_board

@router.delete("/delete/{board_id}")
async def delete_board(db: db_dependency, board_id: str):
    db.query(Board).filter(Board.id == board_id).delete()
    db.commit()
