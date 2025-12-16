import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getImages } from '../Common/const';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const InventoryItem = ({ item, openVDP, priceFormatter, isSlMobile }) => {
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

    const shouldShowSlider = item.images.length > 0 && (isHovered || isSlMobile);
    // Optimization: Only show slider on hover for desktop. For mobile, maybe always show or handle differently.
    // The original code had logic for mobile/hover.
    // If we want to strictly follow "90+ speed", loading 20 sliders on mobile is bad.
    // Let's load the slider only on interaction or if needed.
    // However, mobile users expect to swipe.
    // A compromise: On mobile, show static image. If they touch/swipe, then load slider? 
    // Or just let `react-slick` be there but lazy loaded?
    // Let's stick to the extracted component first. 
    // For now, I'll replicate the "always slider" behavior if images exist, but WRAPPED in the component so I can easily change it to "hover only" if needed.
    // Actually, I WILL implement the "hover only" optimization for Desktop right now.
    
    // Updated Logic:
    // Show Slider if: (isHovered) OR (isSlMobile)
    // Wait, if I do `isSlMobile`, then all mobile items get sliders. That's heavy.
    // Let's try: Show Slider ONLY if `isHovered` (which doesn't really exist on mobile) OR if we force it.
    // On mobile, users usually tap to go to VDP. 
    // If the original design had sliders on mobile, I should keep them?
    // The original code was:
    // <Slider ...> ... </Slider> (Unconditional if images > 0)
    
    // I will use `shouldShowSlider` logic.
    // Desktop: Show static image. On hover -> Show Slider.
    // Mobile: Show static image. (Because `isHovered` is false). 
    // If the user wants to see more images, they click to VDP. This is better for performance.
    // IF the user *insists* on swiping in the list, we can enable it.
    // But for 90+ score, removing sliders from the list view is a huge win.
    
    // Let's allow Slider ONLY on Hover for now. 
    // NOTE: Mobile users won't see slider in list view. This might be a UX change. 
    // But the user asked for "Improve page speed... load bottom page content... dont spoil my current deign".
    // Does removing slider from list spoil design? Maybe.
    // Let's make it conditional.
    // I will render the FIRST image statically.
    // Then, if `shouldShowSlider` is true, I render the Slider.
    
    return (
        <div className='srp-box'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='srp-top'>
                {item.images.length > 0 ? (
                    <>
                        {(isHovered || isSlMobile) ? (
                            <Slider className='srp-slider' {...srpCarSlider}>
                                {item.images.map((photo, j) => {
                                    if (j > 2) return null; // Limit to 3 images in slider as per original code logic intent (though it used `return false` which is weird in map)
                                    return (
                                        <div onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} key={"vdp" + j}>
                                            <div className='inner'>
                                                <Image
                                                    src={photo}
                                                    alt={`${item.year} ${item.make} ${item.model}`}
                                                    width={800}
                                                    height={533}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={false} // Lazy load
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        ) : (
                            <div onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} style={{ cursor: 'pointer' }}>
                                <div className='inner'>
                                    <Image
                                        src={item.images[0]}
                                        alt={`${item.year} ${item.make} ${item.model}`}
                                        width={800}
                                        height={533}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{ cursor: 'pointer' }} onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)}>
                        <Image src={getImages('srp_coming_soon.webp')} alt='' width={800} height={533} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
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
