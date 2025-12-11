import '../public/bootstrap.min.css';
import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css';
import '@/styles/animate.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { VehicleContextProvider } from '../context/VehicleContext';
import '@/styles/globals.css';
 
export default function App({ Component, pageProps }) {
  return (
    <VehicleContextProvider>
      <Component {...pageProps} />
    </VehicleContextProvider>
  );
}
