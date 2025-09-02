# from fastapi import FastAPI
# from app.api.routes import router as api_router

# app = FastAPI()

# app.include_router(api_router)

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the FastAPI application!"}

# app/main.py
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
from pathlib import Path
from PIL import Image
import io

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="ObjectForge - Mini Image Lab")

# 挂载静态资源
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

# 模板引擎
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "img_url": None})

@app.post("/api/upload", response_class=HTMLResponse)
async def upload_image(request: Request, file: UploadFile = File(...)):
    # 简单保存并原样返回（占位：后面把AI增强、抠图接进来）
    content = await file.read()
    img = Image.open(io.BytesIO(content)).convert("RGB")

    out_name = f"{Path(file.filename).stem}_orig.jpg"
    out_path = UPLOAD_DIR / out_name
    img.save(out_path, quality=95)

    # 把结果回传到同一个页面
    img_url = f"/static/uploads/{out_name}"
    return templates.TemplateResponse("index.html", {"request": request, "img_url": img_url})

@app.get("/api/ping")
def ping():
    return {"ok": True, "msg": "pong"}
