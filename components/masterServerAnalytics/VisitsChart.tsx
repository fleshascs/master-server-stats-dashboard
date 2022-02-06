import { FC } from 'react';
import Card from '../Card';
import { useQuery } from 'react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Stats = {
  date: string;
  uniques: number;
};
type MasterStats = {
  ms: number;
  color: string;
  label: string;
  stats: Stats[];
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    }
  }
};

const labels = [
  'Today',
  'Yesterday',
  '2 days ago',
  '3 days ago',
  '4 days ago',
  '5 days ago',
  '6 days ago'
];

const buildData = (masters: MasterStats[]) => {
  return {
    labels: masters[0].stats.map((item, i) => labels[masters[0].stats.length - i - 1] ?? item.date),
    datasets: masters.reverse().map((master) => {
      return {
        label: master.label,
        data: master.stats.map((item) => item.uniques),
        backgroundColor: master.color
      };
    })
  };
};

const VisitsChart: FC = () => {
  const { isLoading, error, data } = useQuery<MasterStats[], Error>('master-week-visits', () =>
    fetch('https://fleshas.lt/php/analytics/masterServerLast30DaysStats.php').then(
      async (res) => await res.json()
    )
  );

  const title = 'Master Server unique visits';

  if (isLoading) return <Card title={title}>Loading...</Card>;
  if (error) return <Card title={title}>An error has occurred</Card>;

  const chartData = buildData(data);

  return (
    <Card title={title}>
      <div className='flex w-full px-5 pb-4  text-white'>
        <Bar options={options} data={chartData} />
      </div>
    </Card>
  );
};

export default React.memo(VisitsChart);
