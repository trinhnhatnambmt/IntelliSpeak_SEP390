import React from "react";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopicCard = ({ title, description, topicId, thumbnail }) => {
    return (
        <div className="w-full max-w-md relative mt-4 group mx-auto bg-white dark:bg-[#252525] border border-neutral-200 dark:border-neutral-700 overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
            <figure className="w-full h-60 overflow-hidden">
                <img
                    src={thumbnail ? thumbnail :
                        "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0"
                    }
                    alt="Frontend"
                    width={600}
                    height={600}
                    className="h-full w-full scale-105 group-hover:scale-100 object-cover transition-transform duration-300"
                />
            </figure>

            <div className="p-5 space-y-3">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white capitalize">
                    {title}
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {description}
                </p>

                <Link
                    to={`/main/topicDetail/${topicId}`}
                    className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
                >
                    Xem chi tiết
                    <span className="relative">
                        <ChevronRight className="group-hover:opacity-0 opacity-100 translate-y-0 group-hover:translate-y-2 transition-all duration-300" />
                        <ChevronsRight className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default TopicCard;
