import datetime
import os
from dotenv import load_dotenv
from google.adk.agents import Agent
import google.cloud.texttospeech as tts
from typing import Sequence
from google.cloud import storage
from google.genai import Client

from . import prompt
load_dotenv()

# Only Vertex AI supports image generation for now.
client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)

# Initialize Google Cloud Storage client
storage_client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
GCS_BUCKET_NAME = "smba-assets"  # Public to internet


def unique_languages_from_voices(voices: Sequence[tts.Voice]):
    """List all supported languages from Google TTS."""
    language_set = set()
    for voice in voices:
        for language_code in voice.language_codes:
            language_set.add(language_code)
    return language_set


def list_languages():
    """Print all langauges supported by Google TTS."""
    client = tts.TextToSpeechClient()
    response = client.list_voices()
    languages = unique_languages_from_voices(response.voices)

    print(f" Languages: {len(languages)} ".center(60, "-"))
    for i, language in enumerate(sorted(languages)):
        print(f"{language:>10}", end="\n" if i % 5 == 4 else "")


def list_voices(language_code=None):
    """Print all voices supported by Google TTS for a given language code."""
    client = tts.TextToSpeechClient()
    response = client.list_voices(language_code=language_code)
    voices = sorted(response.voices, key=lambda voice: voice.name)

    print(f" Voices: {len(voices)} ".center(60, "-"))
    for voice in voices:
        languages = ", ".join(voice.language_codes)
        name = voice.name
        gender = tts.SsmlVoiceGender(voice.ssml_gender).name
        rate = voice.natural_sample_rate_hertz
        print(f"{languages:<8} | {name:<24} | {gender:<8} | {rate:,} Hz")


def text_to_wav(voice_name: str, text: str) -> bytes:
    """Generates a WAV file bytes from the provided text using the specified voice."""
    language_code = "-".join(voice_name.split("-")[:2])
    text_input = tts.SynthesisInput(text=text)
    voice_params = tts.VoiceSelectionParams(
        language_code=language_code, name=voice_name
    )
    audio_config = tts.AudioConfig(audio_encoding=tts.AudioEncoding.LINEAR16)

    client = tts.TextToSpeechClient()
    response = client.synthesize_speech(
        input=text_input,
        voice=voice_params,
        audio_config=audio_config,
    )
    return response.audio_content


def generate_audio(narration_text: str):
    """
    Generates an narration audio of the provided text.

    Args:
        narration_text (str): The text to be narrated.

    Returns:
        dict: A dictionary containing the status, detail, and audio GCS public URL if successful.
    """
    audio_bytes: bytes = text_to_wav("en-US-Chirp3-HD-Erinome", narration_text)

    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    gcs_object_name = f"audios/{timestamp}.wav"

    try:
        bucket = storage_client.bucket(GCS_BUCKET_NAME)

        blob = bucket.blob(gcs_object_name)
        blob.upload_from_string(audio_bytes, content_type="audio/wav")

        return {
            "status": "success",
            "detail": "Audio generated and uploaded to GCS",
            "audio_url": blob.public_url,
        }
    except IOError as e:
        return {"status": "failed", "detail": f"Failed to upload audio to GCS: {e}"}


audio_generation_agent = Agent(
    name="audio_generation_agent",
    model="gemini-2.0-flash",
    description=prompt.DESCRIPTION,
    instruction=prompt.INSTRUCTIONS,
    output_key="audio_generation_output",
    tools=[generate_audio,],
)

if __name__ == "__main__":
    # This is for testing pruposes only.
    # list_languages()
    # list_voices("en-US")
    text_to_wav("en-US-Chirp3-HD-Erinome",
                "Looking for a new strategic challenge?")
