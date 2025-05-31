from google.adk.agents import Agent
import google.cloud.texttospeech as tts
from typing import Sequence


def unique_languages_from_voices(voices: Sequence[tts.Voice]):
    language_set = set()
    for voice in voices:
        for language_code in voice.language_codes:
            language_set.add(language_code)
    return language_set


def list_languages():
    client = tts.TextToSpeechClient()
    response = client.list_voices()
    languages = unique_languages_from_voices(response.voices)

    print(f" Languages: {len(languages)} ".center(60, "-"))
    for i, language in enumerate(sorted(languages)):
        print(f"{language:>10}", end="\n" if i % 5 == 4 else "")


def list_voices(language_code=None):
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


def text_to_wav(voice_name: str, text: str) -> str:
    """Generates a WAV file from the provided text using the specified voice."""
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

    filename = f"generated_audio/narration-audio.wav"
    with open(filename, "wb") as out:
        out.write(response.audio_content)
        print(f'Generated speech saved to "{filename}"')
    return filename


def generate_audio(narration_text: str) -> str:
    """Generates an audio narration based on the provided text."""
    # Placeholder for actual audio generation logic
    # In a real implementation, this would call an audio generation API or library
    return text_to_wav("en-US-Chirp3-HD-Erinome", narration_text)


audio_generation_agent = Agent(
    name="audio_generation_agent",
    model="gemini-2.0-flash",
    description="An agent that generates audio narrations.",
    instruction=(
        "You are an expert audio narration generation agent. Your primary task "
        "is to generate the narration text based on the user's requirement. Once "
        "your have the narration text, you must use the `generate_audio` tool to "
        "generate the audio narration. "
    ),
    output_key="audio_generation_output",
    tools=[generate_audio,],
)

if __name__ == "__main__":
    # This is for testing pruposes only.
    # list_languages()
    # list_voices("en-US")
    text_to_wav("en-US-Chirp3-HD-Erinome",
                "Looking for a new strategic challenge?")
