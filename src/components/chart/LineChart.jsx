import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ dailyScores }) => {
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const paginatedData = dailyScores?.slice(
        page * pageSize,
        page * pageSize + pageSize
    );

    const labels = paginatedData?.map((item) => item.date);
    const scores = paginatedData?.map((item) => Number(item.averageScore));

    const data = {
        labels,
        datasets: [
            {
                label: "Average Score",
                data: scores,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#ffffff",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: "Daily Interview Scores",
                color: "#ffffff",
                font: {
                    size: 16,
                    weight: "bold",
                },
            },
            tooltip: {
                titleColor: "#000",
                bodyColor: "#000",
                backgroundColor: "#fff",
            },
        },
        scales: {
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                    color: "#ffffff",
                    font: {
                        size: 13,
                    },
                },
                grid: {
                    color: "rgba(255,255,255,0.1)",
                },
                title: {
                    display: true,
                    text: "Score",
                    color: "#ffffff",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            x: {
                ticks: {
                    color: "#ffffff",
                    font: {
                        size: 13,
                    },
                },
                grid: {
                    color: "rgba(255,255,255,0.1)",
                },
                title: {
                    display: true,
                    text: "Date",
                    color: "#ffffff",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />

            {/* Pagination controls */}
            <div className="flex justify-center gap-3 mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 cursor-pointer"
                >
                    ◀ Prev
                </button>
                <button
                    onClick={() =>
                        setPage((prev) =>
                            (prev + 1) * pageSize < dailyScores.length
                                ? prev + 1
                                : prev
                        )
                    }
                    disabled={(page + 1) * pageSize >= dailyScores.length}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 cursor-pointer"
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
};

export default LineChart;
