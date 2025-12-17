import Head from 'next/head';

export default function SeoMeta({ title, description, ogUrl, ogImage }) {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
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
