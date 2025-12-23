import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import SeoMeta from '../components/Common/SeoMeta';
// import WhyUsContent from '../components/Common/WhyUs/WhyUsContent';
// import LazyLoadSection from '../components/Common/LazyLoadSection';
const WhyUsReviews = dynamic(() => import('../components/Common/WhyUs/WhyUsReviews'), { ssr: false });
const WhyUsContent = dynamic(() => import('../components/Common/WhyUs/WhyUsContent'), { ssr: false });
const Footer = dynamic(() => import('../components/Common/Footer'), { ssr: false });

export default function WhyUs() {
    return (
        <>
            <SeoMeta 
                title="Why Choose Us | Alpha One Motors" 
                description="Why choose Alpha One Motors - We Know Luxury Automotive. 5000+ customers served, 4.7 Google rating, 193 reviews."
            />
            <Header />

            <section 
                className="common-banner-wrap d-flex align-items-center"
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                <Image 
                    src={getImages('about-hero.webp')} 
                    alt="Why Choose Us" 
                    fill
                    priority 
                    fetchPriority="high"
                    sizes="100vw"
                    quality={30}
                    style={{ objectFit: 'cover', zIndex: -1 }}
                    placeholder="blur"
                    blurDataURL={getImages('about-hero.webp?quality=5')}
                />
                <div className="w-100" style={{ zIndex: 1 }}>
                    <div className=" xl-title text-uppercase text-center font-80 letter-spacing-3">
                        Why Choose Us
                    </div>
                    <div className=" lg-title font-40 text-uppercase text-center fw-300 mt-3">
                        We Know Luxury Automotive
                    </div>
                    <div className=" text-center mt-5">
                        <Link href="/sell-my-exotic" prefetch={false} className="black-btn get-started-btn w-240 text-uppercase">
                            GET My Cash Offer
                        </Link>
                    </div>
                </div>
            </section>
            <main role="main">
                <WhyUsContent />
                <WhyUsReviews />
            </main>

            <Footer />
        </>
    );
}
