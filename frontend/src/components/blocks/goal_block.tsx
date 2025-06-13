import { LightBulbIcon } from '@heroicons/react/24/outline';
import BaseBlock from './base_block';
import type { Base } from '../../base';
import type { Dispatch, SetStateAction } from 'react';

// Define props interface
interface GoalBlockProps {
    base: Base;
    setBase: Dispatch<SetStateAction<Base>>;
  }

export default function GoalBlock({ base, setBase }: GoalBlockProps) {
    return (
        <BaseBlock
            icon={LightBulbIcon}
            title="Goal"
            content={
                <div className="px-3 py-3">
                    <div className="mt-2">
                        <textarea
                            rows={9}
                            name="goal_input"
                            id="goal_input"
                            value={base.goal}
                            placeholder="Describe your goal here..."
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => {
                                setBase({ ...base, goal: e.target.value });
                            }}
                        />
                    </div>
                </div>
            }
        />
    );
}
