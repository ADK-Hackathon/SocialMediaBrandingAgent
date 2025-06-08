export interface EnabledField<T> {
  value: T;
  enabled: boolean;
}

export interface AudienceGroup {
  name: string;
  targeted: boolean;
}

// Diff type
export type Diff = 
| {fieldName: "goal"; newGoal: string}
| {fieldName: "audiences"; newAudience: AudienceGroup[]}
| {fieldName: "guideline"; newGuideline: string}
| {fieldName: "twitter_post"; newTwitterPost: string}
| {fieldName: "video_url"; newVideoUrl: string}

// Base interface
export interface Base {
    goal: string;
    audiences: EnabledField<AudienceGroup[]>;
    guideline: EnabledField<string>;
    twitter_post: EnabledField<string>;
    video_url: string;
}

// Helper method to set if the field is enabled.
export function setEnabledField(
    base: Base, 
    fieldName: keyof Pick<Base, "audiences" | "guideline" | "twitter_post">,
    enabled: boolean): Base {
    const newBase = {...base};
    switch (fieldName) {
        case "audiences":
            newBase.audiences.enabled = enabled;
            break;
        case "guideline":
            newBase.guideline.enabled = enabled;
            break;
        case "twitter_post":
            newBase.twitter_post.enabled = enabled;
            break;
        default:
            throw new Error(`Invalid field name: ${fieldName}`);
    }
    return newBase;
}
