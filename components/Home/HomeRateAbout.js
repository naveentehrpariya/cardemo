import React from 'react';
import Image from 'next/image';
import { getImages } from '@/components/Common/const';

const HomeRateAbout = () => {
  return (
    <section className='rate-about-wrap'>
      <div className='container container-lg'>
        <div className='row md:px-0'>
          <div className='col-md-6 wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.2s">
            <div className='lg-title text-uppercase mb-4 !text-center lg:!text-start w-full text-xl md:text-2xl font-euro text-uppercase mb-4'>Highly Ranked by Customers</div>
            <div className='rating-box'>
              <div className='d-flex align-items-center justify-content-between mb-3'>
                <div className='xl-title helveticaneue'>4.9</div>
                <div className='google-icon flex justify-content-center align-items-center'>
                  <Image src={getImages('google-logo.webp')} alt='Google' width={30} height={30} style={{ width: 'auto', height: 'auto' }} />
                </div>
              </div>
              <div className='d-flex align-items-center justify-content-between mb-3'>
                <div className='star-icons flex'>
                  <Image className="me-1" src={getImages('star-off.svg')} alt='star' width={20} height={20} />
                  <Image className="me-1" src={getImages('star-off.svg')} alt='star' width={20} height={20} />
                  <Image className="me-1" src={getImages('star-off.svg')} alt='star' width={20} height={20} />
                  <Image className="me-1" src={getImages('star-off.svg')} alt='star' width={20} height={20} />
                  <Image className="me-1" src={getImages('star-off.svg')} alt='star' width={20} height={20} />
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
          <div className='col-md-6'>
            <div className='lg-title text-uppercase mb-4'>OUR PASSION</div>
            <div className='about-box'>
              <div className='about-image'>
                <Image src={getImages('porche.webp')} alt="Our Passion" width={600} height={400} sizes="(max-width: 768px) 100vw, 50vw" style={{ width: '100%', height: '100%' }} />
              </div>
              <div className='about-content'>Our passion is sharing our love for elite cars with incredible people. We put reputation above all else. Our network of investors and collectors ensure you get the most value on any appraisal you bring us. We cut out the middleman and connect investors across the country.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeRateAbout;
