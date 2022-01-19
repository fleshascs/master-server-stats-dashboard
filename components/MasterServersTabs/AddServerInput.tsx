import { FC, useRef } from 'react';

export const AddServerInput: FC<{ onAdd: (server: string) => void }> = ({ onAdd }) => {
  const inputRef = useRef(null);
  return (
    <div className='flex max-h-8 my-3'>
      <input
        className='appearance-none border-dotted border-2 border-grey-600  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-r-0'
        type='text'
        placeholder='Server IP'
        ref={inputRef}
      />
      <button
        type='button'
        className='inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight hover:bg-gray-300 focus:bg-gray-300  focus:outline-none focus:ring-0 active:bg-gray-400  transition duration-150 ease-in-out'
        onClick={() => {
          onAdd(inputRef.current.value);
          inputRef.current.value = '';
        }}
      >
        Add
      </button>
    </div>
  );
};
