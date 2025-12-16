import '../public/bootstrap.min.css';
import '@/styles/utilities.css';
import '@/styles/react-styles.css';
import '@/styles/responsive.css';
import '@/styles/animate.css';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { VehicleContextProvider } from '../context/VehicleContext';
import '@/styles/globals.css';
 
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const ioRef = useRef(null);
  const moRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const teardown = () => {
      if (ioRef.current) ioRef.current.disconnect();
      if (moRef.current) moRef.current.disconnect();
      ioRef.current = null;
      moRef.current = null;
    };

    const ensureHidden = () => {
      const els = Array.from(document.querySelectorAll('.wow'));
      els.forEach((el) => { el.style.visibility = 'hidden'; });
    };

    const initObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const delay = el.getAttribute('data-wow-delay') || '';
          const duration = el.getAttribute('data-wow-duration') || '';
          if (entry.isIntersecting) {
            el.style.visibility = 'visible';
            el.classList.add('animated');
            if (delay) el.style.animationDelay = delay;
            if (duration) el.style.animationDuration = duration;
          } else {
            el.classList.remove('animated');
            el.style.visibility = 'hidden';
            el.style.animationDelay = '';
            el.style.animationDuration = '';
          }
        });
      }, { threshold: 0.2 });
      ioRef.current = observer;
      const els = Array.from(document.querySelectorAll('.wow'));
      els.forEach((el) => observer.observe(el));
    };

    const initMutationObserver = () => {
      const mo = new MutationObserver(() => {
        if (!ioRef.current) return;
        const els = Array.from(document.querySelectorAll('.wow'));
        els.forEach((el) => ioRef.current.observe(el));
      });
      mo.observe(document.body, { childList: true, subtree: true });
      moRef.current = mo;
    };

    ensureHidden();
    initObserver();
    initMutationObserver();

    const handleRoute = () => {
      teardown();
      ensureHidden();
      initObserver();
      initMutationObserver();
    };
    router.events.on('routeChangeComplete', handleRoute);

    return () => {
      router.events.off('routeChangeComplete', handleRoute);
      teardown();
    };
  }, [router.events]);
  return (
    <VehicleContextProvider>
      <Component {...pageProps} />
    </VehicleContextProvider>
  );
}
