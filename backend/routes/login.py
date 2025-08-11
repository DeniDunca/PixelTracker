from fastapi import APIRouter, Depends, HTTPException
from database import SessionLocal
from typing_extensions import Annotated
from sqlalchemy.orm import Session
from models.schemas import UserDto
from models.models import User
from starlette import status


router = APIRouter(
    prefix="/login",
    tags=["login"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


@router.post("/regiser")
async def create_user(db: db_dependency, user: UserDto):
    create_user_model = User(
        username = user.username,
        password = user.password
    )

    db.add(create_user_model)
    db.commit()

@router.get("/users")
async def get_users(db:db_dependency):
    return db.query(User).all()

@router.post("/")
async def login(db: db_dependency, user: UserDto):
    user_db = db.query(User).filter(User.username == user.username).first()
    if user_db.password != user.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user_db