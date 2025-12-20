import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import SeoMeta from '../components/Common/SeoMeta';
import Image from 'next/image';
import dynamic from 'next/dynamic';
// import AboutContent from '../components/Common/AboutUs/AboutContent';

const AboutContent = dynamic(() => import('../components/Common/AboutUs/AboutContent'), { ssr: false });
const Footer = dynamic(() => import('../components/Common/Footer'), { ssr: false });
export default function AboutUs() {
    return (
        <>
            <SeoMeta 
                title="About Us | Alpha One Motors" 
                description="Alpha One Motors - We Know Luxury Automotive. Leading Texas exotic car dealership with over 25 years of experience."
            />
            <Header />

            <section className="common-banner-wrap d-flex align-items-center" style={{position: 'relative', overflow: 'hidden'}}  >
                <Image 
                    src={getImages('new-about-hero.webp')} 
                    alt="About Us" 
                    fill 
                    priority 
                    fetchPriority="high"
                    loading="eager"
                    quality={50}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRhIAAABXRUJQVlA4IAYAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
                    style={{objectFit: 'cover', zIndex: -1}} 
                />
                <div className="w-100" style={{ zIndex: 1 }}>
                    <div className="xl-title text-uppercase text-center font-80 letter-spacing-3">
                        About Us
                    </div>
                    <div className="lg-title font-40 text-uppercase text-center fw-300 mt-3">
                        Passion for Exotic Cars
                    </div>
                </div>
            </section>

            <div style={{ minHeight: '500px' }}>
                <AboutContent />
            </div>

            <Footer />
        </>
    );
}
