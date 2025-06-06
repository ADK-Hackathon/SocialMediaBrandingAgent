import os
import datetime

from dotenv import load_dotenv
from google.adk import Agent
from google.adk.tools import ToolContext
from google.cloud import storage
from google.genai import Client, types


load_dotenv()

# Only Vertex AI supports image generation for now.
client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)

# Initialize Google Cloud Storage client
storage_client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
# TODO(syu 5/28/2025): handle ACL later
GCS_BUCKET_NAME = "smba-assets"  # Public to internet


def generate_image(img_prompt: str, tool_context: "ToolContext"):
    """
    Generates an image based on the prompt.

    Args:
        img_prompt (str): The prompt for image generation.

    Returns:
        dict: A dictionary containing the status, detail, and image URL if successful.
    """

    # Use below static return to save the cost while testing
    # return {
    #     "status": "success",
    #     "detail": "Image generated and uploaded to GCS",
    #     "image_url": "https://storage.googleapis.com/smba-assets/images/20250531_180420.png",
    # }

    response = client.models.generate_images(
        model="imagen-3.0-generate-002",
        prompt=img_prompt,
        config={"number_of_images": 1},
    )
    if not response.generated_images:
        return {"status": "failed"}

    image_bytes = response.generated_images[0].image.image_bytes

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    gcs_object_name = f"images/{timestamp}.png"

    try:
        bucket = storage_client.bucket(GCS_BUCKET_NAME)

        blob = bucket.blob(gcs_object_name)
        blob.upload_from_string(image_bytes, content_type="image/png")

        return {
            "status": "success",
            "detail": "Image generated and uploaded to GCS",
            "image_url": blob.public_url,
        }
    except IOError as e:
        return {"status": "failed", "detail": f"Failed to upload image to GCS: {e}"}


image_generation_agent = Agent(
    name="image_generation_agent",
    model="gemini-2.0-flash",
    description="An agent that generates images based on the social media post. Expect 1 input which is the social mdetia post text.",
    instruction=(
        "You are an expert image generation agent. Your primary task is: "
        "1. Take the provided social media post text, interpret its core theme, and then formulate a detailed "
        "and effective prompt for an image generation model. "
        "**Crucially, always aim to generate photo-realistic, high-quality images, as if captured by a professional photographer. "
        "Do not include text in the generated image. Focus on visual concepts.** "
        "2. Once you have the prompt, you must use the `generate_image` tool to create the image and upload it to GCS. "
        "3. Return the output of the `generate_image` tool as is. Do not modify the output. Do not add anything else."
    ),
    output_key="image_generation_output",
    tools=[generate_image],
)
