from PIL import Image
from io import BytesIO
from config import settings

def ensure_safe_image(data: bytes) -> None:
    im = Image.open(BytesIO(data))
    w, h = im.size
    if w * h > settings.MAX_IMAGE_PIXELS:
        raise ValueError("too_many_pixels")
