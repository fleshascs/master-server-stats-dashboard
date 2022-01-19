import clsx from 'clsx';
import { Children, FC, ReactChild, ReactChildren, ReactElement, ReactNode, useState } from 'react';

const TabWrapper: FC<{ tab: ReactNode; active?: boolean; onClick: () => void }> = ({
  tab,
  active,
  onClick
}) => {
  return (
    <li className='nav-item' role='presentation'>
      <a
        // href='#tabs-home3'
        className={clsx(
          'nav-link w-full block font-medium text-xs leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:bg-gray-100',
          { 'active border-b-2 border-blue-500 text-blue-500': active }
        )}
        onClick={onClick}
        // id='tabs-home-tab3'
        // data-bs-toggle='pill'
        // data-bs-target='#tabs-home3'
        role='tab'
        // aria-controls='tabs-home3'
        aria-selected={active ? 'true' : 'false'}
      >
        {tab}
      </a>
    </li>
  );
};

export const Tab: FC<{ title: string | ReactNode }> = ({ title }) => {
  return <span>{title}</span>;
};

export const Tabs: FC<{
  children: ReactNode[];
  value: number;
  onChange: (index: number) => void;
}> = ({ children, value, onChange }) => {
  return (
    <>
      <ul
        className='nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4'
        role='tablist'
      >
        {Children.map(children, (child, i) => (
          <TabWrapper tab={child} active={i === value} onClick={() => onChange(i)} key={i} />
        ))}
      </ul>
    </>
  );
};

export const TabPanel: FC<{ children: any; value: number; index: number }> = ({
  children,
  value,
  index
}) => {
  if (value !== index) return null;
  // return null;
  return children;
};
