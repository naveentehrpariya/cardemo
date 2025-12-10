import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css';
import '@/styles/animate.css';
import '@/styles/globals.css';
import { VehicleContextProvider } from '../context/VehicleContext';
 
export default function App({ Component, pageProps }) {
  return (
    <VehicleContextProvider>
      <Component {...pageProps} />
    </VehicleContextProvider>
  );
}
