import '../styles/global.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='alternate' type='application/rss+xml' title='RSS 2.0' href='/feeds/feed.xml' />
        <link rel='alternate' type='application/atom+xml' title='Atom 1.0' href='/feeds/atom.xml' />
        <link rel='alternate' type='application/json' title='JSON Feed' href='/feeds/feed.json' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
