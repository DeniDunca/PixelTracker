from database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Date

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(60), unique=True, )
    password = Column(String(60))

class Board(Base):
    __tablename__ = "board"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(60))
    user_id = Column(Integer, ForeignKey("user.id"))
    start_date= Column(Date)
    finish_date= Column(Date)

class Pixel(Base):
    __tablename__ = "pixel"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("board.id"))
    date= Column(Date)
    
class Color(Base):
    __tablename__ = "color"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("board.id"))
    color = Column(String(60))
    description = Column(String(60))

class PixelColor(Base):
    __tablename__ = "pixel_color"

    id = Column(Integer, primary_key=True, index=True)
    pixel_id = Column(Integer, ForeignKey("pixel.id"))
    color_id = Column(Integer, ForeignKey("color.id"))


