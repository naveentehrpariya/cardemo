import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';
import Image from 'next/image';
import dynamic from 'next/dynamic';

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
                    backgroundImage: `url(${getImages('new-about-hero.webp')})`
                }}
            >
                <Image src={getImages('new-about-hero.webp')} alt="" width={1600} height={900} sizes="100vw" priority style={{display: 'none'}} />
                <div className="w-100">
                    <div className="xl-title text-uppercase text-center font-80 letter-spacing-3 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        About Us
                    </div>
                    <div className="lg-title font-40 text-uppercase text-center fw-300 mt-3 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        Passion for Exotic Cars
                    </div>
                </div>
            </section>

            <AboutContent />

            <Footer />
        </>
    );
}
