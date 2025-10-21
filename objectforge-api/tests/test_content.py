def test_features_ok(client):
<<<<<<< HEAD
    r = client.get("/features")
=======
    r = client.get("/api/features")
>>>>>>> pr-local-swagger
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert all("id" in x and "slug" in x for x in data)


def test_gallery_filter_and_header(client):
<<<<<<< HEAD
    r = client.get("/gallery?tag=灵感")
=======
    r = client.get("/api/gallery?tag=灵感")
>>>>>>> pr-local-swagger
    assert r.status_code == 200
    assert "X-Total-Count" in r.headers
    data = r.json()
    assert isinstance(data, list)


def test_reviews_limit(client):
<<<<<<< HEAD
    r = client.get("/reviews?limit=5")
=======
    r = client.get("/api/reviews?limit=5")
>>>>>>> pr-local-swagger
    assert r.status_code == 200
    assert len(r.json()) <= 5


def test_pricing_cache_control(client):
<<<<<<< HEAD
    r = client.get("/pricing")
=======
    r = client.get("/api/pricing")
>>>>>>> pr-local-swagger
    assert r.status_code == 200
    assert "Cache-Control" in r.headers


def test_i18n(client):
<<<<<<< HEAD
    r = client.get("/i18n/zh.json")
=======
    r = client.get("/api/i18n/zh.json")
>>>>>>> pr-local-swagger
    assert r.status_code == 200
    assert isinstance(r.json(), dict)
