import { LightBulbIcon } from '@heroicons/react/24/outline';
import BaseBlock from './base_block';


export default function GoalBlock() {
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
                            placeholder="Describe your goal here..."
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>
            }
        />
    );
}
