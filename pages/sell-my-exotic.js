import React, { useRef, useState, Suspense } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getImages } from '../components/Common/const'
import ModalLayout from '../components/Common/ModalLayout'
import SeoMeta from '../components/Common/SeoMeta';
import Header from '../components/Common/Header';
// import Footer from '../components/Common/Footer';
import LazyLoadSection from '@/components/Common/LazyLoadSection';
//import { Helmet } from 'react-helmet';
const Footer = dynamic(() => import('../components/Common/Footer'), { ssr: false });
const SellMyExoticReviews = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticReviews'), { 
    ssr: false,
    loading: () => <div style={{ height: '500px' }}></div>
});

const MyVehicleForm = dynamic(() => import("../components/Common/SellMyExotic/MyVehicleForm"), {
    ssr: false,
    loading: () => <div style={{ height: '400px' }}></div>
});

const GetQuoteModal = React.lazy(() => import("../components/Common/SellMyExotic/GetQuoteModal"));

const SellMyExoticFaq = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticFaq'), { ssr: false });
const SellMyExoticTips = dynamic(() => import('../components/Common/SellMyExotic/SellMyExoticTips'), { ssr: false });

const SellMyExotic = () => {

    const [selectedValue, setSelectedValue] = useState("");
    const [getQuoteModal, setGetQuoteModal] = useState(false);
    const closeGetQuoteModal = () => {
        setGetQuoteModal(false)
        if (typeof document !== 'undefined') {
            document.body.classList.remove('body-overflow');
        }
    }

    const formRef = useRef(null);
    const [openDragDropModal, setopenDragDropModal] = useState(false);
    const [previewURL, setPreviewURL] = useState(null);
    const closeDragDropModal = () => {
        setopenDragDropModal(false)
    }
    const [files, setFiles] = useState([]);

    


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
            <section className='common-banner-wrap d-flex align-items-center' style={{ position: 'relative', overflow: 'hidden' }} >
                <div className='min-h-[350px]'>
                    <Image 
                        src={getImages('sell-exotic-hero.webp')} 
                        alt="Sell Your Exotic Car" 
                        priority
                        quality={20} fill
                        fetchPriority="high"
                        sizes="100vw"
                        className=''
                        style={{objectFit: 'cover', zIndex: -1}} 
                        placeholder="blur"
                        blurDataURL={getImages('sell-exotic-hero.webp?quality=1')}
                    />
                </div>
                <div className='w-100' style={{ zIndex: 1 }}>
                    <div className='xl-title text-uppercase text-center font-80 letter-spacing-3'>SAME DAY OFFERS</div>
                    <div className='lg-title font-40 text-uppercase text-center fw-300 mt-3'>Enjoy our stress-free process</div>
                </div>
            </section>
            <main role='main' className='cv-auto'>
                <section className='hassle-process-wrap'>
                    <div className='container'>
                    <div className='hassle-process-box d-md-flex cv-auto'>
                        <div className='hpb-right w-50 order-2'>
                                <div className=' xl-title text-uppercase mb-md-5 mb-4 text-center'>NO HASSLE <br />PROCESS</div>
                            <div ref={formRef}>
                                <MyVehicleForm
                                    setSelectedValue={setSelectedValue}
                                    getQuoteModal={getQuoteModal}
                                    setGetQuoteModal={setGetQuoteModal}
                                />
                            </div>
                                <div className=' sm-title text-center roboto mt-100 fw-500 text-white'>Simple, Fast & Free</div>
                                <div className=' text-center pt-3'>
                                        <span className='px-5 d-inline-block hpb-border-t pt-3'>
                                            <Image src={getImages('tg-logo-bw.webp')} 
                                            alt='Trade Group' 
                                            width={120} height={36}
                                            placeholder="blur"
                                            blurDataURL={getImages('tg-logo-bw.webp?quality=1')}
                                            // priority
                                            quality={20}
                                            // fetchPriority="high"
                                            sizes="100vw"
                                             />
                                        </span>
                                </div>
                            </div>
                        <div className='hpb-left w-50'>
                            <div className='  hpb-xs-title text-uppercase text-orange mb-3'>Call</div>
                            <div className=' text-center'>
                                    <a href='tel:5127771240' className='lg-title call-text-title text-white font-40 fw-700'>512-777-1240</a>
                            </div>
                            <div className='  md-title font-1-9em text-center text-white fw-300 text-uppercase mt-md-5 mt-4 mb-md-4 mb-3'>How Our Process Works</div>
                            <div className='hpb-process-list'>
                                <div className='  d-flex align-items-center'>
                                    <div className='hpb-circle me-3'>1</div>
                                        <div className='xs-title text-uppercase'>SUBMIT YOUR VEHICLE INFO</div>
                                    </div>
                                    <div className='  d-flex align-items-center'>
                                        <div className='hpb-circle me-3'>2</div>
                                        <div className='xs-title text-uppercase'>RECEIVE A SAME DAY APPRAISAL</div>
                                    </div>
                                    <div className='  d-flex align-items-center'>
                                        <div className='hpb-circle me-3'>3</div>
                                        <div className='xs-title text-uppercase'>FINALIZE WITH OUR FRIENDLY STAFF</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <LazyLoadSection rootMargin="300px" height="500px">
                    <SellMyExoticReviews />
                    <section className='sell-or-trade-wrap'>
                        <div className='container'>
                            <div className='d-lg-flex justify-content-between sot-flex'>
                                <div className='sot-left'>
                                    <div className='flex lg:block   justify-center mb-3'>
                                        <Image src={getImages('tg-logo-bw.webp')} alt='Trade Group' width={120} height={36} />
                                    </div>
                                    <div className='lg-title !text-center xl:!text-start  font-2-2em roboto'>Sell or Trade your Vehicle</div>
                                </div>
                                <div className='sot-right'>
                                    <div>
                                            <MyVehicleForm
                                                setSelectedValue={setSelectedValue}
                                                getQuoteModal={getQuoteModal}
                                                setGetQuoteModal={setGetQuoteModal}
                                                sotForm={true}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </LazyLoadSection>
            </main>
            
            <LazyLoadSection rootMargin="300px" height="400px">
                <SellMyExoticTips />
            </LazyLoadSection>
            <LazyLoadSection rootMargin="300px" height="500px">
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
            </LazyLoadSection>

        </>
    )
}

export default SellMyExotic
