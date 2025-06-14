import { XMarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';
import type { Base } from '../../base';
import type { Dispatch, SetStateAction } from 'react';


interface AudienceBlockProps {
    base: Base;
    setBase: Dispatch<SetStateAction<Base>>;
}

export default function AudienceBlock({ base, setBase }: AudienceBlockProps) {

    const audiences = base.audiences;
    const audienceList = audiences.value || [];
    const selectedAudiences = audienceList.filter(group => group.targeted);
    const notSelectedAudiences = audienceList.filter(group => !group.targeted);

    const handleAudienceToggle = (groupName: string, targetState: boolean) => {
        const updatedAudiences = audienceList.map(audience => {
            if (audience.name === groupName) {
                return { ...audience, targeted: targetState };
            }
            return audience;
        });
        setBase({ ...base, audiences: { ...audiences, value: updatedAudiences } });
    };

    return (
        <BaseBlock
            icon={UsersIcon}
            title="Audiences"
            content={
                <div className="px-6 py-4 space-y-4">
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Targeted Audiences:</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedAudiences.map(group => (
                                <span
                                    key={group.name}
                                    className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-700/10"
                                >
                                    {group.name}
                                    <button
                                        type="button"
                                        onClick={() => handleAudienceToggle(group.name, false)}
                                        className="ml-1.5 inline-flex flex-shrink-0 rounded-full p-0.5 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-indigo-100"
                                    >
                                        <span className="sr-only">Remove {group.name}</span>
                                        <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                                    </button>
                                </span>
                            ))}
                            {selectedAudiences.length === 0 && (
                                <p className="text-xs text-gray-400">No audiences specifically targeted.</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Candidate Audiences:</h3>
                        <div className="flex flex-wrap gap-2">
                            {notSelectedAudiences.map(group => (
                                <span
                                    key={group.name}
                                    className="inline-flex items-center rounded-full bg-gray-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/10"
                                >
                                    {group.name}
                                    <button
                                        type="button"
                                        onClick={() => handleAudienceToggle(group.name, true)}
                                        className="ml-1.5 inline-flex flex-shrink-0 rounded-full p-0.5 text-gray-700 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 focus:ring-offset-gray-100"
                                    >
                                        <span className="sr-only">Add {group.name}</span>
                                        <PlusIcon className="h-3 w-3" aria-hidden="true" />
                                    </button>
                                </span>
                            ))}
                            {notSelectedAudiences.length === 0 && (
                                <p className="text-xs text-gray-400">No candidate audiences to show.</p>
                            )}
                        </div>
                    </div>
                </div>
            }
        />
    );
}