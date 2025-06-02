import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Đăng ký các thành phần ChartJS cần sử dụng
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

export const BarChart = ({ data, options }) => {
    return <Bar data={data} options={options} />;
};

export const PieChart = ({ data, options }) => {
    return <Pie data={data} options={options} />;
};

export const LineChart = ({ data, options }) => {
    return <Line data={data} options={options} />;
};