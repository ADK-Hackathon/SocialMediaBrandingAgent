import { 
    UsersIcon,
    ArrowTrendingUpIcon,
    SparklesIcon,
    DocumentTextIcon,
    PhotoIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline'

import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import type { Base } from '../base';
import { setEnabledField } from '../base';
import type { Dispatch, SetStateAction } from 'react';

interface ToggleableItem {
  name: string;
  icon: React.ElementType | any;
  baseFieldName?: keyof Pick<Base, "trends" | "audiences" | "styles" | "guideline" | "image_prompt" | "video_prompt" | "twitter_post" | "youtube_post" | "tiktok_post" | "instagram_post">;
  isFontAwesome?: boolean;
}

interface ToolBarProps {
  base: Base;
  setBase: Dispatch<SetStateAction<Base>>;
}

const context_blocks: ToggleableItem[] = [
    {
        name: 'Trends',
        icon: ArrowTrendingUpIcon,
        baseFieldName: 'trends'
    },
    {
        name: 'Audiences',
        icon: UsersIcon,
        baseFieldName: 'audiences' 
    },
    {
        name: 'Style',
        icon: SparklesIcon,
        baseFieldName: 'styles'
    },
]

const intermediate_blocks: ToggleableItem[] = [
    {
        name: 'Guideline',
        icon: DocumentTextIcon,
        baseFieldName: 'guideline'
    },
    {
        name: 'Image Prompt',
        icon: PhotoIcon,
        baseFieldName: 'image_prompt'
    },
    {
        name: 'Video Prompt',
        icon: VideoCameraIcon,
        baseFieldName: 'video_prompt'
    },
]

const artifact_blocks: ToggleableItem[] = [
    {
        name: 'X',
        icon: faXTwitter,
        baseFieldName: 'twitter_post',
        isFontAwesome: true 
    },
    {
        name: 'YouTube',
        icon: faYoutube,
        baseFieldName: 'youtube_post',
        isFontAwesome: true
    },
    {
        name: 'TikTok',
        icon: faTiktok,
        baseFieldName: 'tiktok_post',
        isFontAwesome: true
    },
    {
        name: 'Instagram',
        icon: faInstagram,
        baseFieldName: 'instagram_post',
        isFontAwesome: true
    },
]

export default function ToolBar({ base, setBase }: ToolBarProps) {
  const handleToggleClick = (item: ToggleableItem) => {
    if (item.baseFieldName) {
      const fieldKey = item.baseFieldName;
      const currentFieldState = base[fieldKey];
      if (currentFieldState && typeof currentFieldState.enabled === 'boolean') {
        const newBase = setEnabledField(base, fieldKey, !currentFieldState.enabled);
        console.log(newBase);
        setBase(newBase);
      }
    } 
  };

  // Helper function to determine which icon to show
  const getActionIcon = (item: ToggleableItem) => {
    if (item.baseFieldName) {
      const fieldState = base[item.baseFieldName];
      if (fieldState && typeof fieldState.enabled === 'boolean') {
        return fieldState.enabled ? MinusIcon : PlusIcon;
      }
    }
    return PlusIcon; // Default to PlusIcon if not toggleable or state is unclear
  };

  return (
    <div className="flex flex-col space-y-1 p-2">
      {artifact_blocks.map((item) => {
        const ActionIcon = getActionIcon(item);
        return (
          <button 
            key={item.name}
            type="button"
            onClick={() => handleToggleClick(item)}
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700 w-full text-left"
          >
            <span className="flex items-center">
              <FontAwesomeIcon icon={item.icon} className="size-9 flex-shrink-0 text-gray-400 group-hover:text-indigo-500" aria-hidden="true" />
              {item.name}
            </span>
            <ActionIcon className="size-5 text-indigo-600 group-hover:text-indigo-700" aria-hidden="true" />
          </button>
        );
      })}

      <div className="my-2 h-px bg-gray-200" />

      {context_blocks.map((item) => {
        const ActionIcon = getActionIcon(item);
        return (
          <button 
            key={item.name}
            type="button"
            onClick={() => handleToggleClick(item)}
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700 w-full text-left"
          >
            <span className="flex items-center">
              <item.icon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
              />
              {item.name}
            </span>
            <ActionIcon className="size-5 text-indigo-600 group-hover:text-indigo-700" aria-hidden="true" />
          </button>
        );
      })}

      <div className="my-2 h-px bg-gray-200" />

      {intermediate_blocks.map((item) => {
        const ActionIcon = getActionIcon(item);
        return (
          <button 
            key={item.name}
            type="button"
            onClick={() => handleToggleClick(item)}
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700 w-full text-left"
          >
            <span className="flex items-center">
              <item.icon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
              />
              {item.name}
            </span>
            <ActionIcon className="size-5 text-indigo-600 group-hover:text-indigo-700" aria-hidden="true" />
          </button>
        );
      })}

    </div>
  )
}