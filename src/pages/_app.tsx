'use client';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Toaster } from 'react-hot-toast';

import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Layout } from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContex';
import { ScoreboardProvider } from '../contexts/ScoreboardContext';
import { ChoseTeamContextProvider } from '../hooks/useSelectPlayer';
import { api } from '../services/axios';
const fetcher = async (url: string) => {
  if (url.includes('undefined')) return;

  return await api(url).then((res) => res.data);
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          className: 'text-red-500',
          style: {
            background: '#064e3b',
            color: '#fff',
          },
          error: {
            style: {
              background: '#FC222D',
            },
          },
        }}
      />
      <AuthProvider>
        <ChoseTeamContextProvider>
          <ScoreboardProvider>
            <SWRConfig
              value={{
                fetcher,
              }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SWRConfig>
          </ScoreboardProvider>
        </ChoseTeamContextProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
