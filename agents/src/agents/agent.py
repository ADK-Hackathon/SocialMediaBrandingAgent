from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from typing import List, Optional, Dict
from .sub_agents.image_generation import image_generation_agent
from .sub_agents.video_generation import video_generation_agent
from .sub_agents.audio_generation import audio_generation_agent
from .sub_agents.idea_generation import idea_generation_agent
from .twitter_tools import advanced_search, get_trends, get_user_posts
from .video_editing_tools import assemble_video_with_audio


from . import prompt


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
    description=prompt.DESCRIPTION,
    instruction=prompt.INSTRUCTIONS,
    tools=[
        get_user_posts,
        fetch_latest_news,
        advanced_search,
        AgentTool(agent=image_generation_agent),
        AgentTool(agent=video_generation_agent),
        AgentTool(agent=audio_generation_agent),
        AgentTool(agent=idea_generation_agent),
        get_trends,
        assemble_video_with_audio,
    ]
)
