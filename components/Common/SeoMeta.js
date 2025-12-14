import Head from 'next/head';

export default function SeoMeta({ title, description, ogUrl, ogImage }) {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="preconnect" href="https://inventory.dealersocket.com" />
            <link rel="dns-prefetch" href="https://inventory.dealersocket.com" />
            <link rel="preconnect" href="https://s3-us-west-2.amazonaws.com" />
            <link rel="dns-prefetch" href="https://s3-us-west-2.amazonaws.com" />
            <link rel="preconnect" href="https://alphaone.greenlightautomotivesolutions.com" />
            <link rel="dns-prefetch" href="https://alphaone.greenlightautomotivesolutions.com" />
            <link rel="preconnect" href="https://pictures.dealer.com" />
            <link rel="dns-prefetch" href="https://pictures.dealer.com" />
            <title>{title || "Alpha One Motors | Exotic Cars For Sale"}</title>
            <meta name="description" content={description || "Exotic cars for sale at Alpha One Motors"} />
            <meta property="og:title" content={title || "Alpha One Motors"} />
            <meta property="og:description" content={description || "Exotic cars for sale"} />
            {ogUrl && <meta property="og:url" content={ogUrl} />}
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:type" content="website" />
        </Head>
    );
}
