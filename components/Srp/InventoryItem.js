import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getImages } from '../Common/const';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const InventoryItem = ({ item, openVDP, priceFormatter, isSlMobile, priority = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const srpCarSlider = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
    };

    const shouldShowSlider = item.images.length > 0 && isHovered;
    
    const handleImageError = (e) => {
        e.target.src = getImages("unavailable_stockphoto.avif");
        e.target.onerror = null;
    };

    return (
        <div className='srp-box'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='srp-top'>
                {item.images.length > 0 ? (
                    <>
                        {(shouldShowSlider) ? (
                            <Slider className='srp-slider' {...srpCarSlider}>
                                {item.images.map((photo, j) => {
                                    if (j > 2) return null; // Limit to 3 images
                                    return (
                                        <div onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} key={"vdp" + j}>
                                            <div className='inner' style={{ aspectRatio: '800/533', position: 'relative', overflow: 'hidden' }}>
                                                <Image
                                                    src={photo}
                                                    alt={`${item.year} ${item.make} ${item.model}`}
                                                    width={800}
                                                    height={533}
                                                    sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={false} // Lazy load
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    unoptimized={true}
                                                    onError={handleImageError}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        ) : (
                            <div onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} style={{ cursor: 'pointer' }}>
                                <div className='inner' style={{ aspectRatio: '800/533', position: 'relative', overflow: 'hidden' }}>
                                    <Image
                                        src={item.images[0]}
                                        alt={`${item.year} ${item.make} ${item.model}`}
                                        width={800}
                                        height={533}
                                        sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        priority={priority}
                                        unoptimized={true}
                                        onError={handleImageError}
                                    />
                                </div>
                            </div>
                        )}
                    </>
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
                <div className='srpb-title1'>{item.year} {item.make} {item.model}</div>
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
