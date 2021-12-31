import { FC, useState } from 'react';
import clsx from 'clsx';
import Card from './Card';
import { useQuery } from 'react-query';
import { Table, Td, Th } from './table';
import { FilterIcon } from '@heroicons/react/outline';
import FilterButton from './FilterButton';

type StatsByWebsite = {
  domain: string;
  today: string;
  yesterday: string;
  last30days: string;
  last60days: string;
  increase: number;
};

const DownloadsByWebsite: FC = () => {
  const [targetDomain, setTargetDomain] = useState('');
  const { isLoading, error, data } = useQuery<StatsByWebsite[], Error>(
    ['downloads-by-website', targetDomain],
    () =>
      fetch(
        'https://fleshas.lt/php/api/csdownloads/downloadsByWebsite.php?target=' + targetDomain
      ).then(async (res) => res.json())
  );

  const title = 'CS 1.6 downloads by website';

  if (isLoading) return <Card title={title}>Loading...</Card>;
  if (error) return <Card title={title}>An error has occurred</Card>;

  return (
    <Card title={title}>
      <div className='px-2 pb-8'>
        {targetDomain ? (
          <FilterButton title={targetDomain} onClick={() => setTargetDomain('')} />
        ) : null}
      </div>
      <div className='overflow-y-auto max-h-64'>
        <Table>
          <thead>
            <tr>
              <Th>Url</Th>
              <Th>Today</Th>
              <Th>Yesterday</Th>
              <Th>1st month</Th>
              <Th>2nd month</Th>
              <Th>Increase</Th>
            </tr>
          </thead>

          <tbody className='bg-white dark:bg-gray-800'>
            {data.map((item) => (
              <tr key={item.domain}>
                <Td className='break-all'>
                  {targetDomain ? (
                    item.domain
                  ) : (
                    <a href='#' className='group' onClick={() => setTargetDomain(item.domain)}>
                      {item.domain}

                      <FilterIcon className='h-5 w-5 ml-4 invisible group-hover:visible inline' />
                    </a>
                  )}
                </Td>
                <Td>{item.today}</Td>
                <Td>{item.yesterday}</Td>
                <Td>{item.last30days}</Td>
                <Td>{item.last60days}</Td>
                <Td>
                  <span
                    className={clsx(
                      'font-bold',
                      item.increase > 0 ? 'text-lime-500' : 'text-red-500'
                    )}
                  >
                    {item.increase}%
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );
};

export default DownloadsByWebsite;