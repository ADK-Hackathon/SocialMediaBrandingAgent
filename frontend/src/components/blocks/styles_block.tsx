import { XMarkIcon, PlusIcon } from '@heroicons/react/20/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'
import BaseBlock from './base_block';
import type { Base, Style } from '../../base';
import type { Dispatch, SetStateAction } from 'react';

interface StyleBlockProps {
    base: Base;
    setBase: Dispatch<SetStateAction<Base>>;
}

export default function StylesBlock({ base, setBase }: StyleBlockProps) {

    const styles: Style[] = base.styles?.value || [];

    const selectedStyles = styles.filter(style => style.selected);
    const notSelectedStyles = styles.filter(style => !style.selected);

    const toggleStyleSelection = (styleName: string) => {
        const updatedStyles = styles.map(style => 
            style.name === styleName 
                ? { ...style, selected: !style.selected }
                : style
        );

        setBase(prevBase => ({
            ...prevBase,
            styles: {
                ...prevBase.styles,
                value: updatedStyles
            }
        }));
    };

    return (
        <BaseBlock
            icon={SparklesIcon}
            title="Styles"
            content={
                <div className="px-6 py-4 space-y-4">
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Selected Styles:</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedStyles.map(style => (
                                <span
                                    key={style.name}
                                    className="inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-indigo-800 ring-1 ring-inset ring-indigo-700/10"
                                >
                                    {style.name}
                                    <button
                                        type="button"
                                        className="ml-1.5 inline-flex flex-shrink-0 rounded-full p-0.5 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-indigo-100"
                                        onClick={() => toggleStyleSelection(style.name)}
                                    >
                                        <span className="sr-only">Remove {style.name}</span>
                                        <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                                    </button>
                                </span>
                            ))}
                            {notSelectedStyles.length === 0 && (
                                <p className="text-xs text-gray-400">No styles selected.</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-medium text-gray-500 mb-2">Available Styles:</h3>
                        <div className="flex flex-wrap gap-2">
                            {notSelectedStyles.map(style => (
                                <span
                                    key={style.name}
                                    className="inline-flex items-center rounded-full bg-gray-100 py-0.5 pl-2.5 pr-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/10"
                                >
                                    {style.name}
                                    <button
                                        type="button"
                                        className="ml-1.5 inline-flex flex-shrink-0 rounded-full p-0.5 text-gray-700 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 focus:ring-offset-gray-100"
                                        onClick={() => toggleStyleSelection(style.name)}
                                    >
                                        <span className="sr-only">Add {style.name}</span>
                                        <PlusIcon className="h-3 w-3" aria-hidden="true" />
                                    </button>
                                </span>
                            ))}
                            {notSelectedStyles.length === 0 && (
                                <p className="text-xs text-gray-400">No available styles.</p>
                            )}
                        </div>
                    </div>
                </div>
            }
        />
    );
}