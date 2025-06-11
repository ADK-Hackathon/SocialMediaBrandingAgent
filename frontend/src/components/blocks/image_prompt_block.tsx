import { PhotoIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';


export default function ImagePromptBlock() {
    return (
        <BaseBlock
            icon={PhotoIcon}
            title="Image Prompt"
            content={
                <div className="px-3 py-3">
                    <div className="mt-2">
                        <div
                            className="block w-full rounded-md bg-gray-50 p-3 text-gray-700 sm:text-sm min-h-[calc(4*1.5rem+2*0.75rem)] prose prose-sm max-w-none"
                        >
                            <p><strong>Brand Voice & Tone:</strong> Fun, friendly, and a little cheeky! We're all about good times and great hotdogs.</p>
                            <p><em>Key Messages:</em> Emphasize freshness, flavor, and the fun experience of grabbing a classic hotdog. Think "The Best Wurst in Town!" or "Your Go-To for a Quick, Delicious Bite!"</p>
                            <ul>
                                <li><strong>Visuals:</strong> Bright, appetizing photos of our hotdogs are a must! Show close-ups of juicy sausages, fresh toppings, and happy customers (with permission!).</li>
                                <li><strong>Promotions:</strong> Regularly feature daily specials, combo deals, or loyalty rewards. Make it exciting!</li>
                                <li><strong>Engagement:</strong> Run polls like "Ketchup or Mustard?", share fun facts about hotdogs, or host a "design your dream hotdog" contest.</li>
                            </ul>
                            <p>Remember to always be <em>energetic and inviting</em> in all your communications!</p>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
