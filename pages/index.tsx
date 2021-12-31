import MasterServerVisitsByCountry from '../components/masterServerAnalytics/VisitsByCountry';
import MasterServerVisitsChart from '../components/masterServerAnalytics/VisitsChart';
import DownloadsByWebsite from '../components/DownloadsByWebsite';
import DownloadsByDay from '../components/DownloadsByDay';
import GoogleAnalyticsTraffic from '../components/GoogleAnalyticsTraffic';

export default function Home() {
  return (
    <>
      <h2 className='text-3xl pt-10 pb-2'>CS 1.6 Downloads</h2>
      <div className='flex flex-col lg:flex-row lg:space-x-4 '>
        <div className='basis-1/3 rounded-lg'>
          <DownloadsByDay />
        </div>
        <div className='basis-2/3 rounded-lg'>
          <DownloadsByWebsite />
        </div>
      </div>
      <h2 className='text-3xl pt-10 pb-2'>Master Server</h2>
      <div className='flex flex-col lg:flex-row lg:space-x-4  mb-10'>
        <div className='basis-1/3 rounded'>
          <MasterServerVisitsByCountry />
        </div>
        <div className='basis-2/3 rounded'>
          <MasterServerVisitsChart />
        </div>
      </div>
      <h2 className='text-3xl pt-10 pb-2'>Google Analytics</h2>
      <div className='flex flex-col lg:flex-row lg:space-x-4  mb-10'>
        <div className='basis-1/3 rounded'>
          <GoogleAnalyticsTraffic target='http://counterstrike16download.net' />
        </div>
        <div className='basis-1/3 rounded'>
          <GoogleAnalyticsTraffic target='https://fleshas.lt' />
        </div>
        <div className='basis-1/3  rounded-lg'>
          <GoogleAnalyticsTraffic target='http://counter-strike-download.lt' />
        </div>
      </div>
    </>
  );
}
