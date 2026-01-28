from pydantic import BaseModel, EmailStr, Field

class RegisterUser(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    password: str = Field(..., min_length=6)

class LoginUser(BaseModel):
    email: EmailStr
    password: str
