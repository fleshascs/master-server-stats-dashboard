import { FC } from 'react';
import Card from '../Card';
import { useQuery } from 'react-query';
import { Table, Td, Th } from '../table';

type CountryStats = {
  iso: string;
  amount: number;
  amountPrev: number;
  country: string;
};

const MasterServerVisits: FC = () => {
  const { isLoading, error, data } = useQuery<CountryStats[], Error>('analytics', () =>
    fetch('https://fleshas.lt/php/analytics/test9-2.php').then((res) => res.json())
  );

  const title = 'Master Server visits by country';

  if (isLoading) return <Card title={title}>Loading...</Card>;
  if (error) return <Card title={title}>An error has occurred</Card>;

  const { totalVisits, totalVisitsPrev } = data.reduce(
    (totals, item) => {
      totals.totalVisits += Number(item.amount);
      totals.totalVisitsPrev += Number(item.amountPrev);
      return totals;
    },
    { totalVisits: 0, totalVisitsPrev: 0 }
  );

  return (
    <Card title={title}>
      <div className='overflow-y-auto max-h-96'>
        <Table>
          <thead>
            <tr>
              <Th>Country</Th>
              <Th>Yesterday</Th>
              <Th>-2d.</Th>
            </tr>
          </thead>

          <tbody className='bg-white dark:bg-gray-800'>
            <tr className='border-b-2 border-dashed border-gray-300'>
              <Td>Total</Td>
              <Td>
                <span
                  className={totalVisits > totalVisitsPrev ? 'text-lime-500 font-bold' : undefined}
                >
                  {totalVisits}
                </span>
              </Td>
              <Td>{totalVisitsPrev}</Td>
            </tr>
            {data.map((item) => (
              <tr key={item.iso}>
                <Td>
                  <img
                    className='inline pr-2'
                    src={`https://fleshas.lt/amxbans/templates/_gfx/country/${item.iso.toLowerCase()}.png`}
                  />
                  {item.country}
                </Td>
                <Td>{item.amount}</Td>
                <Td>{item.amountPrev}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default MasterServerVisits;
