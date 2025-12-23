import { useRef, useState } from 'react';
import { getColor } from '../utils/getColor';
import graphData from './graphData';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x-axis
  LinearScale, // y-axis
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import ModalResourceLink from './UI/about/ModalResourceLink';
import useDarkModeStore from '../stores/useDarkModeStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const chartRef = useRef(null);
  const [showModal, setShowModal] = useState(null);
  //Get Dark Mode state to update graph titles in dark mode
  const { isDarkMode } = useDarkModeStore();

  //Colors for graph
  const graphColors = {
    title: getColor('--primary-dark'),
    ticks: getColor('--secondary-dark'),
    grid: getColor('--secondary-dark', '33'),
    labelsBorder: [
      getColor('--brand-secondary'),
      getColor('--secondary-dark'),
      getColor('--brand-primary'),
    ],
    labelsBackground: [
      getColor('--brand-secondary', '53'),
      getColor('--secondary-dark', '53'),
      getColor('--brand-primary', '53'),
    ],
  };

  const hiveData = {
    labels: graphData.map((row) => row.date),
    datasets: [
      {
        data: graphData.map((row) => row.hives),
        backgroundColor: graphColors.labelsBackground,
        borderColor: graphColors.labelsBorder,
        borderWidth: 1,
        tension: 0.4,
        yAxisID: 'hives',
        xAxisID: 'date',
      },
    ],
  };

  const graphOptions = {
    scales: {
      x: {
        display: false,
      },
      date: {
        ticks: {
          stepSize: 1,
          color: graphColors.ticks,
          font: {
            size: 14,
            family: 'blinker',
          },
        },
        type: 'linear',
        reverse: false,
        grid: {
          color: graphColors.grid,
        },
        // title: {
        //   display: true,
        //   text: 'Years',
        //   color: titleColor,
        //   font: {
        //     size: 18,
        //     weight: 700,
        //     family: 'blinker',
        //   },
        // },
      },
      hives: {
        ticks: {
          color: graphColors.ticks,
          font: {
            size: 14,
            family: 'blinker',
          },
        },
        type: 'linear',
        title: {
          display: true,
          text: 'Millions of hives',
          color: graphColors.title,
          font: {
            size: 18,
            weight: 700,
            family: 'blinker',
          },
        },
        beginAtZero: false,
        grid: {
          color: graphColors.grid,
        },
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
        padding: {
          top: 10,
          bottom: 10,
        },
        font: {
          size: 24,
          family: 'blinkerbold',
          // style: "italic",
        },
      },
      datalabels: {
        anchor: 'right',
        align: 'end',
      },
      legend: {
        display: false,
        // title: "hives",
        // position: "right",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className='w-full max-w-screen-lg mx-auto py-4 h-96'>
      <Line
        ref={chartRef}
        data={hiveData}
        options={graphOptions}
        onClick={() => setShowModal(true)}
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
