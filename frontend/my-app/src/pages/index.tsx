import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { ApexOptions } from 'apexcharts';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

// Dynamically import ApexCharts with no SSR
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartData {
  labels: string[];
  datasets: Array<{
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string[];
    fill?: boolean;
  }>;
}

interface ChartApiResponse {
  labels: string[];
  data: number[];
}

// Define Chart.js options
const lineOptions: ChartOptions<'line'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const barOptions: ChartOptions<'bar'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const pieOptions: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20,
        padding: 15,
        color: '#333',
        font: {
          size: 14,
          family: 'Arial',
        },
      },
    },
  },
};

// Apex Candlestick chart options
const candlestickOptions: ApexOptions = {
  chart: {
    type: 'candlestick',
    height: 350,
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

export default function Dashboard() {
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [barData, setBarData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<ChartData | null>(null);
  const [candlestickData, setCandlestickData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch line chart data
        const lineResponse = await axios.get<ChartApiResponse>('http://127.0.0.1:8000/api/line-chart-data/');
        setLineData({
          labels: lineResponse.data.labels,
          datasets: [{
            label: 'Line Chart',
            data: lineResponse.data.data,
            borderColor: getComputedStyle(document.documentElement).getPropertyValue('--chart-line-color'),
            fill: false,
          }],
        });

        // Fetch bar chart data
        const barResponse = await axios.get<ChartApiResponse>('http://127.0.0.1:8000/api/bar-chart-data/');
        setBarData({
          labels: barResponse.data.labels,
          datasets: [{
            label: 'Bar Chart',
            data: barResponse.data.data,
            backgroundColor: [
              getComputedStyle(document.documentElement).getPropertyValue('--chart-bar-color-1'),
              getComputedStyle(document.documentElement).getPropertyValue('--chart-bar-color-2'),
              getComputedStyle(document.documentElement).getPropertyValue('--chart-bar-color-3'),
            ],
          }],
        });

        // Fetch pie chart data
        const pieResponse = await axios.get<ChartApiResponse>('http://127.0.0.1:8000/api/pie-chart-data/');
        setPieData({
          labels: pieResponse.data.labels,
          datasets: [{
            data: pieResponse.data.data,
            backgroundColor: [
              getComputedStyle(document.documentElement).getPropertyValue('--chart-pie-color-1'),
              getComputedStyle(document.documentElement).getPropertyValue('--chart-pie-color-2'),
              getComputedStyle(document.documentElement).getPropertyValue('--chart-pie-color-3'),
            ],
          }],
        });

        // Fetch candlestick chart data
        const candlestickResponse = await axios.get<any[]>('http://127.0.0.1:8000/api/candlestick-data/');
        setCandlestickData(candlestickResponse.data);

      } catch (error) {
        setError('Failed to fetch chart data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {error && <div className="error-message">{error}</div>}
      
      <div className="chart-container">
        <h2 className="chart-title">Candlestick Chart</h2>
        <div className="chart-wrapper">
          <ApexCharts
            options={candlestickOptions}
            series={[{ name: 'Candlestick', data: candlestickData }]}
            type="candlestick"
            height={300}
          />
        </div>
      </div>
      
      {lineData && (
        <div className="chart-container">
          <h2 className="chart-title">Line Chart</h2>
          <div className="chart-wrapper">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      )}

      {barData && (
        <div className="chart-container">
          <h2 className="chart-title">Bar Chart</h2>
          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      )}
      
      {pieData && (
        <div className="chart-container">
          <h2 className="chart-title">Pie Chart</h2>
          <div className="pie-chart-wrapper">
            <Pie data={pieData} options={pieOptions}/>
          </div>
        </div>
      )}
    </div>
  );
}
