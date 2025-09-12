import io
from PIL import Image


def _is_png(resp):
    return resp.status_code == 200 and resp.headers.get("content-type", "").startswith("image/png")


def test_bg_remove_file(client, rgb_png_bytes):
    files = {"image_file": ("a.png", rgb_png_bytes, "image/png")}
    r = client.post("/api/v1/bg/remove", files=files)
    assert _is_png(r)
    assert len(r.content) > 100


def test_bg_remove_reject_private_url(client):
    r = client.post("/api/v1/bg/remove", data={"image_url": "http://127.0.0.1/xxx.png"})
    assert r.status_code in (400, 415)
    assert "error" in r.json()


def test_composite_basic(client, rgb_png_bytes, fg_rgba_red_circle):
    files = {
        "bg_file": ("bg.png", rgb_png_bytes, "image/png"),
        "fg_file": ("fg.png", fg_rgba_red_circle, "image/png"),
    }
    r = client.post("/api/v1/composite", files=files, data={"x": 50, "y": 40, "scale": 1.0, "opacity": 1.0})
    assert _is_png(r)
    im = Image.open(io.BytesIO(r.content)).convert("RGBA")
    px = im.getpixel((60, 50))
    assert px[0] > 200


def test_inpaint_with_mask(client, rgb_png_bytes, mask_block_40x40):
    files = {
        "image_file": ("img.png", rgb_png_bytes, "image/png"),
        "mask_file": ("mask.png", mask_block_40x40, "image/png"),
    }
    r = client.post("/api/v1/edit/inpaint", files=files, data={"radius": 3, "method": "telea"})
    assert _is_png(r)
    im = Image.open(io.BytesIO(r.content))
    assert im.size == (200, 150)


def test_adjust_brightness(client, rgb_png_bytes):
    files = {"image_file": ("a.png", rgb_png_bytes, "image/png")}
    r = client.post("/api/v1/edit/adjust", files=files, data={"brightness": 1.8, "contrast": 1.0, "saturation": 1.0})
    assert _is_png(r)
