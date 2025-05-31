from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from typing import List, Optional, Dict
from .sub_agents.image_generation import image_generation_agent
from .sub_agents.video_generation import video_generation_agent
from .sub_agents.audio_generation import audio_generation_agent
from .twitter_tools import advanced_search, get_trends, get_user_posts

def fetch_latest_news() -> List[str]:
    """
    Fetches 10 latest interesting news articles.
    """
    return [
        "Tech industry sees major AI advancements this quarter.",
        "Global economy shifts towards sustainable energy solutions.",
        "Social media trends indicate rise of short-form video content.",
        "Breakthrough in medical research announced.",
        "Entertainment industry adapts to new streaming paradigms.",
        "E-commerce reports record sales during holiday season.",
        "Urban development projects focus on green infrastructure.",
        "Space exploration efforts unveil new discoveries.",
        "Digital privacy concerns lead to new regulations.",
        "Education sector embraces online learning tools."
    ]


root_agent = Agent(
    name="social_media_branding_agent",
    model="gemini-2.0-flash",
    description=(
        "An AI agent that generates media for social media posts across platforms."
    ),
    instruction=(
        "You are an expert Social Media Branding Agent focused on creating engaging posts quickly. "
        "When asked to create a post, you must: "
        "1. Fetch recent user posts (if a social media URL is provided). "
        "2. Fetch the latest interesting news. "
        "3. Based on the fetched user posts (to understand their style/tone) and the latest news (for relevant topics), "
        "generate compelling and concise text for a new social media post. Prioritize engaging and trending topics from the news. "
        "4. Pass this generated post text to the image generation agent to create a suitable image. "
        "5. Pass both the generated post text AND the generated image URL to the video generation agent to create a suitable video. "
        "6. Ask the user to describe what they want to mention and narrate in the post. Then delegate to `audio_generation_agent` to generate the narration text and audio. "
        "Always aim to complete all these steps to provide a full text and image/video post."
        "Remember to ask for a social media URL if the user does not provide."
    ),
    tools=[
        get_user_posts,
        fetch_latest_news,
        advanced_search,
        AgentTool(agent=image_generation_agent),
        AgentTool(agent=video_generation_agent),
        get_trends,
    ],
    sub_agents=[audio_generation_agent,],
)
