from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse, JSONResponse
from rembg import remove
from utils.net import fetch_image_bytes
from utils.img import ensure_safe_image
from config import settings
import io
from PIL import Image, ImageEnhance, ImageOps
import numpy as np

router = APIRouter(prefix="/api/v1", tags=["images"])

# ---------- helpers ----------
async def _read_image_or_url(image_file: UploadFile | None, image_url: str | None) -> bytes:
    if image_file:
        if not (image_file.content_type or "").startswith("image/"):
            raise ValueError("unsupported_content_type")
        data = await image_file.read()
        if len(data) > settings.MAX_IMAGE_BYTES:
            raise ValueError("image_too_large")
        return data
    if image_url:
        return await fetch_image_bytes(image_url)
    raise ValueError("image_file or image_url required")

def _png_response(data: bytes) -> StreamingResponse:
    buf = io.BytesIO(data); buf.seek(0)
    resp = StreamingResponse(buf, media_type="image/png")
    resp.headers["Cache-Control"] = "no-store"
    return resp

def _to_png_bytes(img: Image.Image) -> bytes:
    b = io.BytesIO()
    img.save(b, format="PNG")
    return b.getvalue()

# ---------- 1) 背景移除 ----------
@router.post("/bg/remove")
async def bg_remove(image_file: UploadFile = File(None), image_url: str = Form(None)):
    try:
        data = await _read_image_or_url(image_file, image_url)
        ensure_safe_image(data)

        if settings.REMBG_PASSTHROUGH:
            im = Image.open(io.BytesIO(data)).convert("RGBA")
            return _png_response(_to_png_bytes(im))

        cut = remove(data)
        return _png_response(cut)
    except ValueError as e:
        return JSONResponse({"error": str(e)}, status_code=400)
    except Exception:
        return JSONResponse({"error":"internal_error"}, status_code=500)

# ---------- 2) 合成 ----------
@router.post("/composite")
async def composite(
    bg_file: UploadFile = File(None),
    fg_file: UploadFile = File(None),
    bg_url: str = Form(None),
    fg_url: str = Form(None),
    x: int = Form(0),
    y: int = Form(0),
    scale: float = Form(1.0),
    opacity: float = Form(1.0)
):
    try:
        bg_bytes = await _read_image_or_url(bg_file, bg_url)
        fg_bytes = await _read_image_or_url(fg_file, fg_url)
        ensure_safe_image(bg_bytes); ensure_safe_image(fg_bytes)

        bg = Image.open(io.BytesIO(bg_bytes)).convert("RGBA")
        fg = Image.open(io.BytesIO(fg_bytes)).convert("RGBA")

        if scale != 1.0 and scale > 0:
            w, h = fg.size
            fg = fg.resize((max(1, int(w*scale)), max(1, int(h*scale))), Image.LANCZOS)

        if opacity < 1.0:
            alpha = fg.split()[-1]
            alpha = ImageEnhance.Brightness(alpha).enhance(max(0.0, min(1.0, opacity)))
            fg.putalpha(alpha)

        canvas = bg.copy()
        canvas.alpha_composite(fg, (x, y))
        return _png_response(_to_png_bytes(canvas))
    except ValueError as e:
        return JSONResponse({"error": str(e)}, status_code=400)
    except Exception:
        return JSONResponse({"error":"internal_error"}, status_code=500)

# ---------- 3) 修补 ----------
@router.post("/edit/inpaint")
async def inpaint(
    image_file: UploadFile = File(None),
    mask_file: UploadFile = File(None),
    image_url: str = Form(None),
    mask_url: str = Form(None),
    radius: int = Form(3),
    method: str = Form("telea")
):
    try:
        import cv2
        img_bytes = await _read_image_or_url(image_file, image_url)
        msk_bytes = await _read_image_or_url(mask_file, mask_url)
        ensure_safe_image(img_bytes); ensure_safe_image(msk_bytes)

        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        mask = Image.open(io.BytesIO(msk_bytes)).convert("L").resize(img.size, Image.NEAREST)

        img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
        mask_cv = np.array(mask)
        flag = cv2.INPAINT_TELEA if method.lower() == "telea" else cv2.INPAINT_NS
        out = cv2.inpaint(img_cv, mask_cv, max(1, int(radius)), flag)
        out_img = Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB)).convert("RGBA")
        return _png_response(_to_png_bytes(out_img))
    except ValueError as e:
        return JSONResponse({"error": str(e)}, status_code=400)
    except Exception:
        return JSONResponse({"error":"internal_error"}, status_code=500)

# ---------- 4) 调色 ----------
@router.post("/edit/adjust")
async def adjust(
    image_file: UploadFile = File(None),
    image_url: str = Form(None),
    brightness: float = Form(1.0),
    contrast: float = Form(1.0),
    saturation: float = Form(1.0)
):
    try:
        data = await _read_image_or_url(image_file, image_url)
        ensure_safe_image(data)

        img = Image.open(io.BytesIO(data)).convert("RGBA")
        base = img.convert("RGB")
        if brightness != 1.0:
            base = ImageEnhance.Brightness(base).enhance(max(0.0, min(2.0, brightness)))
        if contrast != 1.0:
            base = ImageEnhance.Contrast(base).enhance(max(0.0, min(2.0, contrast)))
        if saturation != 1.0:
            base = ImageEnhance.Color(base).enhance(max(0.0, min(2.0, saturation)))

        result = Image.alpha_composite(Image.new("RGBA", img.size, (0,0,0,0)), base.convert("RGBA"))
        return _png_response(_to_png_bytes(result))
    except ValueError as e:
        return JSONResponse({"error": str(e)}, status_code=400)
    except Exception:
        return JSONResponse({"error":"internal_error"}, status_code=500)
