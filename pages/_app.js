import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { VehicleContextProvider } from '../context/VehicleContext';
import '@/styles/globals.css';
 
export default function App({ Component, pageProps }) {
  return (
    <VehicleContextProvider initialData={pageProps.initialData}>
      <Component {...pageProps} />
    </VehicleContextProvider>
  );
}
