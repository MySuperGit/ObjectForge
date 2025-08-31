from fastapi import APIRouter
from app.services.service import some_service_function

router = APIRouter()

@router.get("/items/")
async def read_items():
    items = await some_service_function()
    return items

@router.post("/items/")
async def create_item(item: dict):
    created_item = await some_service_function(item)
    return created_item