import '../public/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/animate.css';
import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { VehicleContextProvider } from '../context/VehicleContext';
import '@/styles/globals.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});
 
export default function App({ Component, pageProps }) {
  return (
    <div className={lato.variable}>
      <VehicleContextProvider initialData={pageProps.initialData}>
        <Component {...pageProps} />
      </VehicleContextProvider>
    </div>
  );
}
