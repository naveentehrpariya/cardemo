import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getImages } from '@/components/Common/const';
import Header from '@/components/Common/Header';
import LazyLoadSection from '@/components/Common/LazyLoadSection';
// import InstagramFeed from '@/components/Home/InstagramFeed';
const ExoticConsignment = dynamic(() => import('@/components/Home/ExoticConsignment'), { ssr: false });
const HomeRateAbout = dynamic(() => import('@/components/Home/HomeRateAbout'), { ssr: false });
const ModalLayout = dynamic(() => import('@/components/Common/ModalLayout'), { ssr: false });
const VehicleConsignmentInquiry = dynamic(() => import('@/components/Home/VehicleConsignmentInquiry'), { ssr: false });
const MoreInfoAppraiseModal = dynamic(() => import('@/components/Home/MoreInfoAppraiseModal'), { ssr: false });
const InstagramFeed = dynamic(() => import('@/components/Home/InstagramFeed'), { ssr: false });
// import EnterVehicleInfo from '@/components/Home/EnterVehicleInfo';
const EnterVehicleInfo = dynamic(() => import('@/components/Home/EnterVehicleInfo'), { ssr: false });
const Footer = dynamic(() => import('@/components/Common/Footer'), { ssr: false });

export default function Home() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [openConsignmentModal, setOpenConsignmentModal] = useState(false);
  const handleConsignmentModal = () => {
    setOpenConsignmentModal(true);
  };


  const closeConsignmentModal = () => {
    setOpenConsignmentModal(false);
  };


  // More Info to appraise your vehicle
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const handleMoreInfoModal = () => {
    setOpenMoreInfoModal(true);
  };

  
  const closeMoreInfoModal = () => {
    setOpenMoreInfoModal(false);
  };

  const [appraisalContactInfo, setAppraisalContactInfo] = useState({});
  const formikRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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
      <Head>
        <title>Alpha One Motors - Sell Your Exotic Vehicles</title>
        <meta
          name="description"
          content="Alpha One Motors - Sell Your Exotic Vehicles. We offer competitive prices for Ferrari, Lamborghini, Porsche, Lexus, BMW, Mercedes-Benz and Audi."
        />
      </Head>

      <Header secref={section2Ref} />

      <section className='banner-wrap'>
        <div className="slideshow" style={{ position: 'relative' }}>
          <Image 
            src={getImages('banner-image.webp')} 
            alt="Banner" 
            fill 
            priority 
            fetchPriority="high"
            quality={60}
            className="slideshow-image"
            style={{ objectFit: 'cover' }} 
            sizes="100vw"
          />
        </div>
        <div className='banner-shadow'></div> 
        <div className='banner-pos'>
          <div className='container container-lg'>
            <div className='w-full d-flex align-items-center justify-content-between w-100 banner-flex'>
              <div className='banner-title text-uppercase'>SELL US YOUR <br /><span>Exotic Vehicle</span></div>
              <EnterVehicleInfo setOpenMoreInfoModal={setOpenMoreInfoModal} setAppraisalContactInfo={setAppraisalContactInfo} formikRef={formikRef}/>
            </div>
          </div>
        </div>
      </section>




      <section className='facility-wrap'>
        <div className='d-flex facility-flex'>
          <div className='facility-col'>
            <Image src={getImages('facility-image1.webp')} alt="Our Latest" width={800} height={600} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='text-2xl md:text-4xl font-euro font-bold  text-uppercase mb-4'>Our <br />LATEST</div>
                <div className='mt-3'>
                  <button onClick={() => scrollToSection(section1Ref)} className='white-btn pe-5'>
                    <span className='caret-right-icon'></span> View
                  </button>
                </div>
              </div>
            </div>
          </div>





          <div className='facility-col'>
            <Image src={getImages('facility-image2.webp')} alt="Get Your Cash Offer" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='text-2xl md:text-4xl font-euro font-bold  text-uppercase mb-4'>Get Your <br />Cash Offer</div>
                <div className='mt-3'>
                  <button onClick={() => scrollToSection(section2Ref)} className='white-btn pe-5'>
                    <span className='caret-right-icon'></span> View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='facility-col'>
            <Image src={getImages('facility-image3.webp')} alt="Consignment Services" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" style={{ width: '100%', height: 'auto' }} />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='text-2xl md:text-4xl font-euro font-bold  text-uppercase mb-4'>Consignment <br />Services</div>
                <div className='mt-3'>
                  <button type="button" onClick={handleConsignmentModal} className='white-btn pe-5'><span className='caret-right-icon'></span> View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='process-wrap' ref={section2Ref}>
        <div className='container container-lg'>
          <div className='d-flex align-items-center justify-content-between process-flex'>
            <div className='process-left'>
              <div className='lg-title text-uppercase mb-2 md:mb-4 !font-[100]'>ALPHA ONE DIFFERENCE</div>
              <p className='!font-light'>At Alpha One Motors, we specialize in helping owners of luxury and exotic vehicles sell with confidence and ease. Whether you&apos;re in San Antonio, Austin, or anywhere across Central Texas, our team is here to deliver top-market offers and a seamless selling experience.</p>

              <p className='!font-light'>We buy high-end models from brands like Ferrari, Lamborghini, Porsche, Lexus, BMW, Mercedes-Benz, Audi, and more. From rare exotics to highline luxury, we value every unique vehicle and offer competitive appraisals that reflect the true worth of your collection.</p>

              <p className='!font-light'>Ready to sell? Let Alpha One Motors be your trusted partner in getting the most out of your luxury car.</p>
            </div>
            <div className='process-right'>
              <div className='pr-col'>
                <span className='pr-circle lg-title flex items-center justify-content-center'>1</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>ENTER VEHICLE DETAILS</div>
                  <p>Simply fill out the 2 part form that takes less than 1 minute.</p>
                </div>
              </div>
              <div className='pr-col'>
                <span className='pr-circle lg-title flex items-center justify-content-center'>2</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>GET OFFER</div>
                  <p>Our tenured appraisers will contact you on the same day with a competitive price.</p>
                </div>
              </div>
              <div className='pr-col'>
                <span className='pr-circle lg-title flex items-center justify-content-center'>3</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>FINISH</div>
                  <p>Get a check cut on the day you exchange the vehicle. Simple, easy & no-hassle!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFooter ? 
        <>
          <LazyLoadSection>
            <ExoticConsignment handleConsignmentModal={handleConsignmentModal} />
          </LazyLoadSection>

          <LazyLoadSection>
            <section className='alpha-one-wrap'>
              <div className='container container-lg'>
                <div className='row gx-5'>
                  <div className='col-md-6'>
                    <div className='black-box d-flex align-items-center'>
                      <div>
                        <Image src={getImages('ao-ford-logo.webp')} alt="Alpha One Ford" width={200} height={60} style={{ width: 'auto', height: 'auto', maxWidth: '100%' }} />
                      </div>
                      <div className='ps-4'>
                        <div className='sm-title text-uppercase font-18 font-euro mb-3'>Alpha One Ford</div>
                        <div>
                          <a href='https://www.alphaoneford.com/' target="_blank" rel="noopener noreferrer" className='black-btn pe-5 fw-300 text-uppercase'><span className="white-caret-icon"></span> Visit Site</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='black-box d-flex align-items-center'>
                      <div>
                        <Image src={getImages('ao-chv-logo.webp')} alt="Alpha One Chevrolet" width={200} height={60} style={{ width: 'auto', height: 'auto', maxWidth: '100%' }} />
                      </div>
                      <div className='ps-4'>
                        <div className='sm-title text-uppercase font-18 font-euro mb-3'>Alpha One Chevrolet</div>
                        <div>
                          <a href='https://www.alphaonechevrolet.com/' target="_blank" rel="noopener noreferrer" className='black-btn pe-5 fw-300 text-uppercase'><span className="white-caret-icon"></span> Visit Site</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </LazyLoadSection>

        <LazyLoadSection>
            <HomeRateAbout />
          </LazyLoadSection> 
        </>
      : ''}
      {showFooter ? 
      <section className=' insta-wrap' ref={section1Ref}>
        <LazyLoadSection rootMargin="1000px">
          <InstagramFeed/>
        </LazyLoadSection>
      </section> : ''}

      {showFooter && <Footer />}

      {openConsignmentModal &&
        <ModalLayout open={openConsignmentModal} close={closeConsignmentModal} darkThemeCls='true' modalWidth={1200}>
          <VehicleConsignmentInquiry close={closeConsignmentModal} />
        </ModalLayout>
      }
      {openMoreInfoModal && 
        <ModalLayout open={openMoreInfoModal} close={closeMoreInfoModal} darkThemeCls='true' modalWidth={1200}>
          <MoreInfoAppraiseModal close={closeMoreInfoModal} appraisalContactInfo={appraisalContactInfo} outerFormikRef={formikRef}/>
        </ModalLayout>
      }
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
