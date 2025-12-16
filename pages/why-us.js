import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';

const WhyUsReviews = dynamic(() => import('../components/Common/WhyUs/WhyUsReviews'), { ssr: false });

export default function WhyUs() {
    return (
        <>
            <Head>
                <link rel="preload" as="image" href={getImages('about-hero.webp')} />
            </Head>
            <SeoMeta 
                title="Why Choose Us | Alpha One Motors" 
                description="Why choose Alpha One Motors - We Know Luxury Automotive. 5000+ customers served, 4.7 Google rating, 193 reviews."
            />
            <Header />

            <section 
                className="common-banner-wrap d-flex align-items-center"
                style={{
                    backgroundImage: `url(${getImages('about-hero.webp')})`
                }}
            >
                <Image src={getImages('about-hero.webp')} alt="" width={1600} height={900} sizes="100vw" priority style={{display: 'none'}} />
                <div className="w-100">
                    <div className="xl-title text-uppercase text-center font-80 letter-spacing-3 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                        Why Choose Us
                    </div>
                    <div className="lg-title font-40 text-uppercase text-center fw-300 mt-3 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                        We Know Luxury Automotive
                    </div>
                    <div className="text-center mt-5">
                        <Link href="/sell-my-exotic" prefetch={false} className="black-btn get-started-btn w-240 text-uppercase">
                            GET My Cash Offer
                        </Link>
                    </div>
                </div>
            </section>
            <main role="main">
            <section className="about-info-wrap cv-auto">
                <div className="container">
                    <div className="d-md-flex align-items-center justify-content-between">
                        <div className="aiw-col wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s">
                            <div className="d-inline-flex align-items-center">
                                <div className="xl-title text-uppercase pe-3">+5k</div>
                                <div className="sm-title fw-500">Customers Served</div>
                            </div>
                        </div>
                        <div className="aiw-sep d-none d-md-block"></div>
                        <div className="aiw-col wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s">
                            <div className="d-inline-flex align-items-center">
                                <div className="xl-title text-uppercase pe-3">4.7</div>
                                <div className="sm-title fw-500">Google Rating</div>
                            </div>
                        </div>
                        <div className="aiw-sep d-none d-md-block"></div>
                        <div className="aiw-col wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                            <div className="d-inline-flex align-items-center">
                                <div className="xl-title text-uppercase pe-3">193</div>
                                <div className="sm-title fw-500">Google Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-wrap cv-auto">
                <div className="d-lg-flex align-items-center">
                    <div className="aw-left w-50 wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.1s">
                        <Image src={getImages('about-side-bg.webp')} alt="Alpha One Motors" width={1200} height={800} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="aw-right w-50 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.2s">
                        <div className="mxw-560">
                            <div className="lg-title text-uppercase mb-lg-4 mb-3">We Know Luxury Automotive!</div>
                            <div className="common-text">
                                <p>Alpha One Motors is redefining the luxury automotive experience. We now focus on acquiring the finest exotic and luxury vehicles directly from private owners, ensuring a seamless, trusted selling process. For buyers, we offer a highly curated, exclusive inventory — hand-selected to represent only the best in class. Fewer cars. Higher standards. A sharper focus on excellence.</p>

                                <p>We specialize in high-end brands like Porsche, BMW, Ferrari, Lamborghini, McLaren, Aston Martin, Rolls Royce, Maserati, Mercedes, Bentley, Range Rover, and other sports cars or supercars. We&apos;ve all worked for top franchise dealerships at the ultra-highline level, with over 25 years of experience each. As a leading Texas exotic car dealership, we deliver precise luxury car valuations with extreme accuracy.</p>

                                <p>Everyone knows how to buy their next car. But almost nobody knows how to sell exotic cars, especially luxury vehicles in Texas!</p>

                                <p>Typical options for selling your exotic car include private party sales or dealer consignment in showrooms. These work if you have time to waste on buyers just seeking test drives. If there&apos;s a payoff or the buyer needs financing, it&apos;s a whole other hassle. For details, check our Complete Guide to Selling Your Exotic Car in Texas.</p>

                                <p>Selling outright to dealers often means lowball offers, as their focus is upselling new inventory. Or they&apos;ll consign, list on AutoTrader for risk-free profits on your luxury car, netting you the same as our initial top cash offer!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-lg-flex align-items-center reverse-block">
                    <div className="aw-left w-50 order-2 wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.1s">
                        <Image src={getImages('about-side-bg2.webp')} alt="Sell Your Exotic" width={1200} height={800} sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="aw-right w-50 wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
                        <div className="mxw-560">
                            <div className="lg-title text-uppercase mb-lg-4 mb-3">Ready to Sell Your Exotic Car?</div>
                            <div className="common-text">
                                <p>Trust Alpha One Motors for Top Value. In today&apos;s luxury car market, savvy sellers know to check a vehicle&apos;s history with Carfax. So why settle for less than the best offer when trading in your exotic car? At Alpha One Motors, we specialize in high-end vehicles, ensuring you get the maximum value for your sale.</p>

                                <p>The exotic car market in Texas fluctuates like stocks, with prices shifting daily due to supply and demand. When buying a luxury car, waiting might lower the price. But when selling, every day you delay could mean a drop in your car&apos;s value. Acting fast is key to securing the best deal.</p>

                                <p>We urge our clients to compare offers. Call five other exotic car dealers or buyers in Texas and ask for their immediate cash offer. Then, contact Alpha One Motors. We&apos;re confident our offer will surpass the rest. Our process is seamless—sell your car, and we&apos;ll buy it, often in under 24 hours, including leased vehicles. Experience the smoothest, most rewarding car sale with Alpha One Motors, your trusted Texas exotic car dealership.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <WhyUsReviews />
            </main>

            <Footer />
        </>
    );
}
