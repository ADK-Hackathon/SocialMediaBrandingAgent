from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from typing import List, Optional, Dict
from .sub_agents.image_generation import image_generation_agent
from .twitter_tools import advanced_search, get_trends


def fetch_user_posts(social_media_url: str) -> List[str]:
    """
    Retrieves the latest 5 posts for a given social media account URL.
    """
    return [
        f"Just launched our new product line!",
        f"Had a great time at the industry conference.",
        f"A quick tip for improving productivity.",
        f"Behind the scenes look at our team.",
        f"Engaging with followers on our latest poll."
    ]


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
        "Always aim to complete all these steps to provide a full text and image post."
        "Remember to ask for a social media URL if the user does not provide."
    ),
    tools=[
        fetch_user_posts,
        fetch_latest_news,
        advanced_search,
        AgentTool(agent=image_generation_agent),
        get_trends,
    ],
)
