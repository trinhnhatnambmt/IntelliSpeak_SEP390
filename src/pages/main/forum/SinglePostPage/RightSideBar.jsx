import React from "react";

const RightSideBar = () => {
    return (
        <div className="hidden lg:block col-span-3">
            <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-xl shadow space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">
                            Teamcamp
                        </h4>
                        <button className="text-xs text-blue-600 hover:underline">
                            Follow
                        </button>
                    </div>
                    <img
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
                        alt="team"
                        className="w-10 h-10 rounded-full"
                    />
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    More posts from Teamcamp
                </h5>
                <ul className="text-sm space-y-2">
                    <li className="hover:underline cursor-pointer">
                        Top Remote Work Disadvantages & How to Overcome
                    </li>
                    <li className="hover:underline cursor-pointer">
                        Developer Productivity Crisis: 65% time waste
                    </li>
                    <li className="hover:underline cursor-pointer">
                        How Global Remote Teams Coordinate
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RightSideBar;
