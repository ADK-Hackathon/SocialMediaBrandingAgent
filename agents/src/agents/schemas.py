from typing import Generic, List, TypeVar
from pydantic import BaseModel, Field, HttpUrl

T = TypeVar("T")


class EnabledField(BaseModel, Generic[T]):
    """A value that can be toggled on/off."""
    value: T
    enabled: bool = Field(default=True, description="Whether the field is enabled. If disabled, the value will be ignored.")


class AudienceGroup(BaseModel):
    name: str = Field(description="The name of the audience group. For example, 'Teens (13-17)'")
    targeted: bool = Field(default=False, description="Whether the audience group is targeted. If targeted, we want the generated content to be tailored to this audience group.")


class Trend(BaseModel):
    selected_trend: str = Field(description="The selected trend. For example, 'AI'")
    trending: List[str] = Field(description="The trending topics. For example, ['AI', 'Wine & Fruits Fair', 'WWDC2025']")


class Style(BaseModel):
    name: str = Field(description="The name of the style. For example, 'Vintage / Retro'")
    selected: bool = Field(default=False, description="Whether the style is selected. If selected, we want the generated content to be in this style.")


class VideoPost(BaseModel):
    video_url: HttpUrl = Field(description="The URL of the video post. Get this URL from the video generation tool.")


class Base(BaseModel):
    # ── 1. Goal ────────────────────────────────────────────
    goal: str = Field(description="The goal of the content. For example, 'Promote a new SaaS product.'")

    # ── 2. Context ────────────────────────────────────────
    trends: EnabledField[Trend]
    audiences: EnabledField[List[AudienceGroup]]
    styles: EnabledField[List[Style]]

    # ── 3. Intermediate artifacts ─────────────────────────
    guideline: EnabledField[str]
    image_prompt: EnabledField[str]
    video_prompt: EnabledField[str]

    # ── 4. Final artifacts ────────────────────────────────
    twitter_post: EnabledField[str]
    youtube_post: EnabledField[VideoPost]
    tiktok_post: EnabledField[VideoPost]
    instagram_post: EnabledField[VideoPost]

    model_config = {
        "populate_by_name": True,          # allows alias use if you add them later
        "frozen": False,                   # set True if you need immutability
        "extra": "forbid",                 # no undeclared fields
    }

class SocialMediaAgentInput(BaseModel):
    user_query: str = Field(description="The user's query. The user may ask you to modify the content of the base. Or they may ask you generate the social media post content.")
    base: Base = Field(description="The base of the content. This is the content that you will be modifying or generating.")


class SocialMediaAgentOutput(BaseModel):
    agent_response: str = Field(description="This will be the response to the user's query.")
    is_updated: bool = Field(description="Whether the base is updated. If nothing was changed, this will be False.")
    updated_base: Base = Field(description="The base of the content. This is the content that you will be modifying or generating.")