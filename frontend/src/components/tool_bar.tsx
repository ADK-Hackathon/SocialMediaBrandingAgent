import { 
    UsersIcon,
    ArrowTrendingUpIcon,
    SparklesIcon,
    DocumentTextIcon,
    PhotoIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline'

import { PlusIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'

const context_blocks = [
    {
        name: 'Trends',
        icon: ArrowTrendingUpIcon,
        href: '#',
    },
    {
        name: 'Audiences',
        icon: UsersIcon,
        href: '#',
    },
    {
        name: 'Style',
        icon: SparklesIcon,
        href: '#',
    },
]

const intermediate_blocks = [
    {
        name: 'Guideline',
        icon: DocumentTextIcon,
        href: '#',
    },
    {
        name: 'Image Prompt',
        icon: PhotoIcon,
        href: '#',
    },
    {
        name: 'Video Prompt',
        icon: VideoCameraIcon,
        href: '#',
    },
]

const artifact_blocks = [
    {
        name: 'Twitter',
        icon: faTwitter,
        href: '#',
    },
    {
        name: 'YouTube',
        icon: faYoutube,
        href: '#',
    },
    {
        name: 'TikTok',
        icon: faTiktok,
        href: '#',
    },
    {
        name: 'Instagram',
        icon: faInstagram,
        href: '#',
    },
]

export default function ToolBar() {
  return (
    <nav className="flex flex-col space-y-1 p-2">
      {context_blocks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
          <span className="flex items-center">
            <item.icon
              className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
              aria-hidden="true"
            />
            {item.name}
          </span>
          <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
      ))}

      <div className="my-2 h-px bg-gray-200" />

      {intermediate_blocks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
          <span className="flex items-center">
            <item.icon
              className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
              aria-hidden="true"
            />
            {item.name}
          </span>
          <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
      ))}

      <div className="my-2 h-px bg-gray-200" />

      {artifact_blocks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="group flex items-center justify-between rounded px-1.5 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
          <span className="flex items-center">
            <FontAwesomeIcon icon={item.icon} className="mr-2 size-8 flex-shrink-0 text-gray-400 group-hover:text-indigo-500" aria-hidden="true" />
            {item.name}
          </span>
          <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
      ))}
    </nav>
  )
}