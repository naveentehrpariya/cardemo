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

  return (
    <Html lang="en" className="font-helvetica">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Alpha One Motors - Sell Your Exotic Vehicles. We offer competitive prices for Ferrari, Lamborghini, Porsche, Lexus, BMW, Mercedes-Benz and Audi in San Antonio & Austin area."
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Inline critical CSS for instant rendering */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://alphaone.greenlightautomotivesolutions.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/images/banner-image.webp" />
        <link rel="preload" as="style" href="/bootstrap.min.css" />
        <link rel="preload" as="style" href="/fonts/lato/lato.css" />
        <link rel="preload" as="font" href="/fonts/HelveticaNeue-Medium.woff2" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="/fonts/EurostileRegular.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Self-hosted Bootstrap CSS - Faster than CDN */}
        <link rel="stylesheet" href="/bootstrap.min.css" />
        
        {/* Self-hosted Lato fonts */}
        <link rel="stylesheet" href="/fonts/lato/lato.css" />
        
        {/* WOW.js for scroll animations - Load after page interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                var script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js';
                script.onload = function() {
                  if (typeof WOW !== 'undefined') {
                    new WOW({
                      boxClass: 'wow',
                      animateClass: 'animated',
                      offset: 0,
                      mobile: true,
                      live: true
                    }).init();
                  }
                };
                document.body.appendChild(script);
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
