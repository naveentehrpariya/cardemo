import '../public/bootstrap.min.css';
import '@/styles/animate.css';
import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css';
import { useEffect, useRef } from 'react';
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
