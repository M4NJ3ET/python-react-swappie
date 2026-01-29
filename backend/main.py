# this is backend/main.py
from
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import models, schemas
from database import engine, SessionLocal, Base
from auth import hash_password, verify_password
import models 
from models import SwappieMatch, SwappieUser, User
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=True,
    allow_methods=["*"],        
    allow_headers=["*"],       
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


import random


@app.post("/register")
def register(user: schemas.RegisterUser, db: Session = Depends(get_db)):
    print(" REGISTER HIT:", user.email)

    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    unique_id = random.randint(100,10000)

    new_user = models.User(
        unique_id=unique_id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    print("✅ REGISTER SUCCESS:", new_user.id)
    return {"message": "User registered successfully","unique_id":unique_id}

@app.post("/login")
def login(user: schemas.LoginUser, db: Session = Depends(get_db)):
    email = user.email.strip()
    password = user.password.strip()

    db_user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if not db_user or not verify_password(password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    # if not db_user or not verify_password(password, db_user.password):
    #     raise HTTPException(
    #         status_code=401,
    #         detail="Invalid email or password"
    #     )

    return {
        "name": db_user.name,
        "email": db_user.email,
        "phone": db_user.phone,
        "unique_id": db_user.unique_id,
        "message": "Login successful"}


@app.post("/verify-forgot")
def verify_forgot(email: str, unique_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        models.User.email == email,
        models.User.unique_id == unique_id
    ).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or unique ID")

    return {"message": "Verified"}

@app.post("/reset-password")
def reset_password(
    email: str,
    new_password: str,
    confirm_password: str,
    db: Session = Depends(get_db)
):
    if new_password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = hash_password(new_password)
    db.commit()

    return {"message": "Password reset successful"}

@app.get("/api/swappie/matches/{unique_id}")
def get_matches(unique_id: int, db: Session = Depends(get_db)):
    return db.query(SwappieMatch).filter(
        (SwappieMatch.user1_unique_id == unique_id) |
        (SwappieMatch.user2_unique_id == unique_id)
    ).all()


class SwappieProfileSchema(BaseModel):
    unique_id: int
    address: str
    current_location: str
    desired_location: str
    budget: int


@app.post("/api/swappie/profile")
def save_swappie_profile(
    data: SwappieProfileSchema, 
    db: Session = Depends(get_db)
):
    existing = db.query(SwappieUser).filter(
        SwappieUser.unique_id == data.unique_id
    ).first()

    if existing:
        existing.address = data.address
        existing.current_location = data.current_location
        existing.desired_location = data.desired_location
        existing.budget = data.budget
    else:
        new_profile = SwappieUser(
            unique_id=data.unique_id,
            address=data.address,
            current_location=data.current_location,
            desired_location=data.desired_location,
            budget=data.budget
        )
        db.add(new_profile)

    db.commit()

    db.query(SwappieMatch).filter(
        (SwappieMatch.user1_unique_id == data.unique_id) |
        (SwappieMatch.user2_unique_id == data.unique_id)
    ).delete(synchronize_session=False)

    db.commit()


    generate_matches(data.unique_id, db)

    return {"message": "Swappie profile saved successfully"}

def generate_matches(unique_id: int, db: Session):
    
    user = db.query(SwappieUser).filter(
        SwappieUser.unique_id == unique_id
    ).first()

    if not user:
        return

    auth_user = db.query(User).filter(
        User.unique_id == unique_id
    ).first()

    others = db.query(SwappieUser).filter(
        SwappieUser.unique_id != unique_id
    ).all()

    for other in others:
        if (
            user.desired_location.strip().lower()
            == other.current_location.strip().lower()
            and other.desired_location.strip().lower()
            == user.current_location.strip().lower()
            and (abs(user.budget - other.budget) <= 2000 or abs(other.budget - user.budget) <= 2000)
            ):

            other_auth = db.query(User).filter(
                User.unique_id == other.unique_id
            ).first()
            if not other_auth:
                continue
            # ✅ INTEGER-safe ordering
            if unique_id < other.unique_id:
                user1_id = unique_id
                user1_name = auth_user.name
                user2_id = other.unique_id
                user2_name = other_auth.name
            else:
                user1_id = other.unique_id
                user1_name = other_auth.name
                user2_id = unique_id
                user2_name = auth_user.name

            exists = db.query(SwappieMatch).filter(
                SwappieMatch.user1_unique_id == user1_id,
                SwappieMatch.user2_unique_id == user2_id
            ).first()

            if not exists:
                db.add(
                    SwappieMatch(
                        user1_name=auth_user.name,
                        user2_name=other_auth.name,
                        user1_unique_id=user1_id,
                        user2_unique_id=user2_id
                    )
                )
                

    db.commit()















# @app.post("/delete-account")
# def delete_account(
#     email: str,
#     password: str,
#     db: Session = Depends(get_db)
# ):          
#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not user or not verify_password(password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     db.delete(user)
#     db.commit()

#     return {"message": "Account deleted successfully."}



# @app.post("/change-password")
# def change_password(
#     email: str,
#     current_password: str,
#     new_password: str,
#     confirm_password: str,
#     db: Session = Depends(get_db)
# ):
#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not verify_password(current_password, user.password):
#         raise HTTPException(status_code=401, detail="Current password is incorrect")

#     if new_password != confirm_password:
#         raise HTTPException(status_code=400, detail="New passwords do not match")

#     user.password = hash_password(new_password)
#     db.commit()

#     return {"message": "Password changed successfully"} 