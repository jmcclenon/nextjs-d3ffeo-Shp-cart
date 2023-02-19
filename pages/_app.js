import { Provider } from 'next-auth/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
