import { FaXTwitter, FaRegComment, FaRetweet, FaRegHeart, FaShareFromSquare } from "react-icons/fa6"; 
import { BsDot } from "react-icons/bs";
import BaseBlock from './base_block';


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
        <BaseBlock
            icon={FaXTwitter}
            title="X"
            content={
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
            }
        />
    );
}
