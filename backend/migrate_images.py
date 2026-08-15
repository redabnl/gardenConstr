"""
One-time migration script: upload all existing local images to Cloudinary
and update MongoDB with the resulting secure URLs.

- Projects: backend/static/images/projects/<title>/ -> project.image_urls
- Services: backend/static/images/services/<gallery_path>/ -> service.image + service.image_urls
- Homepage hardcoded images: frontend/public/img -> printed mapping (for frontend edit)
"""
import os
import sys
import json
import datetime

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)
sys.path.insert(0, BACKEND_DIR)

from dotenv import load_dotenv
load_dotenv(os.path.join(BACKEND_DIR, ".env"))

from models.db import get_db
from models.cloudinary_utils import upload_image

STATIC_IMAGES = os.path.join(BACKEND_DIR, "static", "images")
PROJECTS_STATIC = os.path.join(STATIC_IMAGES, "projects")
SERVICES_STATIC = os.path.join(STATIC_IMAGES, "services")
PUBLIC_IMG = os.path.join(PROJECT_ROOT, "frontend", "public", "img")

IMAGE_EXTS = (".jpg", ".jpeg", ".png", ".gif")


def safe_public_id(name):
    return "".join(c if c.isalnum() or c in "_-" else "_" for c in name)


def safe_folder(name):
    return safe_public_id(name)


def list_images(folder):
    if not os.path.isdir(folder):
        return []
    return sorted(
        f for f in os.listdir(folder)
        if os.path.isfile(os.path.join(folder, f)) and f.lower().endswith(IMAGE_EXTS)
    )


def migrate_projects(db):
    projects = list(db.projects.find({}))
    print(f"\n=== MIGRATING {len(projects)} PROJECTS ===")
    for p in projects:
        title_folder = p["title"].replace(" ", "_")
        folder = os.path.join(PROJECTS_STATIC, title_folder)
        images = list_images(folder)
        if not images:
            print(f"  - {p['title']}: no local folder/images, skipped")
            continue
        urls = []
        for img in images:
            with open(os.path.join(folder, img), "rb") as f:
                url = upload_image(f, f"projects/{safe_folder(title_folder)}", public_id=safe_public_id(os.path.splitext(img)[0]))
            urls.append(url)
        db.projects.update_one({"_id": p["_id"]}, {"$set": {"image_urls": urls}})
        print(f"  - {p['title']}: {len(urls)} images -> cloudinary")


def migrate_services(db):
    services = list(db.services.find({}))
    print(f"\n=== MIGRATING {len(services)} SERVICES ===")
    for s in services:
        gallery_path = s.get("gallery_path", "")
        title_folder = s["title"].replace(" ", "_")
        folder_name = gallery_path.strip("/").split("/")[-1] if gallery_path else ""
        folder = os.path.join(SERVICES_STATIC, folder_name) if folder_name else None

        images = list_images(folder) if folder else []
        if not images:
            print(f"  - {s['title']} ({folder_name or 'no gallery_path'}): no local images, skipped")
            continue
        urls = []
        for img in images:
            with open(os.path.join(folder, img), "rb") as f:
                url = upload_image(f, f"services/{safe_folder(title_folder)}", public_id=safe_public_id(os.path.splitext(img)[0]))
            urls.append(url)
        db.services.update_one({"_id": s["_id"]}, {"$set": {"image": urls[0], "image_urls": urls}})
        print(f"  - {s['title']}: {len(urls)} images -> cloudinary (main: {urls[0][:60]}...)")


def migrate_homepage_images():
    print("\n=== HOMEPAGE HARDCODED IMAGES ===")
    mapping = {}
    targets = [
        ("hero", "hero_1.jpg"),
        ("hero", "hero_2.jpg"),
        ("hero", "hero_3.jpg"),
        ("", "conclusion.png"),
        ("", "outdoor_sketch.jpg"),
        ("", "indoor_sketch.png"),
        ("", "LOGO.JPG"),
        ("", "no_image.jpg"),
    ]
    for sub, name in targets:
        folder = os.path.join(PUBLIC_IMG, sub) if sub else PUBLIC_IMG
        path = os.path.join(folder, name)
        if not os.path.isfile(path):
            print(f"  ! missing {sub}/{name}")
            continue
        with open(path, "rb") as f:
            url = upload_image(f, f"home/{safe_folder(sub) or 'misc'}", public_id=safe_public_id(os.path.splitext(name)[0]))
        mapping[f"/img/{sub}/{name}" if sub else f"/img/{name}"] = url
        print(f"  - /img/{sub}/{name} -> {url[:80]}...")
    return mapping


if __name__ == "__main__":
    db = get_db()
    migrate_projects(db)
    migrate_services(db)
    homepage = migrate_homepage_images()

    out_path = os.path.join(BACKEND_DIR, "homepage_image_map.json")
    with open(out_path, "w") as f:
        json.dump(homepage, f, indent=2)
    print(f"\nHomepage mapping saved to {out_path}")
    print("DONE")