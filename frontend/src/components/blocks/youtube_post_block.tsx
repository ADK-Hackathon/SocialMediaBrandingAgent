import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { FaYoutube } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";

interface YouTubeBlockProps {
    videoUrl: string;
    thumbnailUrl: string;
    videoTitle: string;
    channelName: string;
    views?: number;
    uploadTime?: string;
    descriptionSnippet?: string;
}

export default function YouTubePostBlock({
    videoUrl,
    thumbnailUrl,
    videoTitle,
    channelName,
    views = 999,
    uploadTime = "1 day ago",
    descriptionSnippet,
}: YouTubeBlockProps) {

    const formattedViews = views.toLocaleString();

    const truncatedVideoTitle = videoTitle.length > 50
        ? videoTitle.substring(0, 50) + '...'
        : videoTitle;

    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <FaYoutube
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10" // YouTube's primary color is red
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">YouTube</div>
                <Menu as="div" className="relative ml-auto">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Open options</span>
                        <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                            >
                                Edit
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                            >
                                Delete
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>

            <div className="px-3 py-3">
                <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                    <div className="relative w-full aspect-video bg-gray-900">
                        <video
                            className="w-full h-full object-cover"
                            src={videoUrl}
                            controls
                            autoPlay
                            loop
                        />
                    </div>

                    <div className="p-3 flex space-x-3">
                        {/* Channel Profile Picture */}
                        <img
                            src={thumbnailUrl}
                            alt="Channel Profile"
                            className="w-9 h-9 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1">
                            {/* Video Title */}
                            <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                                {truncatedVideoTitle}
                            </h3>
                            {/* Channel Name, Views and Upload Time */}
                            <p className="text-xs text-gray-500">
                                {channelName}<BsDot className="inline-block mx-0.5 align-middle" />{formattedViews} views<BsDot className="inline-block mx-0.5 align-middle" />{uploadTime}
                            </p>
                            {/* Optional Description Snippet */}
                            {descriptionSnippet && (
                                <p className="text-xs text-gray-700 mt-2 line-clamp-2">
                                    {descriptionSnippet}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
