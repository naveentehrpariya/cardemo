import { useRef, useState } from 'react';
import Head from 'next/head';
import { getImages } from '@/components/Common/const';
import EnterVehicleInfo from '@/components/Home/EnterVehicleInfo';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import ModalLayout from '@/components/Common/ModalLayout';
import VehicleConsignmentInquiry from '@/components/Home/VehicleConsignmentInquiry';
import MoreInfoAppraiseModal from '@/components/Home/MoreInfoAppraiseModal';
import InstagramFeed from '@/components/Home/InstagramFeed';
import ExoticConsignment from '@/components/Home/ExoticConsignment';

export default function Home() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Vehicle Consignment Inquiry
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
        <div className="slideshow">
          <div className="slideshow-image" style={{backgroundImage: `url(${getImages('banner-image.webp')})`}}></div>
        </div>
        <div className='banner-shadow'></div>
        <div className='banner-pos'>
          <div className='container container-lg'>
            <div className='d-flex align-items-center justify-content-between w-100 banner-flex'>
              <div className='banner-title text-uppercase wow fadeIn' data-wow-duration="1s" data-wow-delay="0.2s">SELL US YOUR <br /><span>Exotic Vehicle</span></div>
              <EnterVehicleInfo setOpenMoreInfoModal={setOpenMoreInfoModal} setAppraisalContactInfo={setAppraisalContactInfo} formikRef={formikRef}/>
            </div>
          </div>
        </div>
      </section>

      <section className='facility-wrap'>
        <div className='d-flex facility-flex'>
          <div className='facility-col wow fadeIn' data-wow-delay="0.2s">
            <img src={getImages('facility-image1.jpg')} alt="Our Latest" />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='lg-title text-uppercase mb-4'>Our <br />LATEST</div>
                <div className='mt-3'>
                  <button onClick={() => scrollToSection(section1Ref)} className='white-btn pe-5'>
                    <span className='caret-right-icon'></span> View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='facility-col wow fadeIn' data-wow-delay="0.4s">
            <img src={getImages('facility-image2.jpg')} alt="Get Your Cash Offer" />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='lg-title text-uppercase mb-4'>Get Your <br />Cash Offer</div>
                <div className='mt-3'>
                  <button onClick={() => scrollToSection(section2Ref)} className='white-btn pe-5'>
                    <span className='caret-right-icon'></span> View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='facility-col wow fadeIn' data-wow-delay="0.6s">
            <img src={getImages('facility-image3.jpg')} alt="Consignment Services" />
            <div className='facility-pos d-flex align-items-center'>
              <div className='w-100'>
                <div className='lg-title text-uppercase mb-4'>Consignment <br />Services</div>
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
            <div className='process-left wow fadeInLeft' data-wow-delay="0.4s">
              <div className='lg-title text-uppercase mb-4 fw-300'>ALPHA ONE DIFFERENCE</div>
              <p>At Alpha One Motors, we specialize in helping owners of luxury and exotic vehicles sell with confidence and ease. Whether you're in San Antonio, Austin, or anywhere across Central Texas, our team is here to deliver top-market offers and a seamless selling experience.</p>

              <p>We buy high-end models from brands like Ferrari, Lamborghini, Porsche, Lexus, BMW, Mercedes-Benz, Audi, and more. From rare exotics to highline luxury, we value every unique vehicle and offer competitive appraisals that reflect the true worth of your collection.</p>

              <p>Ready to sell? Let Alpha One Motors be your trusted partner in getting the most out of your luxury car.</p>
            </div>
            <div className='process-right'>
              <div className='pr-col wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.5s">
                <span className='pr-circle lg-title'>1</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>ENTER VEHICLE DETAILS</div>
                  <p>Simply fill out the 2 part form that takes less than 1 minute.</p>
                </div>
              </div>
              <div className='pr-col wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.7s">
                <span className='pr-circle lg-title'>2</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>GET OFFER</div>
                  <p>Our tenured appraisers will contact you on the same day with a competitive price.</p>
                </div>
              </div>
              <div className='pr-col wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.9s">
                <span className='pr-circle lg-title'>3</span>
                <div className='pr-content'>
                  <div className='sm-title mb-2 text-uppercase'>FINISH</div>
                  <p>Get a check cut on the day you exchange the vehicle. Simple, easy & no-hassle!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExoticConsignment handleConsignmentModal={handleConsignmentModal} />

      <section className='alpha-one-wrap'>
        <div className='container container-lg'>
          <div className='row gx-5'>
            <div className='col-md-6 wow fadeInLeft' data-wow-duration="1s" data-wow-delay="0.2s">
              <div className='black-box d-flex align-items-center'>
                <div>
                  <img src={getImages('ao-ford-logo.png')} alt="Alpha One Ford" />
                </div>
                <div className='ps-4'>
                  <div className='sm-title text-uppercase font-18 mb-3'>Alpha One Ford</div>
                  <div>
                    <a href='https://www.alphaoneford.com/' target="_blank" rel="noopener noreferrer" className='black-btn pe-5 fw-300 text-uppercase'><span className="white-caret-icon"></span> Visit Site</a>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 wow fadeInRight' data-wow-duration="1s" data-wow-delay="0.4s">
              <div className='black-box d-flex align-items-center'>
                <div>
                  <img src={getImages('ao-chv-logo.png')} alt="Alpha One Chevrolet" />
                </div>
                <div className='ps-4'>
                  <div className='sm-title text-uppercase font-18 mb-3'>Alpha One Chevrolet</div>
                  <div>
                    <a href='https://www.alphaonechevrolet.com/' target="_blank" rel="noopener noreferrer" className='black-btn pe-5 fw-300 text-uppercase'><span className="white-caret-icon"></span> Visit Site</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='rate-about-wrap'>
        <div className='container container-lg'>
          <div className='row gx-5'>
            <div className='col-md-6 wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.2s">
              <div className='lg-title text-uppercase mb-4'>Highly Ranked by Customers</div>
              <div className='rating-box'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <div className='xl-title helveticaneue'>4.9</div>
                  <div className='google-icon'>
                    <img src={getImages('google-logo.png')} alt='Google' />
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                  <div className='star-icons'>
                    <img className="me-1" src={getImages('star-off.svg')} alt='star' />
                    <img className="me-1" src={getImages('star-off.svg')} alt='star' />
                    <img className="me-1" src={getImages('star-off.svg')} alt='star' />
                    <img className="me-1" src={getImages('star-off.svg')} alt='star' />
                    <img className="me-1" src={getImages('star-off.svg')} alt='star' />
                  </div>
                  <div className='total-review-count'>
                    194 Reviews
                  </div>
                </div>
                <div className="d-flex align-items-center rating-progress-flex">
                  <div className='w-50px'>
                    <div>5 Star</div>
                  </div>
                  <div className='cs-progress ms-2 me-3'>
                    <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: "178%" }}>
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                  <div className='w-50px'>178</div>
                </div>
                <div className="d-flex align-items-center rating-progress-flex">
                  <div className='w-50px'>
                    <div>4 Star</div>
                  </div>
                  <div className='cs-progress ms-2 me-3'>
                    <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: "3%" }}>
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                  <div className='w-50px'>3</div>
                </div>
                <div className="d-flex align-items-center rating-progress-flex">
                  <div className='w-50px'>
                    <div>3 Star</div>
                  </div>
                  <div className='cs-progress ms-2 me-3'>
                    <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: "5%" }}>
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                  <div className='w-50px'>5</div>
                </div>
                <div className="d-flex align-items-center rating-progress-flex">
                  <div className='w-50px'>
                    <div>2 Star</div>
                  </div>
                  <div className='cs-progress ms-2 me-3'>
                    <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: "0%" }}>
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                  <div className='w-50px'>0</div>
                </div>
                <div className="d-flex align-items-center rating-progress-flex">
                  <div className='w-50px'>
                    <div>1 Star</div>
                  </div>
                  <div className='cs-progress ms-2 me-3'>
                    <div className="progress">
                      <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="5" style={{ width: "0%" }}>
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  </div>
                  <div className='w-50px'>0</div>
                </div>
              </div>
            </div>
            <div className='col-md-6 wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.4s">
              <div className='lg-title text-uppercase mb-4'>OUR PASSION</div>
              <div className='about-box'>
                <div className='about-image'>
                  <img src={getImages('porche.jpg')} alt="Our Passion" />
                </div>
                <div className='about-content'>Our passion is sharing our love for elite cars with incredible people. We put reputation above all else. Our network of investors and collectors ensure you get the most value on any appraisal you bring us. We cut out the middleman and connect investors across the country.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='insta-wrap wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.2s" ref={section1Ref}>
        <InstagramFeed/>
      </section>

      <Footer />

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
