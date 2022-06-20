import { FC, ReactNode } from 'react';
import clsx from 'clsx';

const Card: FC<{ children: ReactNode; title: ReactNode; className?: string }> = ({
  children,
  title,
  className
}) => {
  return (
    <div
      className={clsx(
        className,
        'not-prose bg-gray-50 border border-black/5 overflow-hidden dark:bg-gray-800/25'
      )}
    >
      <div
        // style='background-position:10px 10px'
        className='inset-0 bg-grid-gray-100 p-2 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-gray-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]'
      >
        {title}
      </div>
      <div className='rounded-xl'>
        <div className='mt-8'>{children}</div>
      </div>
    </div>
  );
};
export default Card;
