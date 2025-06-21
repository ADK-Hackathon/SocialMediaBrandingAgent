import { DocumentTextIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';
import type { Base } from '../../base';
import type { Dispatch, SetStateAction } from 'react';


interface GuidelineBlockProps {
    base: Base;
    setBase: Dispatch<SetStateAction<Base>>;
}

export default function GuidelineBlock({ base, setBase }: GuidelineBlockProps) {
    return (
        <BaseBlock
            icon={DocumentTextIcon}
            title="Guideline"
            content={
                <div className="px-3 py-3">
                    <div className="mt-2">
                        <div
                            className="block w-full rounded-md bg-gray-50 p-3 text-gray-700 sm:text-sm min-h-[calc(4*1.5rem+2*0.75rem)] prose prose-sm max-w-none"
                        >
                            {base.guideline.value === "" ? (
                                    <div className="flex space-x-1 mt-2">
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
                                    </div>
                                ) : (
                                    <textarea
                                        rows={9}
                                        name="guideline_input"
                                        id="guideline_input"
                                        value={base.guideline.value}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => {
                                            const updatedBase = { ...base, guideline: { value: e.target.value, enabled: true } };
                                            setBase(updatedBase);
                                        }}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
