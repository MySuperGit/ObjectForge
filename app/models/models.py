from pydantic import BaseModel
from typing import List, Optional

class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

class User(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None
    items: List[Item] = []