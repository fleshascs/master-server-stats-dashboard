import clsx from 'clsx';
import { FC, useState } from 'react';

export const AddServerInput: FC<{ onAdd: (server: string) => void }> = ({ onAdd }) => {
  const [value, setValue] = useState('');
  return (
    <div className='flex max-h-8 my-3'>
      <input
        className={clsx(
          'appearance-none border-dotted border-2 border-grey-600  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ',
          { 'border-r-0': !!value }
        )}
        type='text'
        placeholder='Server IP'
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        type='button'
        className={clsx(
          'inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight hover:bg-gray-300 focus:bg-gray-300  focus:outline-none focus:ring-0 active:bg-gray-400  transition duration-150 ease-in-out',
          { hidden: !value }
        )}
        onClick={() => {
          onAdd(value);
          setValue('');
        }}
      >
        Add
      </button>
    </div>
  );
};
