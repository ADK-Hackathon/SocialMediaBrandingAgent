import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import ToolBar from '../components/tool_bar'
import ArtifactBlocks from '../components/artifact_blocks'
import ContextBlocks from '../components/context_blocks'
import ChatInterface from '../components/ChatInterface'
import type { Base } from '../base'
import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get initial base, userId, and sessionId from location state
    const { initialBase, userId, sessionId } = location.state || {};
    
    if (!initialBase || !userId || !sessionId) {
        // If required data is not provided, redirect to landing page
        navigate('/');
        return null;
    }
    
    const [base, setBase] = useState<Base>(initialBase);
    const [showArtifacts, setShowArtifacts] = useState(true);
    const [isToolbarOpen, setIsToolbarOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsToolbarOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            {/* <aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
                <ToolBar base={base} setBase={setBase} />
            </aside> */}

            <main className="flex-1">
                {/* View Toggle and Toolbar Dropdown */}
                <div className="mb-8 flex items-start justify-start">
                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setShowArtifacts(true)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                    showArtifacts
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Artifacts
                            </button>
                            <button
                                onClick={() => setShowArtifacts(false)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                    !showArtifacts
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Context
                            </button>
                        </div>

                        {/* Toolbar Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsToolbarOpen(!isToolbarOpen)}
                                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                                    isToolbarOpen
                                        ? 'bg-indigo-100 text-indigo-600'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                                }`}
                            >
                                <Cog6ToothIcon className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            {isToolbarOpen && (
                                <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-4">
                                        <ToolBar base={base} setBase={setBase} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-2 xl:gap-x-8">
                    {showArtifacts ? (
                        <ArtifactBlocks base={base} />
                    ) : (
                        <ContextBlocks base={base} setBase={setBase} />
                    )}
                </ul>
            </main>

            <aside className="sticky top-8 hidden w-96 h-[70vh] shrink-0 xl:block flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                <ChatInterface userId={userId} sessionId={sessionId} base={base} setBase={setBase} />
            </aside>
        </div>
        </div>
    )
}
