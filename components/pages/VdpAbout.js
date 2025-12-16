import React, { useState } from 'react';

const VdpAbout = ({ text }) => {
    const maxLength = 450;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => setIsExpanded(!isExpanded);

    const displayText = isExpanded ? text : text.slice(0, maxLength);

    return (
        <div className='vdpa-box vdpa-about-box'>
            <div className='xl-title mb-4 wow fadeInUp text-start text-uppercase font-3em' data-wow-delay="0.6s">About this Vehicle</div>
            <div className='vdp-text'>
                <p>{displayText}
                    {text.length > maxLength && (
                        <>
                            {!isExpanded && '... '}
                            <span
                                onClick={toggleReadMore}
                                className='vdp-read-more'
                            >
                                {isExpanded ? ' Read less' : ' Read more'}
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
};

export default VdpAbout;
