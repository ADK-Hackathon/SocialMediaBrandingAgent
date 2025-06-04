import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from '@heroicons/react/24/outline' 
import { FaInstagram, FaRegHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";


interface InstagramBlockProps {
    mediaUrl: string;
    contentText: string;
    username?: string;
    profilePicUrl?: string;
    likesCount?: number;
    timestamp?: string;
}

export default function InstagramBlock({
    mediaUrl, // Video or Image Url
    contentText,
    username = "username",
    profilePicUrl = "https://via.placeholder.com/32",
    likesCount = 1234,
    timestamp = "2 hours ago",
}: InstagramBlockProps) {

    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <FaInstagram
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10"
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">Instagram</div>
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
                <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    {/* Post Header: Profile Pic, Username, and original menu button */}
                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-2">
                            <img
                                src={profilePicUrl}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-semibold">{username}</span>
                        </div>
                        {/* The original Instagram post '...' menu, separate from the block's main menu */}
                        <button className="text-gray-500 text-lg">
                            <BsThreeDots />
                        </button>
                    </div>

                    {/* Video/Image Content */}
                    <div className="w-full aspect-square bg-black flex items-center justify-center">
                        <video
                            className="w-full h-full object-cover"
                            src={mediaUrl}
                            controls
                            autoPlay
                            loop
                        />
                    </div>

                    {/* Post Actions */}
                    <div className="flex justify-between px-3 py-2 text-gray-700 text-xl">
                        <div className="flex space-x-3">
                            <button><FaRegHeart /></button>
                            <button><FaRegComment /></button>
                            <button><FaRegPaperPlane /></button>
                        </div>
                        <button><FaRegBookmark /></button>
                    </div>

                    {/* Like Count */}
                    <p className="px-3 text-sm font-semibold">{likesCount.toLocaleString()} likes</p>

                    {/* Post Caption */}
                    <p className="px-3 pb-2 text-sm">
                        <span className="font-semibold">{username}</span> {contentText}
                    </p>

                    {/* Timestamp */}
                    <p className="px-3 pb-3 text-xs text-gray-500">{timestamp}</p>
                </div>
            </div>
        </div>
    )
}
