from fastapi import APIRouter, Query, Response
from typing import List, Optional
from pathlib import Path
import json, random
from schemas import Feature, GalleryItem, Review, Plan
from utils.etag import set_etag

router = APIRouter(tags=["content"])
DATA = Path(__file__).resolve().parents[1] / "data"

def _load(name: str):
    with open(DATA / name, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/features", response_model=List[Feature])
def features(response: Response, group: Optional[str] = Query(None), tag: Optional[str] = Query(None), limit: int = Query(0, ge=0, le=200), shuffle: bool = Query(False)):
    items = _load("features.json")
    if group:
        items = [i for i in items if i.get("group") == group]
    if tag:
        items = [i for i in items if tag in (i.get("tags") or [])]
    if shuffle:
        random.shuffle(items)
    total = len(items)
    if limit:
        items = items[:limit]
    response.headers["X-Total-Count"] = str(total)
    return items

@router.get("/gallery", response_model=List[GalleryItem])
def gallery(response: Response, tag: Optional[str] = None, page: int = Query(1, ge=1), page_size: int = Query(0, ge=0, le=200)):
    items = _load("gallery.json")
    if tag:
        items = [i for i in items if tag in (i.get("tags") or [])]
    total = len(items)
    if page_size:
        start = (page - 1) * page_size
        end = start + page_size
        items = items[start:end]
    response.headers["X-Total-Count"] = str(total)
    return items

@router.get("/reviews", response_model=List[Review])
def reviews(response: Response, limit: int = Query(10, ge=1, le=100)):
    items = _load("reviews.json")
    response.headers["X-Total-Count"] = str(len(items))
    return items[:limit]

@router.get("/pricing", response_model=List[Plan])
def pricing(response: Response):
    items = _load("pricing.json")
    response.headers["Cache-Control"] = "public, max-age=600"
    return items

@router.get("/i18n/{lang}.json")
def i18n(lang: str, response: Response):
    name = "i18n_zh.json" if lang.lower().startswith("zh") else "i18n_en.json"
    items = _load(name)
    response.headers["Cache-Control"] = "public, max-age=600"
    return items
