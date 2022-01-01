import { FC, useState } from 'react';
import clsx from 'clsx';
import Card from './Card';
import { useQuery } from 'react-query';
import { Table, Td, Th } from './table';
import styles from './table/table.module.css';
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
      {targetDomain ? (
        <div className='px-2 pb-8'>
          <FilterButton title={targetDomain} onClick={() => setTargetDomain('')} />
        </div>
      ) : null}
      <div className='overflow-y-auto max-h-64'>
        <Table>
          <thead>
            <tr>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>Url</span>
              </Th>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>Today</span>
              </Th>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>Yesterday</span>
              </Th>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>1st month</span>
              </Th>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>2nd month</span>
              </Th>
              <Th className={clsx('align-bottom', styles.responsiveth)}>
                <span>Increase</span>
              </Th>
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

                      <FilterIcon className='h-4 w-4 ml-4 invisible group-hover:visible inline' />
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
