import os
import datetime
import time

from dotenv import load_dotenv
from google.adk import Agent
from google.adk.tools import ToolContext
from google.cloud import storage
from google.genai import Client
from google.genai.types import GenerateVideosConfig, Image

load_dotenv()

client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)

# Initialize Google Cloud Storage client
storage_client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
GCS_BUCKET_NAME = "smba-assets" # Public to internet


def generate_video(video_prompt: str, image_gcs_uri: str, tool_context: "ToolContext"):
    """Generates a video based on an image and post text context."""

    output_gcs_uri = f"gs://{GCS_BUCKET_NAME}/videos"

    try:
        operation = client.models.generate_videos(
            # model="veo-3.0-generate-preview",
            model="veo-2.0-generate-001",
            prompt=video_prompt,
            # image=Image(
            #     gcs_uri=image_gcs_uri,
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

            # Convert gs:// URI to public HTTP URL
            public_video_url = generated_video_uri.replace("gs://", "https://storage.googleapis.com/")

            return {
                "status": "success",
                "detail": "Video generated and uploaded to GCS",
                "video_url": public_video_url,
            }
        else:
            return {
                "status": "failed",
                "detail": f"Video generation failed: {operation}",
            }
    except Exception as e:
        return {"status": "failed", "detail": f"Video generation failed: {e}"}


video_generation_agent = Agent(
    name="video_generation_agent",
    model="gemini-2.0-flash",
    description="An agent that generates short videos from an image, guided by text context.",
    instruction=(
        "You are an expert video generation agent. Your primary task is to take the provided "
        "social media post text for context, and an existing image, then formulate a detailed "
        "and effective 'video prompt' based on the text for an video generation model. "
        "**Crucially, always aim to generate photo-realistic, high-quality video, as if captured by a professional videographer. "
        "Do not include text in the generated video. Focus on visual concepts.** "
        "Once you have the prompt, you must use the prompt with existing image url "
        "and pass them to the `generate_video` tool to create and upload the video. "
    ),
    output_key="video_generation_output",
    tools=[generate_video],
)
