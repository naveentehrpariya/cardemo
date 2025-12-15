import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { getImages } from '@/components/Common/const';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import SeoMeta from '../components/Common/SeoMeta';

const reviewsList = [
    {
        name: "Eric Bramlett",
        date: "January 31, 2024",
        bgColor: "#512DA8",
        content: "When we started looking for a Landcruiser, I knew it wasn't going to be just another car purchase. A Landcruiser is a big deal, and I wanted to make sure we found one that was in great shape and from someone we could actually trust. That's what led us back to Alpha One. We've worked with them before—both buying and selling—and every single time they've been nothing but professional, straightforward, and easy to deal with. This time was no different.",
    },
    {
        name: "Alex Quintanar",
        date: "January 31, 2024",
        bgColor: "#E91E63",
        content: "I've grabbed a few exotic cars from Alpha One Motors over time, and every single visit has been awesome! Their team is super friendly and spot-on with customer service—they always nail exactly what I'm after without any hassle. Totally recommend them if you're hunting for some premium rides!",
    },
    {
        name: "Ali Bramlett",
        date: "January 31, 2024",
        bgColor: "#FF9800",
        content: "When we decided to buy our Landcruiser, we knew it was going to be a big purchase for us, so finding the right dealership was really important. From the very beginning, our experience with Alpha One felt different from other places we've dealt with in the past.",
    },
    {
        name: "Cade Satterfield",
        date: "January 31, 2024",
        bgColor: "#009688",
        content: "After doing some research I decided to use Alpha One to do a full PPF wrap on my new Grenadier. The end result was incredible and the service throughout was top notch. Highly recommend reaching out to these guys for your next project!",
    },
    {
        name: "Rathan Reddy",
        date: "January 31, 2024",
        bgColor: "#3F51B5",
        content: "Fantastic experience working with the whole crew at Alpha One Motors, particularly Wes Tindel! Entire process was painless. Detailed and thorough representation of the car. Shop inventory is seriously impressive. Can't speak more highly about these guys.",
    },
    {
        name: "James Hensley",
        date: "January 31, 2024",
        bgColor: "#4CAF50",
        content: "Had a great buying experience at Alpha One Motors. Got my dream car I had always wanted. Got a great deal on my trade and value price on this beautiful SL63 AMG. Thanks to Tim and Dave for all their help. If you are looking for a luxury or top end car these guys are you place to buy. Thanks again Tim. We appreciate your help in acquiring this dream.",
    },
    {
        name: "Derek Guilbeau",
        date: "January 31, 2024",
        bgColor: "#2196F3",
        content: "Timothy Ewald & Shealea with Alpha One Motors made it easy to work with them when buying my Lamborghini unseen. I was an out of state buyer. They sent me videos and even FaceTime me to see the vehicle. Thanks for great customer service and shipping my vehicle to me.",
    },
    {
        name: "Robert Grimm",
        date: "January 31, 2024",
        bgColor: "#9C27B0",
        content: "I can't say enough about the staff here making it a great place to find your next super or luxury car. I didn't feel pressured to buy. Tim seemed just as excited to show me all their toys as I was to see them. He is just a great guy. Alpha One's prices are absolutely fair. Their prices are normally listed as fair to excellent on Car Gurus. So, you know you're not over spending.",
    },
];

export default function WhyUs() {
    const Slider = dynamic(() => import('react-slick'), { ssr: false });
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

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

            <section className="customer-served-wrap cv-auto">
                <div className="container">
                    <div className="xl-title text-uppercase mb-2">
                        Don&apos;t Take our Word for it!
                    </div>
                    <div className="lg-title fw-normal text-center font-40 mb-5 text-uppercase">
                        See what our Customers Have to Say!
                    </div>
                    <div className="mt-70">
                        <Slider {...settings} className="wbecs-slider">
                            {reviewsList.map((review, index) => (
                                <div key={index}>
                                    <div className="wbe-cs-box wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s">
                                        <div className="flex items-center justify-content-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="wbe-cs-circle" style={{ backgroundColor: review.bgColor }}>
                                                    {review.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="pl-3">
                                                    <div className="xs-title font-bold text-black helveticaneue">{review.name}</div>
                                                </div>
                                            </div>
                                            <div className="g-icon">
                                                <img src={getImages('icon.svg')} alt="Google" />
                                            </div>
                                        </div>
                                        <div className="flex gap-1 wbe-cs-rating mb-2">
                                            <img className="inline-block star-icon" src={getImages('star.svg')} alt="star" />
                                            <img className="inline-block star-icon" src={getImages('star.svg')} alt="star" />
                                            <img className="inline-block star-icon" src={getImages('star.svg')} alt="star" />
                                            <img className="inline-block star-icon" src={getImages('star.svg')} alt="star" />
                                            <img className="inline-block star-icon" src={getImages('star.svg')} alt="star" />
                                            <img className="inline-block verify-icon ml-2" src={getImages('ti-verified.svg')} alt="verified" />
                                        </div>
                                        <div className="mb-1 wbe-cs-content">
                                            <p>{review.content}</p>
                                        </div>
                                        <div>
                                            <a href="https://share.google/erYHCMlUwduOzew3b" target="_blank" rel="noopener noreferrer" className="wbe-read-more">
                                                Read more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="text-center mt-75">
                        <a href="https://share.google/erYHCMlUwduOzew3b" target="_blank" rel="noopener noreferrer" className="black-btn get-started-btn font-bold uppercase w-330 inline-block lg-btn">
                            Read Reviews
                        </a>
                    </div>
                </div>
            </section>
            </main>

            <Footer />
        </>
    );
}
