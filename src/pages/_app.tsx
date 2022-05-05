import { Header } from 'components';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles';
import theme from 'styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @component Next.js root component
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='shortcut icon' href='/img/favicon-rocketshoes.png' />
        <link rel='apple-touch-icon' href='/img/favicon-rocketshoes.png' />
        <link rel='manifest' href='manifest.json' />
        <meta
          name='description'
          content='A small application developed with the aim of learning Zustand.'
        />
        <title>Rocketshoes</title>
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
