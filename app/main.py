from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path
from PIL import Image
import io


BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


app = FastAPI(title="ObjectForge · AI 图像工坊（MVP）")


# 静态资源
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")


# 模板
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
return templates.TemplateResponse("index.html", {
"request": request,
"img_url": None,
"processed_url": None
})


@app.post("/api/upload", response_class=HTMLResponse)
async def upload_image(request: Request, file: UploadFile = File(...)):
# 占位：保存并原样返回，后续在此接入抠图/增强等AI处理
content = await file.read()
img = Image.open(io.BytesIO(content)).convert("RGB")


stem = Path(file.filename).stem
out_name = f"{stem}_orig.jpg"
out_path = UPLOAD_DIR / out_name
img.save(out_path, quality=95)


img_url = f"/static/uploads/{out_name}"


# 这里 processed_url 先用原图占位；后续替换为处理后图片
processed_url = img_url


return templates.TemplateResponse("index.html", {
"request": request,
"img_url": img_url,
"processed_url": processed_url
})


@app.get("/api/ping")
def ping():
return {"ok": True, "msg": "pong"}