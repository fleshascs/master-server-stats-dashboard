import clsx from 'clsx';
import { FC } from 'react';

export const Indicator: FC<{ isAlive: boolean; isLoading: boolean }> = ({ isAlive, isLoading }) => {
  if (isLoading)
    return <img className='h-3 w-3 mr-1 animate-spin' src={require('../images/loading.svg')} />;
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
