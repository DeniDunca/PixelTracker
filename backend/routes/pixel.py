from fastapi import APIRouter, Depends
from database import SessionLocal
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from models.schemas import PixelDto, PixelUpdateDto
from models.models import Pixel

router = APIRouter(
    prefix="/pixel",
    tags=["pixel"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get("/{board_id}")
async def get_pixels_for_board(db: db_dependency, board_id: str):
    pixels = db.query(Pixel).filter(Pixel.board_id == board_id).all()
    return pixels

@router.post("/create")
async def create_pixel(db: db_dependency, pixel: PixelDto):
    create_pixel_model = Pixel(
        board_id = pixel.board_id,
        date = pixel.date,
        color = pixel.color,
        description = pixel.description
    )

    db.add(create_pixel_model)
    db.commit()

@router.delete("/delete/{pixel_id}")
async def delete_pixel(db: db_dependency, pixel_id: str):
    db.query(Pixel).filter(Pixel.id == pixel_id).delete()
    db.commit()

@router.put("/update")
async def update_pixel(db: db_dependency, pixel: PixelUpdateDto):
    pixel_update=db.query(Pixel).filter(Pixel.id == pixel.id).first()

    pixel_update.board_id = pixel.board_id,
    pixel_update.date = pixel.date,
    pixel_update.color = pixel.color,
    pixel_update.description = pixel.description

    db.add(pixel_update)
    db.commit()
    