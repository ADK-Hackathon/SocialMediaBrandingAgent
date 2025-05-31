import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

export default function ToolBar() {
  return (
    <nav className="flex flex-col space-y-1 p-2">
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <HomeIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Dashboard
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <UsersIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Team
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <FolderIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Projects
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
        <div className="my-2 h-px bg-gray-200" />
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <CalendarIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Calendar
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <DocumentDuplicateIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Documents
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
        <div className="my-2 h-px bg-gray-200" />
        <a
            href="#"
            className="group flex items-center justify-between rounded px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:bg-indigo-100 focus:text-indigo-700"
        >
            <span className="flex items-center">
            <ChartPieIcon
                className="mr-3 size-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
            />
            Reports
            </span>
            <PlusIcon className="hidden size-5 text-indigo-600 group-hover:block" aria-hidden="true" />
        </a>
    </nav>
  )
}