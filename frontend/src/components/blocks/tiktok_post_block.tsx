import { FaHeart, FaCommentDots, FaShare, FaTiktok } from "react-icons/fa6";
import BaseBlock from './base_block';
import { ArrowPathIcon } from '@heroicons/react/24/outline';


interface TikTokBlockProps {
    videoUrl: string;
    profilePicUrl?: string;
    likes?: number;
    comments?: number;
    shares?: number;
}


export default function TikTokBlock({
    videoUrl,
    profilePicUrl = "https://randomuser.me/api/portraits/men/32.jpg",
    likes = 1245,
    comments = 237,
    shares = 98,
}: TikTokBlockProps) {
    return (
        <BaseBlock
            icon={FaTiktok}
            title="TikTok"
            content={
                <div className="px-3 py-3">
                    <div className="relative h-[440px] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        {/* Video Content */}
                        {videoUrl ? (
                            <video
                                className="w-full h-full object-cover"
                                src={videoUrl}
                                controls
                                autoPlay
                                loop
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <ArrowPathIcon className="h-12 w-12 text-gray-500 animate-spin" />
                            </div>
                        )}

                        {/* Overlay: User Info and Actions */}
                        <div className="absolute bottom-5 left-4 text-white">
                            {/* Username */}
                            {/* <p className="text-sm font-semibold">{username}</p> */}

                            {/* Post Caption */}
                            {/* <p className="text-xs">{contentText}</p> */}

                            {/* Music Info */}
                            {/* <p className="text-xs flex items-center mt-1">
                                <BsMusicNoteBeamed className="mr-1" /> {musicTitle}
                            </p> */}
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
            }
        />
    );
}
