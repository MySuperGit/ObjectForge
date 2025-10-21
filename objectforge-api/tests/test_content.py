def test_features_ok(client):
    r = client.get("/api/features")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert all("id" in x and "slug" in x for x in data)


def test_gallery_filter_and_header(client):
    r = client.get("/api/gallery?tag=灵感")
    assert r.status_code == 200
    assert "X-Total-Count" in r.headers
    data = r.json()
    assert isinstance(data, list)


def test_reviews_limit(client):
    r = client.get("/api/reviews?limit=5")
    assert r.status_code == 200
    assert len(r.json()) <= 5


def test_pricing_cache_control(client):
    r = client.get("/api/pricing")
    assert r.status_code == 200
    assert "Cache-Control" in r.headers


def test_i18n(client):
    r = client.get("/api/i18n/zh.json")
    assert r.status_code == 200
    assert isinstance(r.json(), dict)
