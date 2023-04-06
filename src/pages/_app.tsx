import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Layout } from '../components/Layout';
import { LoadingSpin } from '../components/Loading';
import { AuthProvider } from '../contexts/AuthContex';
import { ScoreboardProvider } from '../contexts/ScoreboardContext';
import { api } from '../services/axios';
const fetcher = async (url: string) => {
  if (url.includes('undefined')) return;

  return await api(url).then((res) => res.data);
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ScoreboardProvider>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <ToastContainer theme="dark" />
          <Layout>
            <Suspense fallback={<LoadingSpin />}>
              <Component {...pageProps} />
            </Suspense>
          </Layout>
        </SWRConfig>
      </ScoreboardProvider>
    </AuthProvider>
  );
}

export default MyApp;
