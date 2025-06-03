import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { FaHeart, FaCommentDots, FaShare, FaTiktok } from "react-icons/fa6";
import { BsMusicNoteBeamed } from "react-icons/bs";

interface TikTokBlockProps {
    videoUrl: string;
    contentText: string;
    username?: string;
    profilePicUrl?: string;
    musicTitle?: string;
    likes?: number;
    comments?: number;
    shares?: number;
}

export default function TikTokBlock({
    videoUrl,
    contentText,
    username = "@username",
    profilePicUrl = "https://randomuser.me/api/portraits/men/32.jpg",
    musicTitle = "Original Sound",
    likes = 1245,
    comments = 237,
    shares = 98,
}: TikTokBlockProps) {

    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <FaTiktok
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10"
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">TikTok</div>
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
                <div className="relative h-[440px] bg-black rounded-lg overflow-hidden">
                    {/* Video Content */}
                    <video
                        className="w-full h-full object-cover"
                        src={videoUrl}
                        controls
                        autoPlay
                        loop
                    />

                    {/* Overlay: User Info and Actions */}
                    <div className="absolute bottom-5 left-4 text-white">
                        {/* Username */}
                        <p className="text-sm font-semibold">{username}</p>

                        {/* Post Caption */}
                        <p className="text-xs">{contentText}</p>

                        {/* Music Info */}
                        <p className="text-xs flex items-center mt-1">
                            <BsMusicNoteBeamed className="mr-1" /> {musicTitle}
                        </p>
                    </div>

                    {/* Right-Side Action Buttons */}
                    <div className="absolute bottom-16 right-3 flex flex-col items-center space-y-3 text-white text-lg">
                        <img
                            src={profilePicUrl}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border-2 border-white"
                        />
                        <button className="flex flex-col items-center">
                            <FaHeart className="text-xl" />
                            <span className="text-xs">{likes}</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <FaCommentDots className="text-xl" />
                            <span className="text-xs">{comments}</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <FaShare className="text-xl" />
                            <span className="text-xs">{shares}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
