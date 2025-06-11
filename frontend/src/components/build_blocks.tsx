import GoalBlock from "./blocks/goal_block";
import AudienceBlock from "./blocks/audience_block";
import GuidelineBlock from "./blocks/guideline_block";
import InstagramPostBlock from "./blocks/instagram_post_block";
import TikTokPostBlock from "./blocks/tiktok_post_block";
import TwitterPostBlock from "./blocks/twitter_post_block";
import YouTubePostBlock from "./blocks/youtube_post_block";
import type { Base } from "../base";
import TrendsBlock from "./blocks/trends_block";
import StylesBlock from "./blocks/styles_block";
import ImagePromptBlock from "./blocks/image_prompt_block";
import VideoPromptBlock from "./blocks/video_prompt_block";

interface BuildBlocksProps {
  base: Base;
}

export default function BuildBlocks({ base }: BuildBlocksProps) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">
        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Artifacts</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>
        { base.twitter_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <TwitterPostBlock
                mediaUrl="https://storage.cloud.google.com/smba-assets/videos/8905612651172803034/sample_0.mp4"
                contentText="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
                username="cool_dev"
                profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
            />
        </li>)}
        { base.youtube_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <YouTubePostBlock
                videoUrl="https://storage.cloud.google.com/smba-assets/videos/8905612651172803034/sample_0.mp4"
                thumbnailUrl="https://randomuser.me/api/portraits/men/32.jpg"
                videoTitle="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
                channelName="cool_dev"
            />
        </li>)}
        { base.tiktok_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <TikTokPostBlock 
                videoUrl={base.tiktok_post.value.video_url}
                contentText="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
                username="cool_dev"
                profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
            />
        </li>)}
        { base.instagram_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <InstagramPostBlock
                mediaUrl="https://storage.cloud.google.com/smba-assets/videos/8905612651172803034/sample_0.mp4"
                contentText="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
                username="cool_dev"
                profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
            />
        </li>)}

        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Context</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <GoalBlock />
        </li>
        {base.audiences.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <AudienceBlock />
          </li>
        )}
        {base.trends.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <TrendsBlock />
          </li>
        )}
        {base.styles.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <StylesBlock />
          </li>
        )}

        { (base.guideline.enabled || base.image_prompt.enabled || base.video_prompt.enabled) && (
        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Intermediate</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>)}
        { base.guideline.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <GuidelineBlock />
          </li>
        )}
        { base.image_prompt.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <ImagePromptBlock />
          </li>
        )}
        { base.video_prompt.enabled && (
          <li className="overflow-hidden rounded-xl border border-gray-200">
              <VideoPromptBlock />
          </li>
        )}
    </ul>
  )
}