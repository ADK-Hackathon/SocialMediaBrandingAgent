import { BellIcon } from '@heroicons/react/24/outline'
import ToolBar from '../components/tool_bar'
import BuildBlocks from '../components/build_blocks'
import ChatInterface from '../components/ChatInterface'
import type { Base } from '../base'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Define props interface
interface MainPageProps {
  userId: string;
  sessionId: string;
}

export default function MainPage({ userId, sessionId }: MainPageProps) {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get initial base from location state, or redirect to landing if not available
    const initialBase: Base = location.state?.initialBase;
    
    if (!initialBase) {
        // If no initial base is provided, redirect to landing page
        navigate('/');
        return null;
    }
    
    const [base, setBase] = useState<Base>(initialBase);

    return (
        <div className="flex min-h-full flex-col">
        <header className="shrink-0 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
            />
            <div className="flex items-center gap-x-8">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
                </button>
                <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your profile</span>
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-800"
                />
                </a>
            </div>
            </div>
        </header>

        <div className="mx-auto flex flex-1 w-full max-w-7xl items-start gap-x-8 py-10 sm:px-2 lg:px-4">
            <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
                <ToolBar base={base} setBase={setBase} />
            </aside>

            <main className="flex-1">
                <BuildBlocks base={base} setBase={setBase} />
            </main>

            <aside className="sticky top-8 hidden w-96 h-[70vh] shrink-0 xl:block flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                <ChatInterface userId={userId} sessionId={sessionId} base={base} setBase={setBase} />
            </aside>
        </div>
        </div>
    )
}
