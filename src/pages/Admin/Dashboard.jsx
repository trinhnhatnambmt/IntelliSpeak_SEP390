import { BarChart, PieChart, LineChart } from '~/components/admin/ChartWrapper';

export const Dashboard = () => {
  // Dữ liệu cho biểu đồ thanh (Bar Chart)
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Signups',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ tròn (Pie Chart)
  const pieChartData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ đường (Line Chart)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12500, 19000, 15000, 20000, 18000, 24000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  // Cấu hình chung cho các biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', // Màu chú thích trắng cho dark mode
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#ccc', // Màu trục y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Màu lưới
        },
      },
      x: {
        ticks: {
          color: '#ccc', // Màu trục x
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Màu lưới
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white">Total Users</h3>
        <p className="text-3xl font-bold mt-2 text-white">1,234</p>
      </div>

      {/* Card 2 */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white">Revenue</h3>
        <p className="text-3xl font-bold mt-2 text-white">$12,345</p>
      </div>

      {/* Card 3 */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white">Active Projects</h3>
        <p className="text-3xl font-bold mt-2 text-white">24</p>
      </div>

      {/* Biểu đồ thanh */}
      <div className="bg-gray-800 rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-lg font-semibold text-white mb-4">User Signups</h3>
        <div className="h-64">
          <BarChart data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Biểu đồ tròn */}
      <div className="bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Device Distribution</h3>
        <div className="h-64">
          <PieChart data={pieChartData} options={chartOptions} />
        </div>
      </div>

      {/* Biểu đồ đường */}
      <div className="bg-gray-800 rounded-lg shadow p-6 md:col-span-3">
        <h3 className="text-lg font-semibold text-white mb-4">Revenue Growth</h3>
        <div className="h-80">
          <LineChart data={lineChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};