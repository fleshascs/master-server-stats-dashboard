import { FC } from 'react';

import { useQuery } from 'react-query';
import Card from '../Card';

export const QueryMasterServerPlayers: FC<{ server: string; isAlive: boolean }> = ({
  server,
  isAlive
}) => {
  const { isLoading, error, data } = useQuery(['ms-server-list-players', server], () =>
    fetch(process.env.apiUrl + '/api/vmsq/' + server).then((res) => res.json())
  );

  if (isLoading) return <Card title={server}>Loading...</Card>;
  if (error) return <Card title={server}>An error has occurred</Card>;

  return (
    <Card title={`${server} is ${isAlive || data ? 'online' : 'offline'}`}>
      <div>
        <h4 className='p-3 '>Server list:</h4>
        <ul className='list-decimal list-inside overflow-y-auto p-3'>
          {data.map((ip) => (
            <li className='p-1' key={ip}>
              {ip}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
