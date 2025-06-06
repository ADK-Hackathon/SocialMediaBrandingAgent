def gcs_uri_to_public_url(gcs_uri: str) -> str | None:
    """
    Converts a Google Cloud Storage URI (gs://bucket/object) to a public HTTP URL.
    If the input is already a public URL, it returns the input as is.
    """
    if gcs_uri.startswith("https://storage.googleapis.com/"):
        return gcs_uri
    elif gcs_uri.startswith("gs://"):
        return gcs_uri.replace("gs://", "https://storage.googleapis.com/", 1)
    else:
        return None


def public_url_to_gcs_uri(public_url: str) -> str | None:
    """
    Converts a public Google Cloud Storage HTTP URL to a GCS URI (gs://bucket/object).
    If the input is already a GCS URI, it returns the input as is.
    """
    if public_url.startswith("gs://"):
        return public_url
    elif public_url.startswith("https://storage.googleapis.com/"):
        return public_url.replace("https://storage.googleapis.com/", "gs://", 1)
    else:
        return None
    
def get_blob_name_from_gcs_uri(gcs_uri: str) -> str | None:
    """
    Extracts the blob name from a GCS URI (gs://bucket/object).
    Returns None if the input is not a valid GCS URI.
    """
    if gcs_uri.startswith("gs://"):
        parts = gcs_uri[5:].split("/", 1)
        if len(parts) == 2:
            return parts[1]
    return None
