import InstagramPostBlock from "./blocks/instagram_post_block";
import TikTokPostBlock from "./blocks/tiktok_post_block";
import TwitterPostBlock from "./blocks/twitter_post_block";
import YouTubePostBlock from "./blocks/youtube_post_block";
import type { Base } from "../base";

interface ArtifactBlocksProps {
  base: Base;
}

export default function ArtifactBlocks({ base }: ArtifactBlocksProps) {
  return (
    <>
      {base.twitter_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <TwitterPostBlock
            contentText={base.twitter_post.value}
            username="cool_dev"
            profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
          />
        </li>
      )}
      {base.youtube_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <YouTubePostBlock
            videoUrl={base.youtube_post.value.video_url}
            thumbnailUrl="https://randomuser.me/api/portraits/men/32.jpg"
            videoTitle="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
            channelName="cool_dev"
          />
        </li>
      )}
      {base.tiktok_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <TikTokPostBlock 
            videoUrl={base.tiktok_post.value.video_url}
            profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
          />
        </li>
      )}
      {base.instagram_post.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <InstagramPostBlock
            mediaUrl={base.instagram_post.value.video_url}
            contentText="Exciting times for AI! Also, new discoveries in space exploration! #AI #SpaceExploration #Innovation"
            username="cool_dev"
            profilePicUrl="https://randomuser.me/api/portraits/men/32.jpg"
          />
        </li>
      )}
    </>
  );
}
