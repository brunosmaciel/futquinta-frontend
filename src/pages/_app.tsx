import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { Layout } from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContex';
import { api } from '../services/axios';
const fetcher = (url: string) => api(url).then((res) => res.data);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </AuthProvider>
  );
}

export default MyApp;
