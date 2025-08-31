from sqlalchemy.orm import Session
from app.models.models import Item
from fastapi import HTTPException

def create_item(db: Session, item: Item):
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def get_item(db: Session, item_id: int):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Item).offset(skip).limit(limit).all()