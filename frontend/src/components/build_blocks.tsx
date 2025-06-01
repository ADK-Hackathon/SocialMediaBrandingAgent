import GoalBlock from "./blocks/goal_block";
import AudienceBlock from "./blocks/audience_block";
import GuidelineBlock from "./blocks/guideline_block";

export default function BuildBlocks() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">
        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Context</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <GoalBlock />
        </li>
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <AudienceBlock />
        </li>
        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Intermediate</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <GuidelineBlock />
        </li>
        <li className="col-span-full">
            <h2 className="text-lg font-semibold text-gray-900">Artifacts</h2>
            <div className="mt-2 h-px bg-gray-200" />
        </li>
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <AudienceBlock />
        </li>
    </ul>
  )
}