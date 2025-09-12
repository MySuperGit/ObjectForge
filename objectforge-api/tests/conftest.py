import os, io, pytest
from PIL import Image

os.environ["REMBG_PASSTHROUGH"] = "1"

from fastapi.testclient import TestClient
import app as app_module


@pytest.fixture(scope="session")
def client():
    return TestClient(app_module.app)


@pytest.fixture()
def rgb_png_bytes():
    im = Image.new("RGB", (200, 150), (240, 240, 240))
    b = io.BytesIO()
    im.save(b, format="PNG")
    return b.getvalue()


@pytest.fixture()
def fg_rgba_red_circle():
    im = Image.new("RGBA", (80, 80), (0, 0, 0, 0))
    for y in range(80):
        for x in range(80):
            dx, dy = x - 40, y - 40
            if dx * dx + dy * dy <= 35 * 35:
                im.putpixel((x, y), (255, 0, 0, 200))
    b = io.BytesIO()
    im.save(b, format="PNG")
    return b.getvalue()


@pytest.fixture()
def mask_block_40x40():
    im = Image.new("L", (200, 150), 0)
    for y in range(55, 95):
        for x in range(80, 120):
            im.putpixel((x, y), 255)
    b = io.BytesIO()
    im.save(b, format="PNG")
    return b.getvalue()
