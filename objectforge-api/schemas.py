from pydantic import BaseModel, Field
from typing import Literal, Optional, List

FeatureGroup = Literal['generate','edit','inspire','business']

class Feature(BaseModel):
    id: str
    title: str
    slug: str
    group: FeatureGroup
    icon: Optional[str] = None
    isNew: Optional[bool] = False
    newBadgeUntil: Optional[str] = None
    availability: Literal['available','coming_soon'] = 'available'
    releaseAt: Optional[str] = None
    tags: Optional[List[str]] = []

class GalleryItem(BaseModel):
    id: str
    thumb: str
    full: str
    tags: Optional[List[str]] = []
    author: Optional[str] = None

class Review(BaseModel):
    id: str
    user: str
    avatar: Optional[str] = None
    rating: int = Field(ge=1, le=5)
    content: str
    country: Optional[str] = None

class Plan(BaseModel):
    id: Literal['monthly','credits','lifetime']
    title: str
    price: str
    features: List[str]
    cta: str
    badge: Optional[Literal['Best Value','Popular']] = None
