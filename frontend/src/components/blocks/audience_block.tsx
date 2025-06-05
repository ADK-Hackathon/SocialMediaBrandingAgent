import { XMarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';


const audience_groups = [
    { id: 1, name: 'Teens (13-17)', selected: true },
    { id: 2, name: 'Young Adults (18-24)', selected: false },
    { id: 3, name: 'Adults (25-34)', selected: true },
    { id: 4, name: 'Students', selected: true },
    { id: 5, name: 'Professionals', selected: false },
    { id: 6, name: 'Gamers', selected: true },
    { id: 7, name: 'Foodies', selected: false },
    { id: 8, name: 'Tech Enthusiasts', selected: true },
    { id: 9, name: 'Travelers', selected: false },
    { id: 10, name: 'Fitness Buffs', selected: true },
]


export default function AudienceBlock() {

    const selectedAudiences = audience_groups.filter(group => group.selected);
    const notSelectedAudiences = audience_groups.filter(group => !group.selected);

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
                                    key={group.id}
                                    className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-700/10"
                                >
                                    {group.name}
                                    <button
                                        type="button"
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
                                    key={group.id}
                                    className="inline-flex items-center rounded-full bg-gray-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/10"
                                >
                                    {group.name}
                                    <button
                                        type="button"
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