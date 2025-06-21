import { MicrophoneIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';
import ReactMarkdown from 'react-markdown';


interface VideoNarrationBlockProps {
    narration: string;
}

export default function VideoNarrationBlock({ narration }: VideoNarrationBlockProps) {
    return (
        <BaseBlock
            icon={MicrophoneIcon}
            title="Video Narration"
            content={
                <div className="px-3 py-3">
                    <div className="mt-2">
                        <div
                            className="block w-full rounded-md bg-gray-50 p-3 text-gray-700 sm:text-sm min-h-[calc(4*1.5rem+2*0.75rem)] prose prose-sm max-w-none"
                        >
                            {narration === "" ? (
                                    <div className="flex space-x-1 mt-2">
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
                                    </div>
                                ) : (
                                    <ReactMarkdown>{narration}</ReactMarkdown>
                                )}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
