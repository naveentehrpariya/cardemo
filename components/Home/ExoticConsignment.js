import { useState } from 'react';

const ExoticConsignment = ({ handleConsignmentModal }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Calculate relative position (-50 to 50 range)
    const x = ((clientX - left) / width - 2) * 20; // Text movement
    const y = ((clientY - top) / height - 1) * 20;

    const bgX = ((clientX - left) / width - 5) * 30; // Background movement
    const bgY = ((clientY - top) / height - 0.5) * 30;

    setPosition({ x, y, bgX, bgY });
  };

  return (
    <section className='consignment-wrap'>
      <div className="mouse-container" onMouseMove={handleMouseMove}>
        <div className='consignment-overlay'></div>
        <div className='container container-lg'>
          <div className='w-full text-center mouse-text'>
            <div className='w-full d-flex align-items-center consignment-flex'>
              <div className='w-full'>
                <div className='xl-title text-uppercase text-center wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.2s">Exotic Car Consignment</div>
                <div className='lg-title font-40 text-uppercase text-center fw-300 my-4 wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.4s">Looking to sell your supercar?</div>
                <div className='text-center mt-5 wow fadeInUp' data-wow-duration="1s" data-wow-delay="0.6s">
                  <button type='button' className='black-btn get-started-btn w-240 text-uppercase' onClick={handleConsignmentModal}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExoticConsignment;
