import { ServerList } from '../../components/cs-boost/ServerList';

export default function Page() {
  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>CS Boost</h2>
      <div className='flex flex-col lg:flex-row mb-5 justify-end'>
        <a
          href={process.env.basePath + '/cs-boost' + '/add'}
          className='inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
        >
          Add server
        </a>
      </div>
      <ServerList />
    </>
  );
}
