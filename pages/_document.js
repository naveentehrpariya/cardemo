import { Html, Head, Main, NextScript } from 'next/document';
import fs from 'fs';
import path from 'path';

export default function Document() {
  // Read critical CSS at build time
  let criticalCSS = '';
  try {
    criticalCSS = fs.readFileSync(
      path.join(process.cwd(), 'styles', 'critical.css'),
      'utf8'
    );
  } catch (e) {
    console.error('Failed to load critical CSS:', e);
  }
  
  // Preload hero images based on common patterns
  const heroImages = [
    '/images/banner-image.webp',
    '/images/about-hero.webp',
    '/images/new-about-hero.webp'
  ];

  return (
    <Html lang="en" className="font-helvetica">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Alpha One Motors - Sell Your Exotic Vehicles. We offer competitive prices for Ferrari, Lamborghini, Porsche, Lexus, BMW, Mercedes-Benz and Audi in San Antonio & Austin area."
        />
        <link rel="apple-touch-icon" href="/images/alpha-one-logo.webp" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Inline critical CSS for instant rendering */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://alphaone.greenlightautomotivesolutions.com" />
        <link rel="preconnect" href="https://pictures.dealer.com" />
        <link rel="preconnect" href="https://inventory.dealersocket.com" />
        <link rel="dns-prefetch" href="https://cdninstagram.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        
        {/* Bootstrap CSS - Load with high priority but non-blocking */}
        <link rel="preload" href="/bootstrap.min.css" as="style" />
        <link rel="stylesheet" href="/bootstrap.min.css" />
        
        {/* Slick Carousel CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" media="print" onLoad="this.media='all'" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" media="print" onLoad="this.media='all'" />
        
        {/* Optimized Google Fonts - Load asynchronously */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/images/banner-image.webp" fetchpriority="high" />
        <link rel="preload" as="font" href="/fonts/HelveticaNeue-Medium.woff2" type="font/woff2" crossOrigin="anonymous" fetchpriority="high" />
        <link rel="preload" as="font" href="/fonts/EurostileRegular.woff2" type="font/woff2" crossOrigin="anonymous" fetchpriority="high" />
        
        {/* Preload CSS for faster parsing */}
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
        
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
