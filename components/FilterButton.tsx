import { FC } from 'react';
import { ExternalLinkIcon, XIcon } from '@heroicons/react/outline';

const FilterButton: FC<{ title: string; onClick?: () => void }> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
    >
      Target: {title} {onClick ? <XIcon className='h-3 w-3 inline' /> : null}
    </button>
  );
};

export const FilterLink: FC<{ title: string; href?: string }> = ({ title, href }) => {
  return (
    <a
      href={href}
      className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
    >
      Target: {title} {href ? <ExternalLinkIcon className='h-3 w-3 inline' /> : null}
    </a>
  );
};

export default FilterButton;
