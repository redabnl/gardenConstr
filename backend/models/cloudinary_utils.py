import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


def _safe_segment(name):
    return "".join(c if c.isalnum() or c in "_-" else "_" for c in name)


def upload_image(file, folder, public_id=None, tags=None):
    """
    Upload a file object to Cloudinary and return its secure URL.
    """
    try:
        folder = "/".join(_safe_segment(seg) for seg in folder.split("/"))
        options = {"folder": folder, "resource_type": "image", "overwrite": True}
        if public_id:
            options["public_id"] = _safe_segment(public_id)
        if tags:
            options["tags"] = tags
        result = cloudinary.uploader.upload(file, **options)
        return result.get("secure_url")
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        raise


def delete_image(url_or_public_id):
    """
    Delete an image from Cloudinary by its public_id or full URL.
    Returns True on success.
    """
    try:
        public_id = url_or_public_id
        if url_or_public_id.startswith("http"):
            # Extract the public id from a secure URL, e.g.
            # https://res.cloudinary.com/<cloud>/image/upload/v1234/folder/name.jpg
            parts = url_or_public_id.split("/image/upload/")
            if len(parts) == 2:
                path = parts[1]
                # Strip the version segment (v1234) if present
                segments = path.split("/")
                if segments and segments[0].startswith("v") and segments[0][1:].isdigit():
                    segments = segments[1:]
                public_id = "/".join(segments).rsplit(".", 1)[0]
        result = cloudinary.uploader.destroy(public_id)
        return result.get("result") == "ok"
    except Exception as e:
        print(f"Cloudinary delete error: {e}")
        return False