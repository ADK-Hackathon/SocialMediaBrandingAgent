import os
import datetime
import time

from dotenv import load_dotenv
from google.adk import Agent
from google.adk.tools import ToolContext
from google.cloud import storage
from google.genai import Client
from google.genai.types import GenerateVideosConfig, Image
from agents.utils.gcs_url_converters import gcs_uri_to_public_url, public_url_to_gcs_uri

from . import prompt
load_dotenv()

client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1"),
)

# Initialize Google Cloud Storage client
storage_client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
GCS_BUCKET_NAME = "smba-assets"  # Public to internet


def generate_video(video_prompt: str, tool_context: "ToolContext"):
    """
    Generates a video based on an image and post text context.

    Args:
        video_prompt (str): The prompt for video generation.
        image_gcs_uri (str): The GCS public URL of the image to be used in the video.

    Returns:
        dict: A dictionary containing the status, detail, and video URL if successful.
    """

    # Use below static return to save the cost while testing
    # return {
    #     "status": "success",
    #     "detail": "Video generated and uploaded to GCS",
    #     "video_url": "https://storage.cloud.google.com/smba-assets/videos/8905612651172803034/sample_0.mp4",
    # }

    output_gcs_uri = f"gs://{GCS_BUCKET_NAME}/videos"

    try:
        operation = client.models.generate_videos(
            # model="veo-3.0-generate-preview",  # hope we can use this asap
            model="veo-2.0-generate-001",
            prompt=video_prompt,
            # image=Image(
            #     gcs_uri=public_url_to_gcs_uri(image_gcs_uri),
            #     mime_type="image/png",
            # ),
            config=GenerateVideosConfig(
                aspect_ratio="16:9",
                output_gcs_uri=output_gcs_uri,
            ),
        )

        # Poll the operation status until done
        print("DEBUG: Video generation started. Polling for completion...")
        while not operation.done:
            time.sleep(15)
            operation = client.operations.get(operation)
            print(f"DEBUG: operation: {operation}")

        if operation.response:
            print(f"DEBUG: operation.result: {operation.result}")

            generated_video_uri = operation.result.generated_videos[0].video.uri
            print(f"DEBUG: Generated video URI: {generated_video_uri}")
            return {
                "status": "success",
                "detail": "Video generated and uploaded to GCS",
                "video_url": gcs_uri_to_public_url(generated_video_uri),
            }
        else:
            return {
                "status": "failed",
                "detail": f"Video generation failed: {operation}",
            }
    except Exception as e:
        print(f"DEBUG: Video generation failed: {e}")
        return {"status": "failed", "detail": f"Video generation failed: {e}"}


video_generation_agent = Agent(
    name="video_generation_agent",
    model="gemini-2.0-flash",
    description=prompt.DESCRIPTION,
    instruction=prompt.INSTRUCTIONS,
    output_key="video_generation_output",
    tools=[generate_video],
)
