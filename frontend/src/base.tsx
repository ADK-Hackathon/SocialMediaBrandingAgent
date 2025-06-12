export interface EnabledField<T> {
  value: T;
  enabled: boolean;
}

export interface AudienceGroup {
  name: string;
  targeted: boolean;
}

export interface Trend {
    selected_trend: string;
    trending: string[];
}

export interface Style {
    name: string;
    selected: boolean;
}

export interface VideoPost {
    video_url: string;
}

// Base interface
export interface Base {
    goal: string;

    // Context
    trends: EnabledField<Trend[]>;
    audiences: EnabledField<AudienceGroup[]>;
    styles: EnabledField<Style[]>;

    // Intermediate
    guideline: EnabledField<string>;
    image_prompt: EnabledField<string>;
    video_prompt: EnabledField<string>;

    // Artifacts
    twitter_post: EnabledField<string>;
    youtube_post: EnabledField<VideoPost>;
    tiktok_post: EnabledField<VideoPost>;
    instagram_post: EnabledField<VideoPost>;
}

// Helper method to set if the field is enabled.
export function setEnabledField(
    base: Base, 
    fieldName: keyof Pick<Base, "trends" | "audiences" | "styles" | "guideline" | "image_prompt" | "video_prompt" | "twitter_post" | "youtube_post" | "tiktok_post" | "instagram_post">,
    enabled: boolean): Base {
    const newBase = {...base};
    switch (fieldName) {
        case "trends":
            newBase.trends.enabled = enabled;
            break;
        case "styles":
            newBase.styles.enabled = enabled;
            break;
        case "audiences":
            newBase.audiences.enabled = enabled;
            break;
        case "guideline":
            newBase.guideline.enabled = enabled;
            break;
        case "image_prompt":
            newBase.image_prompt.enabled = enabled;
            break;
        case "video_prompt":
            newBase.video_prompt.enabled = enabled;
            break;
        case "twitter_post":
            newBase.twitter_post.enabled = enabled;
            break;
        case "youtube_post":
            newBase.youtube_post.enabled = enabled;
            break;
        case "tiktok_post":
            newBase.tiktok_post.enabled = enabled;
            break;
        case "instagram_post":
            newBase.instagram_post.enabled = enabled;
            break;
        default:
            throw new Error(`Invalid field name: ${fieldName}`);
    }
    return newBase;
}

// // Diff type
// export type Diff = 
// | {fieldName: "goal"; newGoal: string}
// | {fieldName: "audiences"; newAudience: AudienceGroup[]}
// | {fieldName: "guideline"; newGuideline: string}
// | {fieldName: "twitter_post"; newTwitterPost: string}
// | {fieldName: "video_url"; newVideoUrl: string}

export interface SocialMediaAgentInput {
    user_query: string;
    base: Base;
}

export interface SocialMediaAgentOutput {
    agent_response: string;
    is_updated: boolean;
    updated_base: Base;
}