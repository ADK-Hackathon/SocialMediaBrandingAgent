import json
from google.adk.agents import Agent, SequentialAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.tools.agent_tool import AgentTool
from typing import List, Optional, Dict
from .sub_agents.image_generation import image_generation_agent
from .sub_agents.video_generation import video_generation_agent
from .sub_agents.audio_generation import audio_generation_agent
from .sub_agents.idea_generation import idea_generation_agent
from .twitter_tools import advanced_search, get_trends, get_user_posts
from .video_editing_tools import assemble_video_with_audio
from .schemas import SocialMediaAgentInput, SocialMediaAgentOutput

from . import prompt


# def fetch_latest_news() -> List[str]:
#     """
#     Fetches 10 latest interesting news articles.
#     """
#     return [
#         "Tech industry sees major AI advancements this quarter.",
#         "Global economy shifts towards sustainable energy solutions.",
#         "Social media trends indicate rise of short-form video content.",
#         "Breakthrough in medical research announced.",
#         "Entertainment industry adapts to new streaming paradigms.",
#         "E-commerce reports record sales during holiday season.",
#         "Urban development projects focus on green infrastructure.",
#         "Space exploration efforts unveil new discoveries.",
#         "Digital privacy concerns lead to new regulations.",
#         "Education sector embraces online learning tools."
#     ]


content_agent = Agent(
    name="social_media_branding_content_agent",
    model="gemini-2.5-flash",
    description=prompt.CONTENT_DESCRIPTION,
    instruction=prompt.CONTENT_INSTRUCTIONS,
    # input_schema=SocialMediaAgentInput,
    tools=[
        get_user_posts,
        # fetch_latest_news,
        advanced_search,
        AgentTool(agent=image_generation_agent),
        AgentTool(agent=video_generation_agent),
        # AgentTool(agent=audio_generation_agent),
        AgentTool(agent=idea_generation_agent),
        get_trends,
        # assemble_video_with_audio,
    ],
    output_key="content_agent_output"
)

format_agent = Agent(
    name="format_agent",
    model="gemini-2.5-flash",
    description=prompt.FORMAT_DESCRIPTION,
    instruction=prompt.FORMAT_INSTRUCTIONS,
    # output_schema=SocialMediaAgentOutput,
    output_key="formated_content_agent_output",
)


response_agent = Agent(
    name="response_agent",
    model="gemini-2.5-flash",
    instruction="Extract the `agent_response` from the final json format output from previous agent. Only return the agent_response as plain text.",
)

root_agent = SequentialAgent(
    name="social_media_branding_agent",
    sub_agents=[content_agent, 
                format_agent, 
                response_agent],
    description="Executes a sequence of content generation and formatting.",
)
