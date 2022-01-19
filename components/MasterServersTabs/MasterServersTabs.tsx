import { FC, useState } from 'react';
import { Tab, TabPanel, Tabs } from '../Tabs';
import MasterServerVisitsByCountry from '../masterServerAnalytics/VisitsByCountry';
import MasterServerVisitsChart from '../masterServerAnalytics/VisitsChart';
import { useQueries } from 'react-query';
import { QueryMasterServerPlayers } from './QueryMasterServerPlayers';
import { Indicator } from '../Indicator';
import { AddServerInput } from './AddServerInput';

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

const serverList = [
  'fleshas.lt:27010',
  'masterserveris.audioklip.lt:27010',
  'masterserveris2.audioklip.lt:27011'
];

const MasterServersTabs: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [servers, setServers] = useState(serverList);

  const results = useQueries(
    servers.map((server) => ({
      queryKey: ['ms-server-list', server],
      queryFn: () =>
        fetch(process.env.apiUrl + '/api/vmsq/ping/' + server).then((res) => res.json())
    }))
  );

  return (
    <>
      <div className='flex'>
        <Tabs value={activeTab} onChange={(i) => setActiveTab(i)}>
          <Tab title='Visits by Country' />
          {servers.map((server, i) => (
            <Tab
              title={
                <TabTitle
                  title={server}
                  isAlive={results[i].data}
                  isLoading={results[i].isLoading}
                />
              }
              key={server}
            />
          ))}
        </Tabs>
        <AddServerInput onAdd={(s) => setServers((servers) => [...servers, s])} />
      </div>
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
