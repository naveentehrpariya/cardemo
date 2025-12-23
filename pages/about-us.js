import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import SeoMeta from '../components/Common/SeoMeta';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import AboutContent from '../components/Common/AboutUs/AboutContent';
// const AboutContent = dynamic(() => import('../components/Common/AboutUs/AboutContent'), { ssr: false });
const Footer = dynamic(() => import('../components/Common/Footer'), { ssr: false });
export default function AboutUs() {

    const [showFooter, setShowFooter] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
            setShowFooter(true);
            window.removeEventListener('scroll', handleScroll);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    quality={30}
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL="new-about-hero.webp?q=1"
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

            {/* <div style={{ minHeight: '500px' }}> */}
                <AboutContent />
            {/* </div> */}
        
            {showFooter && <Footer />}
        </>
    );
}
