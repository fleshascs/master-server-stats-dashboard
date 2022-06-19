import '../styles/global.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import CustomSnackbar from '../components/Snackbar/CustomSnackbar';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='alternate' type='application/rss+xml' title='RSS 2.0' href='/feeds/feed.xml' />
        <link rel='alternate' type='application/atom+xml' title='Atom 1.0' href='/feeds/atom.xml' />
        <link rel='alternate' type='application/json' title='JSON Feed' href='/feeds/feed.json' />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            SnackbarProps={{ autoHideDuration: 4000 }}
            SnackbarComponent={CustomSnackbar}
          >
            <ConfirmProvider>
              <Layout>
                <StyledEngineProvider injectFirst>
                  <Component {...pageProps} />
                </StyledEngineProvider>
              </Layout>
            </ConfirmProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </>
  );
}
