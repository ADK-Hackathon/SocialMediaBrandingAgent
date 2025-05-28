import os
import datetime

from dotenv import load_dotenv
from google.adk import Agent
from google.adk.tools import ToolContext, load_artifacts
from google.genai import Client, types


load_dotenv()

# Only Vertex AI supports image generation for now.
client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)


def generate_image(img_prompt: str, tool_context: "ToolContext"):
    """Generates an image based on the prompt."""
    response = client.models.generate_images(
        model="imagen-3.0-generate-002",
        prompt=img_prompt,
        config={"number_of_images": 1},
    )
    if not response.generated_images:
        return {"status": "failed"}

    image_bytes = response.generated_images[0].image.image_bytes


    # TODO(syu 5/27/2025): Maybe save to GCP Cloud Storage
    output_directory = "generated_images"
    os.makedirs(output_directory, exist_ok=True) # Create the directory if it doesn't exist

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    image_filename = f"image_{timestamp}.png" # e.g., image_20250527_223042.png
    output_path = os.path.join(output_directory, image_filename)

    try:
        with open(output_path, "wb") as f:
            f.write(image_bytes)
        return {
            "status": "success",
            "detail": f"Image generated and saved to {output_path}",
            "filename": image_filename,
            "path": output_path,
        }
    except IOError as e:
        return {"status": "failed", "detail": f"Failed to save image: {e}"}


image_generation_agent = Agent(
    name="image_generation_agent",
    model="gemini-2.0-flash",
    description="An agent that generates images and answers questions about the images.",
    instruction="You are an agent whose job is to generate an image based on prompt provided",
    output_key="image_generation_output",
    tools=[generate_image, load_artifacts],
)
