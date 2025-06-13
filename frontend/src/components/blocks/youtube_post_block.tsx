import { FaYoutube } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import BaseBlock from './base_block';
import { ArrowPathIcon } from '@heroicons/react/24/outline';


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
        <BaseBlock
            icon={FaYoutube}
            title="YouTube"
            content={
                <div className="px-3 py-3">
                    <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                        <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
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
            }
        />
    );
}
