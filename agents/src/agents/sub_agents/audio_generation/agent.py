from google.adk.agents import Agent


def generate_audio(narration_text: str) -> str:
    """Generates an audio narration based on the provided text."""
    # Placeholder for actual audio generation logic
    # In a real implementation, this would call an audio generation API or library
    return f"This is the path to the audio narration for: {narration_text}"


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
