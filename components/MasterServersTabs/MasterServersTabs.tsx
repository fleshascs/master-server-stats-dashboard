import clsx from 'clsx';
import { FC, useState } from 'react';
import { Tab, TabPanel, Tabs } from '../Tabs';
import MasterServerVisitsByCountry from '../masterServerAnalytics/VisitsByCountry';
import MasterServerVisitsChart from '../masterServerAnalytics/VisitsChart';
import { useQueries, useQuery } from 'react-query';
import Card from '../Card';

const Indicator: FC<{ isAlive: boolean; isLoading: boolean }> = ({ isAlive, isLoading }) => {
  if (isLoading)
    return <img className='h-5 w-5 animate-spin' src={require('../../images/loading.svg')} />;
  return (
    <div className='flex h-3 w-3 relative  mr-1'>
      <div
        className={clsx(
          'absolute inline-flex h-full w-full rounded-full opacity-75',
          isAlive ? 'bg-green-500' : 'animate-ping bg-red-500'
        )}
      />
      <div
        className={clsx(
          'relative inline-flex rounded-full h-3 w-3',
          isAlive ? 'bg-green-500' : 'bg-red-500'
        )}
      />
    </div>
  );
};

const TabTitle: FC<{ isLoading: boolean; isAlive: boolean; title: string }> = ({
  isAlive,
  title,
  isLoading
}) => {
  return (
    <div className='flex items-center'>
      <Indicator isAlive={isAlive} isLoading={isLoading} />
      {title}
    </div>
  );
};

const QueryMasterServerPlayers: FC<{ server: string; isAlive: boolean }> = ({
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
        <ul className='list-decimal list-inside overflow-y-auto max-h-96 p-3'>
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

const MasterServersTabs: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const servers = ['fleshas.lt:27010', 'masterserveris.audioklip.lt:27010'];

  const results = useQueries(
    servers.map((server) => ({
      queryKey: ['ms-server-list', server],
      queryFn: () =>
        fetch(process.env.apiUrl + '/api/vmsq/ping/' + server).then((res) => res.json())
    }))
  );

  return (
    <>
      <Tabs value={activeTab} onChange={(i) => setActiveTab(i)}>
        <Tab title='Visits by Country' />
        {servers.map((server, i) => (
          <Tab
            title={
              <TabTitle title={server} isAlive={results[i].data} isLoading={results[i].isLoading} />
            }
            key={server}
          />
        ))}
      </Tabs>
      <div className='flex flex-col lg:flex-row lg:space-x-4  mb-10'>
        <div className='basis-1/3 rounded'>
          <TabPanel value={activeTab} index={0}>
            <MasterServerVisitsByCountry />
          </TabPanel>
          {servers.map((server, i) => (
            <TabPanel value={activeTab} index={i + 1} key={server}>
              <QueryMasterServerPlayers server={server} isAlive={results[i].data} />
            </TabPanel>
          ))}
        </div>
        <div className='basis-2/3 pt-10 lg:pt-0'>
          <MasterServerVisitsChart />
        </div>
      </div>
    </>
  );
};

export default MasterServersTabs;
