import '../public/bootstrap.min.css';
import '@/styles/animate.css';
import '@/styles/globals.css';
import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css'; 
import { VehicleContextProvider } from '@/context/VehicleContext';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('wowjs').then((wowModule) => {
        const WOW = wowModule.WOW || wowModule.default?.WOW || window.WOW;
        if (WOW) {
          new WOW({
            live: true,
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
          }).init();
        }
      });
    }
  }, []);
  return (
    <VehicleContextProvider initialData={pageProps.initialData}>
      <Component {...pageProps} />
    </VehicleContextProvider>
  );
}
