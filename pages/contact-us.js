import Image from 'next/image';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';
import ContactForm from '../components/Common/ContactForm';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactUs() {
    const { ref: heroRef, inView: heroInView } = useScrollReveal();
    const { ref: formRef, inView: formInView } = useScrollReveal();
    const { ref: infoRef, inView: infoInView } = useScrollReveal();

    return (
        <>
            <SeoMeta 
                title="Contact Us | Alpha One Motors" 
                description="Get in touch with Alpha One Motors. Austin office: 512-777-1240. Located at 8140 N. Mopac Suite 4-150 Austin, TX 78759"
            />
            <Header />

            <section 
                className="contact-wrap"
                style={{
                    backgroundImage: `url(/images/contact-hero.webp)`
                }}
            >
                <div className="container">
                    <div 
                        ref={heroRef}
                        className={`xl-title contact-title1 text-start uppercase letter-spacing-3 mb-3 transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        Contact Us
                    </div>
                    <div className={`xs-title contact-title2 uppercase eurostile font-light font-1-4em letter-spacing-1 mb-md-5 mb-4 pb-md-4 transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Drop us a line, we&apos;d love to hear from you
                    </div>
                    <div className="row mlr-50">
                        <div 
                            ref={formRef}
                            className={`col-md-6 order-md-2 transition-all duration-700 ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <ContactForm />
                        </div>
                        <div className="col-md-6">
                            <div 
                                ref={infoRef}
                                className={`contact-black-box transition-all duration-700 ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            >
                                <div className="xs-title font-1-4em eurostile font-bold mb-4">AUSTIN OFFICE</div>
                                <div className="flex items-center mb-4">
                                    <div className="cb-icon">
                                        <Image src="/images/local-phone-material.png" alt="phone" width={24} height={24} />
                                    </div>
                                    <div className="xs-title font-1-1em eurostile font-bold">512-777-1240</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="cb-icon">
                                        <Image src="/images/contact-location-icon.svg" alt="location" width={24} height={24} />
                                    </div>
                                    <div className="xs-title font-normal">8140 N. Mopac Suite 4-150 Austin, TX 78759</div>
                                </div>
                            </div>
                            <div className={`transition-all duration-700 delay-300 ${infoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <iframe 
                                    src="https://snazzymaps.com/embed/744745" 
                                    width="100%" 
                                    height="380px" 
                                    style={{ border: 'none' }}
                                    title="Alpha One Motors Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
