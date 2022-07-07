import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Card from '../Card';

async function* getServerDetails(ips: string[]) {
  for (const ip of ips) {
    const details = await fetch('https://cs-boost.lt/api/server_info_by_ip.php?ip=' + ip).then(
      (res) => res.json()
    );
    yield details.server;
  }
}

const collectServerDetails = (ips, update) => {
  let stop = false;
  (async () => {
    for await (const details of getServerDetails(ips)) {
      update((d) => ({ ...d, [details.address]: details }));
      if (stop) break;
    }
  })();

  return () => {
    stop = true;
  };
};

export const QueryMasterServerPlayers: FC<{ server: string; isAlive: boolean }> = ({
  server,
  isAlive
}) => {
  const { isLoading, error, data } = useQuery<string[], Error>(
    ['ms-server-list-players', server],
    () => fetch(process.env.apiUrl + '/api/vmsq/' + server).then((res) => res.json())
  );

  const [serversInfo, setServersInfo] = useState({});

  useEffect(() => {
    let stopCollecting;
    if (data?.length) {
      stopCollecting = collectServerDetails(data, setServersInfo);
    }
    return () => {
      // stopCollecting && stopCollecting();
    };
  }, [data]);

  if (isLoading) return <Card title={server}>Loading...</Card>;
  if (error) return <Card title={server}>An error has occurred</Card>;

  return (
    <Card title={`${server} is ${isAlive || data ? 'online' : 'offline'}`}>
      <div>
        <h4 className='p-3 '>Server list:</h4>
        <ul className='list-none list-inside overflow-y-auto p-3'>
          {data.map((ip, i) => (
            <li className='p-1 text-xs' key={ip}>
              <div className='flex space-x-3'>
                <div>{i + 1}. </div>
                <div>{ip}</div>
                <div className='flex-1 truncate'>{serversInfo[ip]?.hostname}</div>
                <div>
                  {serversInfo[ip]?.players}/{serversInfo[ip]?.maxplayers}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
