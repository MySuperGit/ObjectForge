from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from rembg import remove
import io, requests

app = FastAPI(title="ObjectForge API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthz")
@app.get("/api/healthz")
def healthz():
    return {"ok": True}


@app.get("/features")
@app.get("/api/features")
def features():
    return [
        {
            "id": "bg-remove",
            "title": "Background Remove",
            "slug": "remove-bg",
            "group": "edit",
            "icon": "cut",
            "isNew": True,
            "newBadgeUntil": "2025-12-01",
            "availability": "available",
            "tags": ["热门"],
        },
        {
            "id": "virtual-human",
            "title": "Virtual Human",
            "slug": "virtual-human",
            "group": "generate",
            "icon": "user",
            "availability": "coming_soon",
            "releaseAt": "2026-01-10",
            "tags": ["技术"],
        },
    ]


@app.get("/gallery")
@app.get("/api/gallery")
def gallery():
    return [
        {
            "id": f"g{i}",
            "thumb": f"https://picsum.photos/seed/{i}/400/300",
            "full": f"https://picsum.photos/seed/{i}/1200/900",
            "tags": ["灵感"],
            "author": f"User{i}",
        }
        for i in range(1, 25)
    ]


@app.get("/reviews")
@app.get("/api/reviews")
def reviews():
    return [
        {
            "id": f"r{i}",
            "user": f"User {i}",
            "avatar": None,
            "rating": 5,
            "content": "Great!",
            "country": "US",
        }
        for i in range(10)
    ]


@app.get("/pricing")
@app.get("/api/pricing")
def pricing():
    return [
        {
            "id": "monthly",
            "title": "Monthly",
            "price": "$19",
            "features": ["HD export", "Priority queue"],
            "cta": "Subscribe",
        },
        {
            "id": "credits",
            "title": "Credits",
            "price": "$10/200",
            "features": ["Pay as you go"],
            "cta": "Buy",
        },
        {
            "id": "lifetime",
            "title": "Lifetime",
            "price": "$199",
            "features": ["Forever access"],
            "cta": "Purchase",
        },
    ]


@app.get("/i18n/{lang}.json")
@app.get("/api/i18n/{lang}.json")
def i18n(lang: str):
    if lang.startswith("zh"):
        return {
            "nav": {"home": "首页", "plaza": "图片广场", "reviews": "用户评价", "pricing": "计费"},
            "cta": {"start": "开始处理"},
        }
    return {
        "nav": {"home": "Home", "plaza": "Plaza", "reviews": "Reviews", "pricing": "Pricing"},
        "cta": {"start": "Start"},
    }


@app.post("/api/v1/bg/remove")
async def bg_remove(image_file: UploadFile = File(None), image_url: str = Form(None)):
    if image_file:
        raw = image_file.file.read()
    elif image_url:
        r = requests.get(image_url, timeout=20)
        r.raise_for_status()
        raw = r.content
    else:
        return JSONResponse({"error": "image_file or image_url required"}, status_code=400)
    cut = remove(raw)
    buf = io.BytesIO(cut)
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")
