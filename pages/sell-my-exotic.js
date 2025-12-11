import React, { useContext, useEffect, useRef, useState, Suspense } from 'react'
import Link from 'next/link';
import Slider from "react-slick";
import { getImages } from '../components/Common/const'
import ModalLayout from '../components/Common/ModalLayout'
import { VehicleContext } from '../context/VehicleContext';
import SeoMeta from '../components/Common/SeoMeta';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
//import { Helmet } from 'react-helmet';

const MyVehicleForm = React.lazy(() => import("../components/Common/SellMyExotic/MyVehicleForm"));
const GetQuoteModal = React.lazy(() => import("../components/Common/SellMyExotic/GetQuoteModal"));

const reviewsList = [
    {
        name: "Eric Bramlett",
        date: "January 31, 2024",
        bgColor: "#512DA8",
        content: "When we started looking for a Landcruiser, I knew it wasn’t going to be just another car purchase. A Landcruiser is a big deal, and I wanted to make sure we found one that was in great shape and from someone we could actually trust. That’s what led us back to Alpha One. We’ve worked with them before—both buying and selling—and every single time they’ve been nothing but professional, straightforward, and easy to deal with. This time was no different.",
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
        content: "When we decided to buy our Landcruiser, we knew it was going to be a big purchase for us, so finding the right dealership was really important. From the very beginning, our experience with Alpha One felt different from other places we’ve dealt with in the past.",
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
        content: "Fantastic experience working with the whole crew at Alpha One Motors, particularly Wes Tindel! Entire process was painless. Detailed and thorough representation of the car. Shop inventory is seriously impressive. Can’t speak more highly about these guys.",
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
const accordionItems = [
    {
        title: "HOW DOES IT WORK?",
        content: (
            <>
                <ul>
                    <li>1. Submit your vehicle — Tell us about your car using the short form above.</li>
                    <li>2. Get your offer — Receive a competitive valuation within hours.</li>
                    <li>3. Schedule pickup & payment — We handle everything from paperwork to transport.</li>
                </ul>
                <p>It’s that easy — a safe, transparent process designed for discerning exotic car owners.</p>
            </>
        ),
    },
    {
        title: "CAN I SELL MY EXOTIC CAR FAST & SECURELY?",
        content: (
            <>
                <p>At Alpha One Motors, we make it simple to <Link href="/" prefetch={false}>sell your exotic car</Link> — fast, fair, and with complete peace of mind.
                    Whether you’re selling a Bentley, Porsche, Ferrari, or another high-end brand, our team of exotic car buyers specializes in discreet, high-value transactions across the U.S.<br />
                    We’re not just another exotic car trader, we’re enthusiasts who understand the true value of your vehicle.
                    That’s why owners choose us when searching for the best place to sell exotic cars or the best way to sell a Porsche online.
                </p>
            </>
        ),
    },
    {
        title: "WHY DO EXOTIC CAR OWNERS CHOOSE ALPHA ONE MOTORS?",
        content: (
            <>
                <ul>
                    <li>We buy exotic cars directly — no consignment delays, no auction fees.</li>
                    <li>Instant valuations and same-day offers for qualified vehicles.</li>
                    <li>Nationwide pickup with secure enclosed transport.</li>
                    <li>Fast payment via verified bank transfer or cashier’s check.</li>
                    <li>Confidential process trusted by collectors and dealers alike.</li>
                </ul>
                <p>You can learn more about our roots and our passion for <Link href="/about-us" prefetch={false}>exotic car trading</Link>.  If you’ve ever thought, “I want to sell my Bentley” or “Where can I sell my exotic car online?” you’re in the right place. We make it effortless to sell your exotic car from the comfort of your home.</p>
            </>
        ),
    },
    {
        title: "WHAT EXOTIC & LUXURY CARS  DO WE BUY?",
        content: (
            <>
                <p>We specialize in buying and selling exotic cars, including:</p>
                <ul>
                    <li>Porsche 911, Taycan, Panamera, and Cayenne </li>
                    <li>Bentley Continental, Flying Spur, and Bentayga</li>
                    <li>Ferrari, Lamborghini, McLaren, Aston Martin, and Maserati</li>
                    <li>High-performance Mercedes-AMG, BMW M, and Audi RS vehicles</li>
                </ul>
                <p>Whether your car is nearly new or part of a private collection, we’re the trusted exotic car buyer ready to make an offer.</p>
            </>
        ),
    },
    {
        title: "READY TO GET STARTED?",
        content: (
            <>
                <p>Join hundreds of satisfied clients who chose Alpha One Motors as their preferred exotic car buyer.
Complete the quick form above and discover why we’re the best place to sell exotic cars online. Enter your vehicle above or <Link href="/contact-us" prefetch={false}> contact our exotic car buying team</Link> today.</p>
            </>
        ),
    },
];
const SellMyExotic = () => {

    const { getVehicleData, numberFormatter, filteredVehicleData } = useContext(VehicleContext);
    const [selectedValue, setSelectedValue] = useState("");
    const [getQuoteModal, setGetQuoteModal] = useState(false);
    const closeGetQuoteModal = () => {
        setGetQuoteModal(false)
        if (typeof document !== 'undefined') {
            document.body.classList.remove('body-overflow');
        }
    }

    const sliderRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const [openDragDropModal, setopenDragDropModal] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const closeDragDropModal = () => {
        setopenDragDropModal(false)
    }
    const [files, setFiles] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        getVehicleData();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.WOW) {
            new window.WOW({ live: false }).init();
        }
    }, []);

    return (
        <>
            <Header />
            <SeoMeta
                title="Sell Your Exotic Car | We Buy Bentley, Porsche & More | Alpha One Motors"
                description="Looking to sell your exotic car? Alpha One Motors buys Bentley, Porsche, Ferrari, and other high-end vehicles with fast payment and nationwide pickup."
                keywords=""
                ogTitle="Sell Your Exotic Car | We Buy Bentley, Porsche & More | Alpha One Motors"
                ogDescription="Looking to sell your exotic car? Alpha One Motors buys Bentley, Porsche, Ferrari, and other high-end vehicles with fast payment and nationwide pickup."
            />
            <section className='common-banner-wrap d-flex align-items-center wow reveal fadeIn'
                style={{
                    backgroundImage: `url(${getImages('sell-exotic-hero.webp')})`
                }}
            >
                <img src={getImages('sell-exotic-hero.webp')} alt="" width="0" height="0" style={{display: "none !important"}} fetchPriority="high"/>
                <div className='w-100'>
                    <div className='xl-title text-uppercase text-center font-80 letter-spacing-3 wow reveal fadeInUp'>SAME DAY OFFERS</div>
                    <div className='lg-title font-40 text-uppercase text-center fw-300 mt-3 wow reveal fadeInUp'>Enjoy our stress-free process</div>
                </div>
            </section>
            <section className='hassle-process-wrap'>
                <div className='container'>
                    <div className='hassle-process-box d-md-flex wow reveal fadeIn'>
                        <div className='hpb-right w-50 order-2'>
                            <div className='xl-title text-uppercase mb-md-5 mb-4 text-center wow reveal fadeInUp'>NO HASSLE <br />PROCESS</div>
                            <div className='wow reveal fadeInUp'>
                                <MyVehicleForm
                                    setSelectedValue={setSelectedValue}
                                    getQuoteModal={getQuoteModal}
                                    setGetQuoteModal={setGetQuoteModal}

                                />
                            </div>
                            <div className='sm-title text-center roboto mt-100 fw-500 text-white wow reveal fadeInUp'>Simple, Fast & Free</div>
                            <div className='text-center pt-3 wow reveal fadeInUp'>
                                    <span className='px-5 d-inline-block hpb-border-t pt-3'>
                                        <img loading="lazy" src={getImages('tg-logo-bw.png')} />
                                    </span>
                            </div>
                        </div>
                        <div className='hpb-left w-50'>
                            <div className='hpb-xs-title text-uppercase text-orange mb-3 wow reveal fadeInUp'>Call</div>
                            <div className='text-center wow reveal fadeInUp'>
                                <a href='tel:5127771240' className='lg-title call-text-title text-white font-40 fw-700'>512-777-1240</a>
                            </div>
                            <div className='md-title font-1-9em text-center text-white fw-300 text-uppercase mt-md-5 mt-4 mb-md-4 mb-3 wow reveal fadeInUp'>How Our Process Works</div>
                            <div className='hpb-process-list'>
                                <div className='d-flex align-items-center wow reveal fadeInUp'>
                                    <div className='hpb-circle me-3'>1</div>
                                    <div className='xs-title text-uppercase'>SUBMIT YOUR VEHICLE INFO</div>
                                </div>
                                <div className='d-flex align-items-center wow reveal fadeInUp'>
                                    <div className='hpb-circle me-3'>2</div>
                                    <div className='xs-title text-uppercase'>RECEIVE A SAME DAY APPRAISAL</div>
                                </div>
                                <div className='d-flex align-items-center wow reveal fadeInUp'>
                                    <div className='hpb-circle me-3'>3</div>
                                    <div className='xs-title text-uppercase'>FINALIZE WITH OUR FRIENDLY STAFF</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='reviews-wrap'>
                <div className='container'>
                    <div className='hpb-xs-title text-uppercase mb-3 wow reveal fadeInUp'>Recent</div>
                    <div className='lg-title text-center font-40 text-uppercase mb-md-5 mb-4 wow reveal fadeInUp'>Google Reviews</div>
                    <div className='wow reveal fadeIn'>
                        <Slider ref={sliderRef} {...settings} className='review-slider'>
                            {reviewsList.map((review, index) => (
                                <div className="review-item" key={index}>
                                    <div className="review-box">
                                            <span className='google-icon'>
                                                <img loading="lazy" src={getImages('google-logo.png')} alt='google' />
                                            </span>
                                        <div className="review-mnh">
                                            <p className="clamp-4">
                                                {review.content}
                                            </p>
                                        </div>
                                        <div className="d-block align-items-end justify-content-between mt-1">
                                            <div>
                                                <div className="mb-md-3 mb-2 d-inline-flex align-items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <img loading="lazy" key={i} className="me-1" src={getImages("star.svg")} alt="star" />
                                                    ))}
                                                </div>
                                                <div className="reviewer-name">{review.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Slider>
                    </div>
                </div>
            </section>
            <section className='sell-or-trade-wrap'>
                <div className='container'>
                    <div className='d-lg-flex justify-content-between sot-flex'>
                        <div className='sot-left wow reveal fadeInUp'>
                            <div className='mb-3'>
                                <img loading="lazy" src={getImages('tg-logo-bw.png')} />
                            </div>
                            <div className='lg-title text-start font-2-2em roboto'>Sell or Trade your Vehicle</div>
                        </div>
                        <div className='sot-right wow reveal fadeInUp'>
                            <MyVehicleForm
                                setSelectedValue={setSelectedValue}
                                getQuoteModal={getQuoteModal}
                                setGetQuoteModal={setGetQuoteModal}
                                sotForm={true}

                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className='trading-wrap'>
                <div className='container '>
                    <div className='lg-title font-40 mb-md-5 mb-3 text-center text-uppercase wow reveal fadeInUp'>Tips on Trading or Selling Your Exotic Vehicle</div>
                    <div className='common-text px-md-4 wow reveal fadeInUp'>
                        <p>At Alpha One Motors, we simplify the process to sell your exotic car, offering a premier experience for owners looking to sell their Porsche, Ferrari, Lamborghini, McLaren, and Bugatti vehicles. As a leading exotic car trader, we pride ourselves on delivering exceptional service and fair, competitive offers to ensure you get the best value when you choose to sell your exotic car with us.</p>

                        <p>At Alpha One Motors we buy exotic cars of all types and backgrounds. We are dedicated to making your transaction smooth and stress-free, with expert appraisals tailored to your luxury vehicle. We’ve built relationships with thousands of satisfied clients that trust us to handle selling your Ferrari, Porsche , Lamborghini, McLaren, or Bugatti with the care and expertise it deserves. Contact Alpha One Motors today to experience why we’re the top choice for selling exotic cars with confidence and ease.</p>
                    </div>
                </div>
            </section>
            <section className='faqs-wrap'>
                <div className='container'>
                    <div className='lg-title font-40 mb-md-5 mb-3 text-center text-uppercase wow reveal fadeInUp'>FREQUENTLY ASKED QUESTIONS</div>
                    <div className="accordion custom-accordion" id="accordionExample">
                        {accordionItems.map((item, index) => {
                            const collapseId = `collapse${index}`;
                            const headingId = `heading${index}`;
                            const isOpen = activeIndex === index;

                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={headingId}>
                                        <button
                                            className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                                            type="button"
                                            aria-expanded={isOpen ? 'true' : 'false'}
                                            aria-controls={collapseId}
                                            onClick={() => setActiveIndex(isOpen ? null : index)}
                                        >
                                            {item.title}
                                        </button>
                                    </h2>
                                    {isOpen ? (
                                        <div className="accordion-body" style={{ color: '#e1e1e1' }}>{item.content}</div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ModalLayout open={getQuoteModal} close={closeGetQuoteModal} darkThemeCls='true' cls="dark-bg-modal" modalWidth={750}>
                <Suspense
                    fallback={<div>Component1 are loading please wait...</div>}
                >
                    <GetQuoteModal
                        selectedValue={selectedValue}
                        close={closeGetQuoteModal}
                        setopenDragDropModal={setopenDragDropModal}
                        setPreviewURL={setPreviewURL}
                        files={files}
                        setFiles={setFiles}
                    />
                </Suspense>
            </ModalLayout>
            <Footer />
        </>
    )
}

export default SellMyExotic
