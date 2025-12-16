import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import WowElement from '@/components/Common/WowElement';

const AboutContent = dynamic(() => import('../components/Common/AboutUs/AboutContent'), { ssr: false });

export default function AboutUs() {
    return (
        <>
            <SeoMeta 
                title="About Us | Alpha One Motors" 
                description="Alpha One Motors - We Know Luxury Automotive. Leading Texas exotic car dealership with over 25 years of experience."
            />
            <Header />

            <section 
                className="common-banner-wrap d-flex align-items-center"
                style={{
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Image 
                    src={getImages('new-about-hero.webp')} 
                    alt="About Us" 
                    fill 
                    priority 
                    sizes="100vw"
                    style={{objectFit: 'cover', zIndex: -1}} 
                />
                <div className="w-100" style={{ zIndex: 1 }}>
                    <div className="xl-title text-uppercase text-center font-80 letter-spacing-3">
                        About Us
                    </div>
                    <WowElement className="lg-title font-40 text-uppercase text-center fw-300 mt-3 wow fadeIn" duration="1s" delay="0.2s">
                        Passion for Exotic Cars
                    </WowElement>
                </div>
            </section>

            <div style={{ minHeight: '500px' }}>
                <AboutContent />
            </div>

            <Footer />
        </>
    );
}
