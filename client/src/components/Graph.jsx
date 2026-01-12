import { useRef, useState, useEffect } from 'react';
import { getColor } from '../utils/getColor';
import graphData from './graphData';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ModalResourceLink from './UI/about/ModalResourceLink';
import useDarkModeStore from '../stores/useDarkModeStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph() {
  const chartRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

  const graphColors = {
    title: getColor(isDarkMode ? '--secondary-dark' : '--primary-dark'),
    ticks: getColor(isDarkMode ? '--secondary-light' : '--secondary-dark'),
    grid: getColor(isDarkMode ? '--secondary-light' : '--secondary-dark', '33'),
    labelsBorder: isDarkMode
      ? [
        getColor('--secondary-light'),
        getColor('--brand-primary', '80'),
        getColor('--brand-secondary', '80'),
      ]
      : [
        getColor('--brand-secondary'),
        getColor('--secondary-dark'),
        getColor('--brand-primary'),
      ],
    labelsBackground: isDarkMode
      ? [
        getColor('--secondary-light', '70'),
        getColor('--brand-primary', '70'),
        getColor('--brand-secondary', '70'),
      ]
      : [
        getColor('--brand-secondary', '53'),
        getColor('--secondary-dark', '53'),
        getColor('--brand-primary', '53'),
      ],
  };

  const hiveData = {
    datasets: [
      {
        label: 'Millions of hives',
        data: graphData.map((row) => ({ x: Number(row.date), y: row.hives })),
        backgroundColor: graphColors.labelsBackground,
        borderColor: graphColors.labelsBorder,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Years',
          color: graphColors.title,
          font: { size: 16, weight: 700, family: 'blinker' },
        },
        ticks: {
          color: graphColors.ticks,
          font: { size: 14, family: 'blinker' },
          stepSize: 1,
        },
        grid: { color: graphColors.grid },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Millions of hives',
          color: graphColors.title,
          font: { size: 16, weight: 700, family: 'blinker' },
        },
        ticks: {
          color: graphColors.ticks,
          font: { size: 14, family: 'blinker' },
        },
        grid: { color: graphColors.grid },
        beginAtZero: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} million hives in ${context.parsed.x}`;
          },
          title: () => null,
        },
      },
      title: {
        display: true,
        text: 'Millions of hives in the U.S.',
        color: graphColors.title,
        padding: { top: 10, bottom: 10 },
        font: { size: 24, family: 'blinkerbold' },
      },
      legend: { display: false },
    },
    onClick: () => setShowModal(true),
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [isDarkMode]);

  return (
    <div className='w-full max-w-screen-lg mx-auto py-4 h-96'>
      <Line
        ref={chartRef}
        data={hiveData}
        options={graphOptions}
        className='hover:cursor-pointer'
      />
      {showModal && (
        <ModalResourceLink
          url='https://muse.union.edu/mth-063-01-f18/2018/10/06/decline-of-honeybees/'
          handleClick={setShowModal}
        />
      )}
    </div>
  );
}
