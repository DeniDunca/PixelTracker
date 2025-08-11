
from fastapi import APIRouter, Depends
from database import SessionLocal
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from models.schemas import BoardDto
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

@router.get("/{user_id}")
async def get_boards_for_user(db: db_dependency, user_id: str):
    boards = db.query(Board).filter(Board.user_id == user_id).all()
    return boards

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

@router.delete("/delete/{board_id}")
async def delete_board(db: db_dependency, board_id: str):
    db.query(Board).filter(Board.id == board_id).delete()
    db.commit()
