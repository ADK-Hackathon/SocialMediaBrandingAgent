import GoalBlock from "./blocks/goal_block";
import AudienceBlock from "./blocks/audience_block";
import GuidelineBlock from "./blocks/guideline_block";
import TrendsBlock from "./blocks/trends_block";
import StylesBlock from "./blocks/styles_block";
import ImagePromptBlock from "./blocks/image_prompt_block";
import VideoPromptBlock from "./blocks/video_prompt_block";
import type { Base } from "../base";
import type { Dispatch, SetStateAction } from 'react';

interface ContextBlocksProps {
  base: Base;
  setBase: Dispatch<SetStateAction<Base>>;
}

export default function ContextBlocks({ base, setBase }: ContextBlocksProps) {
  return (
    <>
      <li className="overflow-hidden rounded-xl border border-gray-200">
        <GoalBlock base={base} setBase={setBase} />
      </li>
      {base.audiences.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <AudienceBlock base={base} setBase={setBase} />
        </li>
      )}
      {base.trends.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <TrendsBlock base={base} setBase={setBase} />
        </li>
      )}
      {base.styles.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <StylesBlock />
        </li>
      )}

      {(base.guideline.enabled || base.image_prompt.enabled || base.video_prompt.enabled) && (
        <li className="col-span-full">
          <h2 className="text-lg font-semibold text-gray-900">Intermediate</h2>
          <div className="mt-2 h-px bg-gray-200" />
        </li>
      )}
      {base.guideline.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <GuidelineBlock prompt={base.guideline.value} />
        </li>
      )}
      {base.image_prompt.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <ImagePromptBlock prompt={base.image_prompt.value} />
        </li>
      )}
      {base.video_prompt.enabled && (
        <li className="overflow-hidden rounded-xl border border-gray-200">
          <VideoPromptBlock prompt={base.video_prompt.value} />
        </li>
      )}
    </>
  );
}
