from google.adk.agents import Agent
from google.adk.tools import google_search
from typing import List, Optional, Dict

# from ...twitter_tools import advanced_search, get_trends, get_user_posts

from . import prompt

idea_generation_agent = Agent(
    name="idea_generation_agent",
    model="gemini-2.0-flash-exp",
    description=prompt.DESCRIPTION,
    instruction=prompt.INSTRUCTIONS,
    output_key="idea_generation_output",
    tools=[google_search],
)
