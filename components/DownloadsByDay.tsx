import { FC } from 'react';
import Card from './Card';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Stats = {
  date: string;
  clicks: number;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
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

const buildData = (chartData: Stats[]) => ({
  labels: chartData.map((item, i) => labels[chartData.length - i - 1] ?? item.date),
  datasets: [
    {
      label: "Download's",
      data: chartData.map((item) => item.clicks),
      backgroundColor: '#424c58'
    }
  ]
});

const DownloadsByDay: FC = () => {
  const { isLoading, error, data } = useQuery<Stats[], Error>('downloads-by-day', () =>
    fetch('https://fleshas.lt/php/api/csdownloads/downloadsByDay.php').then(async (res) =>
      (await res.json()).reverse()
    )
  );

  const title = 'CS 1.6 downloads (last 10 days)';

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

export default DownloadsByDay;
