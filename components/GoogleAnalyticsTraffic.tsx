import { FC } from 'react';
import Card from './Card';
import { useQuery } from 'react-query';
import { Table, Td, Th } from './table';
import { FilterLink } from './FilterButton';
import clsx from 'clsx';

type StatsByWebsite = {
  'ga:country': string;
  'ga:countryIsoCode': string;
  sessions: string;
  sessions2: string;
};

function calculateIncrease(startingValue: number, finalValue: number) {
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

const GoogleAnalyticsTraffic: FC<{ target: string }> = ({ target }) => {
  const { isLoading, error, data } = useQuery<StatsByWebsite[], Error>(
    ['google-analytics-traffic', target],
    () =>
      fetch('https://fleshas.lt/php/analytics/googleAnalyticsByTarget.php?target=' + target).then(
        async (res) => res.json()
      )
  );

  const title = 'Unique visitors';

  if (isLoading) return <Card title={title}>Loading...</Card>;
  if (error) return <Card title={title}>An error has occurred</Card>;

  const { totalVisits, totalVisitsPrev } = data.reduce(
    (totals, item) => {
      totals.totalVisits += Number(item.sessions ?? 0);
      totals.totalVisitsPrev += Number(item.sessions2 ?? 0);
      return totals;
    },
    { totalVisits: 0, totalVisitsPrev: 0 }
  );

  const totalIncrease = calculateIncrease(Number(totalVisitsPrev ?? 0), Number(totalVisits ?? 0));

  return (
    <Card title={title}>
      <div className='px-2 pb-8'>
        <FilterLink title={target} href={target} />
      </div>
      <div className='overflow-y-auto max-h-96'>
        <Table>
          <thead>
            <tr>
              <Th>Country</Th>
              <Th>1st week (last 7 days)</Th>
              <Th>2nd week</Th>
              <Th>increase</Th>
            </tr>
          </thead>

          <tbody className='bg-white dark:bg-gray-800'>
            <tr className='border-b-2 border-dashed border-gray-300'>
              <Td>Total</Td>
              <Td className={totalVisits > totalVisitsPrev && 'text-lime-500 font-bold'}>
                {totalVisits}
              </Td>
              <Td>{totalVisitsPrev}</Td>
              <Td>
                <span
                  className={clsx(
                    'font-bold',
                    totalIncrease > 0 ? 'text-lime-500' : 'text-red-500'
                  )}
                >
                  {totalIncrease}%
                </span>
              </Td>
            </tr>
            {data.map((item) => {
              const increase = calculateIncrease(
                Number(item.sessions2 ?? 0),
                Number(item.sessions ?? 0)
              );
              return (
                <tr key={item['ga:countryIsoCode']}>
                  <Td>
                    <img
                      className='inline pr-2'
                      src={`https://fleshas.lt/amxbans/templates/_gfx/country/${item[
                        'ga:countryIsoCode'
                      ].toLowerCase()}.png`}
                    />
                    {item['ga:country']}
                  </Td>
                  <Td>{item.sessions ?? 0}</Td>
                  <Td>{item.sessions2 ?? 0}</Td>
                  <Td>
                    <span
                      className={clsx('font-bold', increase > 0 ? 'text-lime-500' : 'text-red-500')}
                    >
                      {increase}%
                    </span>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default GoogleAnalyticsTraffic;
