import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import BaseBlock from './base_block';
import type { Trend } from '../../base';


const trend: Trend = {
    selected_trend: "AI",
    trending: ["AI", "Wine & Fruits Fair", "WWDC2025"],
}


export default function TrendsBlock() {

    return (
        <BaseBlock
            icon={ArrowTrendingUpIcon}
            title="Trends"
            content={
                <div className="px-6 py-4 space-y-4">
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Trending Topics:</h3>
                        <div className="flex flex-wrap gap-2">
                            {trend.trending.map(t => (
                                <span
                                    key={t}
                                    className={`inline-flex items-center rounded-full py-0.5 px-2.5 text-xs font-medium ring-1 ring-inset ${
                                        t === trend.selected_trend
                                            ? 'bg-indigo-100 text-indigo-700 ring-indigo-600/20'
                                            : 'bg-gray-100 text-gray-600 ring-gray-500/10'
                                    }`}
                                >
                                    {t}
                                    {t === trend.selected_trend && (
                                        <CheckCircleIcon className="ml-1.5 h-4 w-4 text-indigo-700" />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            }
        />
    );
}