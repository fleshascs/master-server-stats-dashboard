import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';
import { useQuery } from 'react-query';
import Card from '../Card';
import { DATE_TIME_FORMAT } from './constants';

interface Server {
  id: string;
  address: string;
  hostname: string;
  players: string;
  maxplayers: string;
  map: string;
  status: string;
  game: string;
  date_create: string;
  date_end: string;
  type: string;
  rounds: string;
  num: number;
}
interface Servers {
  boostedServers: Server[];
  top50servers: Server[];
}
export const ServerList: FC = () => {
  const { isLoading, error, data } = useQuery<Servers, Error>('boosted-server', () =>
    fetch('https://cs-boost.lt/api/servers.php').then((res) => res.json())
  );

  const title = 'Server List';

  if (isLoading) return <Card title={title}>Loading...</Card>;
  if (error) return <Card title={title}>An error has occurred</Card>;

  return (
    <Card title={title}>
      <table className='w-full text-xs text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nr.
            </th>
            <th scope='col' className='px-6 py-3'>
              Server name
            </th>
            <th scope='col' className='px-6 py-3'>
              IP
            </th>
            <th scope='col' className='px-6 py-3'>
              Boosted since
            </th>
            <th scope='col' className='px-6 py-3'>
              Boosted until
            </th>
            <th scope='col' className='px-6 py-3'>
              <span className='sr-only'>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.boostedServers.map((server) => (
            <tr
              key={server.address}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className='px-6 py-4'>{server.num}</td>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
              >
                {server.hostname}
              </th>
              <td className='px-6 py-4'>{server.address}</td>
              <td className='px-6 py-4'>
                {dayjs.unix(Number(server.date_create)).format(DATE_TIME_FORMAT)}
              </td>
              <td className='px-6 py-4'>
                {server.date_end === '0'
                  ? 'Permanently'
                  : dayjs.unix(Number(server.date_end)).format(DATE_TIME_FORMAT)}
              </td>
              <td className='px-6 py-4 text-right'>
                <Link href={'/cs-boost/' + server.id}>
                  <a className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                    Edit
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
