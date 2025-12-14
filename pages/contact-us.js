import { useEffect } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';
import ContactForm from '../components/Common/ContactForm';
import { getImages } from '../components/Common/const';
import Image from 'next/image';

export default function ContactUs() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.WOW) {
            new window.WOW({ live: false }).init();
        }
    }, []);

    return (
        <>
            <SeoMeta 
                title="Contact Us | Alpha One Motors" 
                description="Get in touch with Alpha One Motors. Austin office: 512-777-1240. Located at 8140 N. Mopac Suite 4-150 Austin, TX 78759"
            />
            <Header />

            <section className='contact-wrap'
                style={{
                    backgroundImage: `url(${getImages('contact-hero.webp')})`
                }}
            >
                <div className='container'>
                    <div className='xl-title !text-3xl md:!text-5xl lg:!text-7xl contact-title1 text-start text-uppercase letter-spacing-3 mb-3'>Contact Us</div>
                    <div className='xs-title contact-title2 text-uppercase eurostile fw-300 font-1-4em letter-spacing-1 mb-md-5 mb-4 pb-md-4'>Drop us a line, we\'d love to hear from you</div>
                    <div className='row mlr-50'>
                        <div className='col-md-6 order-md-2'>
                            <ContactForm/>
                        </div>
                        <div className='col-md-6'>
                            <div className='contact-black-box'>
                                <div className='xs-title font-1-4em eurostile fw-bold mb-4'>AUSTIN OFFICE</div>
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='cb-icon'><Image src={getImages('local-phone-material.png')} alt='phone' width={24} height={24} /></div> 
                                    <div className='xs-title font-1-1em eurostile fw-bold'>512-777-1240</div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='cb-icon'><Image src={getImages('contact-location-icon.svg')} alt='location' width={24} height={24} /></div> 
                                    <div className='xs-title fw-400'>8140 N. Mopac Suite 4-150 Austin, TX 78759</div>
                                </div>
                            </div>
                            <div>
                                <iframe src="https://snazzymaps.com/embed/744745" width="100%" height="380px" style={{border:'none'}} title='Alpha One Motors Location' loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
