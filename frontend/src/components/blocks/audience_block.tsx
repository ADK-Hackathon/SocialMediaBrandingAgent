import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon, XMarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'

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
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <UsersIcon
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10"
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">Audiences</div>
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
                                Edit Segments
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                            >
                                View Insights
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
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
        </div>
    )
}