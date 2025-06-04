import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { FaXTwitter, FaRegComment, FaRetweet, FaRegHeart, FaShareFromSquare } from "react-icons/fa6"; 
import { BsDot } from "react-icons/bs";

interface TwitterBlockProps {
    profilePicUrl?: string;
    username?: string;
    handle?: string;
    contentText: string;
    mediaUrl?: string; // Optional image/video in the tweet
    timestamp?: string;
    commentsCount?: number;
    retweetsCount?: number;
    likesCount?: number;
}

export default function TwitterPostBlock({
    profilePicUrl = "https://via.placeholder.com/40",
    username = "Username",
    handle = "@handle",
    contentText,
    mediaUrl,
    timestamp = "1h",
    commentsCount = 23,
    retweetsCount = 45,
    likesCount = 120,
}: TwitterBlockProps) {

    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <FaXTwitter
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10" // Twitter's branding is usually black/white
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">X</div>
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
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex space-x-3">
                        {/* Profile Picture */}
                        <img
                            src={profilePicUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            {/* Username, Handle, Timestamp */}
                            <div className="flex items-center text-sm">
                                <span className="font-bold text-gray-900">{username}</span>
                                <BsDot className="mx-0.5 text-gray-500" />
                                <span className="text-gray-500">{handle}</span>
                                <BsDot className="mx-0.5 text-gray-500" />
                                <span className="text-gray-500">{timestamp}</span>
                            </div>

                            {/* Tweet Content Text */}
                            <p className="mt-1 text-gray-800 text-sm">
                                {contentText}
                            </p>

                            {/* Optional Media */}
                            {mediaUrl && (
                                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                                    <video
                                        className="w-full h-full object-cover"
                                        src={mediaUrl}
                                        controls
                                        autoPlay
                                        loop
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-between mt-3 text-gray-500 text-base">
                                <button className="flex items-center space-x-1 hover:text-blue-500">
                                    <FaRegComment />
                                    <span className="text-xs">{commentsCount}</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-green-500">
                                    <FaRetweet />
                                    <span className="text-xs">{retweetsCount}</span>
                                </button>
                                <button className="flex items-center space-x-1 hover:text-red-500">
                                    <FaRegHeart />
                                    <span className="text-xs">{likesCount}</span>
                                </button>
                                <button className="hover:text-blue-500">
                                    <FaShareFromSquare />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
