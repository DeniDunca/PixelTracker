from pydantic import BaseModel
from datetime import date

class UserDto(BaseModel):
    username: str
    password: str

class BoardDto(BaseModel):
    user_id: int
    category: str
    start_date: date
    finish_date: date

class PixelDto(BaseModel):
    board_id: int
    date: date
    
class PixelUpdateDto(BaseModel):
    id: int
    board_id: int
    date: date
  
    