import { useQuery } from 'react-query';
import { ServerList } from '../../components/cs-boost/ServerList';
import Card from '../../components/Card';
import { FC } from 'react';

const RevenueAmount: FC<{ amount: number; isLoading: boolean }> = ({ amount, isLoading }) => (
  <div className='text-md font-bold px-5 pb-5 text-blue-600'>
    €{' '}
    {isLoading ? (
      <img className='h-3 w-3 mr-1 animate-spin' src={require('../../images/loading.svg')} />
    ) : (
      amount / 100
    )}{' '}
    EUR.
  </div>
);

export default function Page() {
  const { isLoading, error, data } = useQuery<
    { current_month: number; current_year: number },
    Error
  >(['ms-revenue'], () =>
    fetch(process.env.apiUrl + '/php/api/servers/control/ms_revenue.php').then((res) => res.json())
  );
  return (
    <>
      {error ? null : (
        <>
          <h2 className='text-3xl  pt-10 pb-2'>Revenue</h2>
          <div className='flex  space-x-4 pt-5 max-w-md'>
            <Card title="This Month's revenue" className='flex-1'>
              <RevenueAmount amount={data?.current_month} isLoading={isLoading} />
            </Card>

            <Card title="This Year's revenue" className='flex-1'>
              <RevenueAmount amount={data?.current_year} isLoading={isLoading} />
            </Card>
          </div>
        </>
      )}

      <h2 className='text-3xl pt-5 pb-2'>Boosted servers list</h2>
      <div className='flex flex-col md:flex-row mb-5 justify-end'>
        <a
          href={process.env.basePath + '/cs-boost' + '/add'}
          className='px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out text-center'
        >
          Add server
        </a>
      </div>
      <ServerList />
    </>
  );
}
