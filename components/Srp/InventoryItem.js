import React, { useState } from 'react';
import Image from 'next/image';
import { getImages } from '../Common/const';

const InventoryItem = ({ item, openVDP, priceFormatter, isSlMobile, priority = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorImages, setErrorImages] = useState({});

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentSlide(0); // Reset to first image on leave
    };

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev + 1) % Math.min(item.images.length, 3));
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev - 1 + Math.min(item.images.length, 3)) % Math.min(item.images.length, 3));
    };

    const handleImageError = () => {
        setErrorImages(prev => ({ ...prev, [currentSlide]: true }));
    };
    
    // Determine which image to show
    const displayImage = errorImages[currentSlide] 
        ? getImages("unavailable_stockphoto.webp")
        : (item.images && item.images.length > 0 ? item.images[currentSlide] : null);

    return (
        <div className='srp-box'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='srp-top'>
                {item.images.length > 0 ? (
                    <div className="position-relative" onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} style={{ cursor: 'pointer' }}>
                        <div className='inner' style={{ aspectRatio: '800/533', position: 'relative', overflow: 'hidden' }}>
                            <Image
                                src={displayImage}
                                alt={`${item.year} ${item.make} ${item.model}`}
                                width={800}
                                height={533} quality={10}
                                placeholder="blur"
                                blurDataURL={`${displayImage}'q=1')}`}
                                sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                priority={priority && currentSlide === 0}
                                onError={handleImageError}
                                fetchPriority={priority && currentSlide === 0 ? "high" : "auto"}
                            />
                        </div>
                        
                        {/* Navigation Arrows */}
                        {isHovered && item.images.length > 1 && (
                            <>
                                <button 
                                    className="slick-prev slick-arrow" 
                                    style={{ 
                                        display: 'block', 
                                        left: '10px', 
                                        zIndex: 10,
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '30px',
                                        height: '30px',
                                        background: `url(${getImages('mob-review-prev.svg')}) center center / contain no-repeat`,
                                        border: 'none',
                                        fontSize: 0,
                                        cursor: 'pointer'
                                    }}
                                    onClick={prevSlide}
                                    aria-label="Previous"
                                    type="button"
                                >
                                </button>
                                <button 
                                    className="slick-next slick-arrow" 
                                    style={{ 
                                        display: 'block', 
                                        right: '10px', 
                                        zIndex: 10,
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '30px',
                                        height: '30px',
                                        background: `url(${getImages('mob-review-next.svg')}) center center / contain no-repeat`,
                                        border: 'none',
                                        fontSize: 0,
                                        cursor: 'pointer'
                                    }}
                                    onClick={nextSlide}
                                    aria-label="Next"
                                    type="button"
                                >
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div style={{ cursor: 'pointer' }} onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)}>
                        <div className='inner' style={{ aspectRatio: '800/533', position: 'relative', overflow: 'hidden' }}>
                            <Image 
                                src={getImages('srp_coming_soon.webp')} 
                                alt='' 
                                width={800} 
                                height={533} 
                                sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                priority={priority}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='srp-bottom'>
                <div className='srpb-title1 min-h-[60px] line-clamp-2'>{item.year}{item.year}{item.year}  {item.make} {item.model}</div>
                <div className='srpb-title2'>{item.trim || '\u00A0'}</div>
                <div className='xs-title font-0-9em fw-400 mb-2 srpt-desc'>{item.desc}</div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        {item?.carColors?.length > 0 && (
                            <div className='position-relative sr-color-block me-3'>
                                {item.carColors?.map((colorItem, colorIndex) => (
                                    <span
                                        key={colorIndex}
                                        className="sr-color"
                                        style={{ background: colorItem }}
                                    ></span>
                                ))}
                            </div>
                        )}
                        <div className='srpb-mileage'>{priceFormatter(item.mileage)}mi</div>
                    </div>
                    <div className='srpb-price'>{priceFormatter(item.price, true)}</div>
                </div>
                <div className='mt-2'>
                    <button className='white-btn w-100 d-block text-uppercase' type='button' onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)}>View</button>
                </div>
            </div>
        </div>
    );
};

export default InventoryItem;
