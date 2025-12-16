import React, { useContext, useEffect, useRef, useState, Suspense } from 'react'
import Link from 'next/link';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getImages } from '../components/Common/const'
import ModalLayout from '../components/Common/ModalLayout'
import { VehicleContext } from '../context/VehicleContext';
import SeoMeta from '../components/Common/SeoMeta';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
//import { Helmet } from 'react-helmet';

const MyVehicleForm = React.lazy(() => import("../components/Common/SellMyExotic/MyVehicleForm"));
const GetQuoteModal = React.lazy(() => import("../components/Common/SellMyExotic/GetQuoteModal"));

const SellMyExoticReviews = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticReviews'), { ssr: false });
const SellMyExoticFaq = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticFaq'), { ssr: false });
const SellMyExoticTips = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticTips'), { ssr: false });

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

    const formRef = useRef(null);
    const form2Ref = useRef(null);
    const [formReady, setFormReady] = useState(false);
    const [form2Ready, setForm2Ready] = useState(false);
    
    const [openDragDropModal, setopenDragDropModal] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const closeDragDropModal = () => {
        setopenDragDropModal(false)
    }
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getVehicleData();
    }, []);

    useEffect(() => {
        const makeObserver = (ref, setter) => {
            if (!ref.current) return;
            const io = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setter(true);
                    io.disconnect();
                }
            }, { rootMargin: '200px' });
            io.observe(ref.current);
            return () => io.disconnect();
        };
        const c1 = makeObserver(formRef, setFormReady);
        const c2 = makeObserver(form2Ref, setForm2Ready);
        return () => {
            if (typeof c1 === 'function') c1();
            if (typeof c2 === 'function') c2();
        };
    }, []);


    return (
        <>
            <Head>
                <link rel="preload" as="image" href={getImages('sell-exotic-hero.webp')} />
            </Head>
            <Header />
            <SeoMeta
                title="Sell Your Exotic Car | We Buy Bentley, Porsche & More | Alpha One Motors"
                description="Looking to sell your exotic car? Alpha One Motors buys Bentley, Porsche, Ferrari, and other high-end vehicles with fast payment and nationwide pickup."
                keywords=""
                ogTitle="Sell Your Exotic Car | We Buy Bentley, Porsche & More | Alpha One Motors"
                ogDescription="Looking to sell your exotic car? Alpha One Motors buys Bentley, Porsche, Ferrari, and other high-end vehicles with fast payment and nationwide pickup."
            />
            <section className='common-banner-wrap d-flex align-items-center'
                style={{
                    backgroundImage: `url(${getImages('sell-exotic-hero.webp')})`
                }}
            >
                <Image src={getImages('sell-exotic-hero.webp')} alt="" width={1600} height={900} sizes="100vw" priority style={{display: 'none'}} />
                <div className='w-100'>
                    <div className='xl-title text-uppercase text-center font-80 letter-spacing-3'>SAME DAY OFFERS</div>
                    <div className='lg-title font-40 text-uppercase text-center fw-300 mt-3'>Enjoy our stress-free process</div>
                </div>
            </section>
            <main role='main' className='cv-auto'>
            <section className='hassle-process-wrap'>
                <div className='container'>
                <div className='hassle-process-box d-md-flex cv-auto'>
                    <div className='hpb-right w-50 order-2'>
                            <div className='xl-title text-uppercase mb-md-5 mb-4 text-center'>NO HASSLE <br />PROCESS</div>
                        <div ref={formRef}>
                            {formReady && (
                                <MyVehicleForm
                                    setSelectedValue={setSelectedValue}
                                    getQuoteModal={getQuoteModal}
                                        setGetQuoteModal={setGetQuoteModal}
                                    />
                                )}
                            </div>
                            <div className='sm-title text-center roboto mt-100 fw-500 text-white'>Simple, Fast & Free</div>
                            <div className='text-center pt-3'>
                                    <span className='px-5 d-inline-block hpb-border-t pt-3'>
                                        <Image src={getImages('tg-logo-bw.png')} alt='Trade Group' width={120} height={36} />
                                    </span>
                            </div>
                        </div>
                    <div className='hpb-left w-50'>
                        <div className='hpb-xs-title text-uppercase text-orange mb-3'>Call</div>
                        <div className='text-center'>
                                <a href='tel:5127771240' className='lg-title call-text-title text-white font-40 fw-700'>512-777-1240</a>
                        </div>
                        <div className='md-title font-1-9em text-center text-white fw-300 text-uppercase mt-md-5 mt-4 mb-md-4 mb-3'>How Our Process Works</div>
                        <div className='hpb-process-list'>
                            <div className='d-flex align-items-center'>
                                <div className='hpb-circle me-3'>1</div>
                                    <div className='xs-title text-uppercase'>SUBMIT YOUR VEHICLE INFO</div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='hpb-circle me-3'>2</div>
                                    <div className='xs-title text-uppercase'>RECEIVE A SAME DAY APPRAISAL</div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='hpb-circle me-3'>3</div>
                                    <div className='xs-title text-uppercase'>FINALIZE WITH OUR FRIENDLY STAFF</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <SellMyExoticReviews />

            <section className='sell-or-trade-wrap'>
                <div className='container'>
                    <div className='d-lg-flex justify-content-between sot-flex'>
                        <div className='sot-left'>
                            <div className='mb-3'>
                                <Image src={getImages('tg-logo-bw.png')} alt='Trade Group' width={120} height={36} />
                            </div>
                            <div className='lg-title text-start font-2-2em roboto'>Sell or Trade your Vehicle</div>
                        </div>
                        <div className='sot-right'>
                            <div ref={form2Ref}>
                                {form2Ready && (
                                    <MyVehicleForm
                                        setSelectedValue={setSelectedValue}
                                        getQuoteModal={getQuoteModal}
                                        setGetQuoteModal={setGetQuoteModal}
                                        sotForm={true}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </main>
            
            <SellMyExoticTips />
            <SellMyExoticFaq />

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
