import DownloadsByWebsite from '../components/DownloadsByWebsite';
import DownloadsByDay from '../components/DownloadsByDay';
import GoogleAnalyticsTraffic from '../components/GoogleAnalyticsTraffic';
import MasterServersTabs from '../components/MasterServersTabs';

export default function Home() {
  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>CS 1.6 Downloads</h2>
      <div className='flex flex-col lg:flex-row lg:space-x-4 '>
        <div className='basis-1/3'>
          <DownloadsByDay />
        </div>
        <div className='basis-2/3 pt-10 lg:pt-0'>
          <DownloadsByWebsite />
        </div>
      </div>
      <h2 className='text-3xl pt-10 pb-2'>Master Server</h2>
      <MasterServersTabs />
      <h2 className='text-3xl pt-10 pb-2'>Google Analytics</h2>
      <div className='flex flex-col lg:flex-row lg:space-x-4  mb-10'>
        <div className='basis-1/3'>
          <GoogleAnalyticsTraffic target='http://counterstrike16download.net' />
        </div>
        <div className='basis-1/3 pt-10 lg:pt-0'>
          <GoogleAnalyticsTraffic target='https://fleshas.lt' />
        </div>
        <div className='basis-1/3 pt-10 lg:pt-0'>
          <GoogleAnalyticsTraffic target='http://counter-strike-download.lt' />
        </div>
      </div>
    </>
  );
}
