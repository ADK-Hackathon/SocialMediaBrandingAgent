import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export default function GuidelineBlock() {
    return (
        <div>
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <DocumentTextIcon
                    className="size-12 flex-none rounded-lg bg-white text-indigo-600 p-2 ring-1 ring-gray-900/10"
                    aria-hidden="true"
                />
                <div className="text-sm/6 font-medium text-gray-900">Guideline</div>
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
                                Refresh
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                            >
                                Edit
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
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
        </div>
    )
}