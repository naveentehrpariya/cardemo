import React from 'react';
import Image from 'next/image';
import { getImages } from '../const';

const ContactInfo = () => {
    return (
        <>
            <div className='contact-black-box cv-auto wow fadeInUp'>
                <div className='xs-title font-1-4em eurostile fw-bold mb-4'>AUSTIN OFFICE</div>
                <div className='d-flex align-items-center mb-4'>
                    <div className='cb-icon'><Image src={getImages('local-phone-material.png')} alt='phone' width={24} height={24} /></div> 
                    <div className='xs-title font-1-1em eurostile fw-bold'>512-777-1240</div>
                </div>
                <div className='d-flex align-items-center'>
                    <div className='cb-icon'><Image src={getImages('contact-location-icon.svg')} alt='location' width={24} height={24} /></div> 
                    <div className='xs-title fw-400'>8140 N. Mopac Suite 4-150 Austin, TX 78759</div>
                </div>
            </div>
            <div>
                <iframe src="https://snazzymaps.com/embed/744745" width="100%" height="380px" style={{border:'none'}} title='Alpha One Motors Location' loading="lazy"></iframe>
            </div>
        </>
    );
};

export default ContactInfo;
