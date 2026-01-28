from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


#Main table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    unique_id = Column(Integer, unique=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    phone = Column(String(15))
    password = Column(String(255))


class SwappieUser(Base):
    __tablename__ = "swappie_user"

    id = Column(Integer, primary_key=True, index=True)

    unique_id = Column(
        Integer,
        ForeignKey("users.unique_id"),
        unique=True,
        nullable=False
    )

    address = Column(String(225))
    current_location = Column(String(225))
    desired_location = Column(String(225))
    budget = Column(Integer)


class SwappieMatch(Base):
    __tablename__ = "swappie_match"

    id = Column(Integer, primary_key=True, index=True)

    user1_name = Column(String(100))
    user2_name = Column(String(100))

    # ✅ INTEGER (NOT String)
    user1_unique_id = Column(Integer)
    user2_unique_id = Column(Integer)
