import React, { useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { getImages } from '../Common/const'
import { VehicleContext } from '../../context/VehicleContext';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });
const VdpContactForm = dynamic(() => import('./VdpContactForm'), { ssr: false });
const VdpVehicleInfo = dynamic(() => import('./VdpVehicleInfo'), { ssr: false });
const VdpAbout = dynamic(() => import('./VdpAbout'), { ssr: false });
import Header from '../Common/Header';
import Footer from '../Common/Footer';

const Vdp = () => {
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const [vehicleVIN, setVehicleVIN] = useState("");
    const { getVehicleData, vehiclesByVIN, vehicleVINsbyID, numberFormatter, priceFormatter, submitContactForm } = useContext(VehicleContext);

    const router = useRouter();
    // console.log("location", location)
    // console.log("vehiclesByVIN", vehiclesByVIN)
    // console.log("vehicleVIN", vehicleVIN)
    //console.log("vehicleVINsbyID", vehicleVINsbyID)
    // useEffect(() => {
    //     if (location && !vehicleVIN && vehiclesByVIN) {
    //         let vin = location.pathname.slice(location.pathname.lastIndexOf("-") + 1, location.pathname.length);
    //         if (vin in vehiclesByVIN) setVehicleVIN(vin);
    //         else if (vin in vehicleVINsbyID) {
    //             console.log("found vehicle ID", vin, vehicleVINsbyID[vin], vehicleVINsbyID);
    //             setVehicleVIN(vehicleVINsbyID[vin]);
    //         } else navigate("/cars-for-sale-boerne-tx");
    //     }
    // }, [location, vehiclesByVIN]);

    /*const defaultVehicleData = {
        exterior_color: "Gray",
        interior_color: "Rosso Ferrari",
        mileage: 2201,
        options_msrp: "42135",
        post_settings: null,
        price: "329000",
        stockno: "1017",
        tol: 23,
        year: 2021,
        make: "Ferrari",
        model: "812 GTS",
        trim: "Base",
        vdp_hero_image: getImages('new/hero-img.webp'),
        vehicle_name: "2018 Ferrari 488 Spider",
        description: `This one of a kind machine  clocks 0 - 60 in 4.5 seconds only one previous owner and only 600 have ever been made.  Its the perfect perfect piece for any collector lorem ipsum dolor sit amet, adipiscing elit, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. sed dompor aliqua…  <a href="#">Read more</a>`,
        vin: "ZFF97CMA4M0261467",
        body_style: "2D Convertible",
        images: [getImages('new/vdp-thumb1.webp'), getImages('new/vdp-thumb2.webp'), getImages('new/vdp-thumb3.webp'), getImages('new/vdp-thumb4.webp'), getImages('new/vdp-thumb5.webp'), getImages('new/vdp-thumb6.webp')],
        gallery_images: [[getImages('new/vdp-thumb1.webp'), getImages('new/vdp-thumb2.webp')], [getImages('new/vdp-thumb3.webp'), getImages('new/vdp-thumb4.webp')], [getImages('new/vdp-thumb5.webp'), getImages('new/vdp-thumb6.webp')]]
    
    };*/

    const [vehicleData, setVehicleData] = useState({});
    // console.log("vehicleData", vehicleData)
    const [vehicleExist, setVehicleExist] = useState(false);

    useEffect(() => {
        getVehicleData();
    }, [])

    useEffect(() => {
        if (vehicleVIN && vehiclesByVIN && vehicleVIN in vehiclesByVIN) {
            var vehicle_data = vehiclesByVIN[vehicleVIN];
            // console.log(vehicle_data);
            const split_index = Math.ceil((vehicle_data.images.length - 1) / 2);

            if (split_index > 0) {
                //var gallery_images = vehicle_data.images.slice(1).reduce(function (rows, key, index) {
                //    return (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows;
                //}, []);
                // console.log(vehicle_data.images.length - 1, split_index);
                var gallery_images = vehicle_data.images.slice(1).reduce(function (rows, key, index) {
                    return (index < split_index || vehicle_data.images.length - 1 <= 3 ? rows.push([key]) : rows[index - split_index].push(key)) && rows;
                }, []);
                vehicle_data.gallery_images = gallery_images;
            } else
                vehicle_data.gallery_images = vehicle_data.images.slice(1);
            // console.log(vehicle_data);
            setVehicleData(vehicle_data);
            setVehicleExist(true);
        }
    }, [vehicleVIN, vehiclesByVIN]);

    var srpCarSlider = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
    };

    // Mobile view condition
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [showAll, setShowAll] = useState(false);
    const visibleItems = showAll ? vehicleData?.descriptions : vehicleData?.descriptions?.slice(0, 6);
    const galleryRef = useRef(null);
    const openGallery = async () => {
        const flatImages = vehicleData?.gallery_images?.flat();
        const items = flatImages.map((src) => ({ src, type: "image" }));
        const mod = await import('@fancyapps/ui');
        mod.Fancybox.show(items);
    };
    const sectionRef = useRef(null);
    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const financeCalculatorRef = useRef(null);
    const scrollToFinanceCalculator = () => {
        financeCalculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const [monthlyPayment, setMonthlyPayment] = useState('--');
    // console.log("vehicleData", vehicleData)
    
    if (!vehicleData?.make) {
        return (
             <>
                <Header />
                <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', color: '#fff' }}>
                    Loading...
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <section className='vdp-wrap' style={{ position: 'relative' }}>
                <Image 
                    src={getImages('vdp-hero.webp')} 
                    alt="Hero" 
                    fill 
                    priority 
                    style={{ objectFit: 'cover' }}
                    sizes="100vw"
                />
            </section>
            <section className='vdp-hero-bottom cv-auto'>
                <div className='container'>
                    <div className='d-lg-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center vdpb-left'>
                            <div>
                                <div className='brand-logo'>
                                    <Image src={getImages(`logos/${vehicleData.make}.png`)} alt={`${vehicleData.make} logo`} width={64} height={64} />
                                </div>
                            </div>


                            
                            <div>
                                <div className='vdp-title1'>{vehicleData.year} {vehicleData.make}</div>
                                <div className='vdp-title2 mt-1'>{vehicleData.model}</div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between !pb-4 vdpb-right'>
                            <div className='lg:!me-[100px]'>
                                <div className=' vdp-label'>Price</div>
                                <div className='vdp-price'>{priceFormatter(vehicleData.price, true)}</div>
                            </div>
                            <div>
                                <button type='button' className='black-btn get-started-btn w-220 lg-btn text-uppercase'>Inquire</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='vdp-gallery-wrap cv-auto'>
                <div className='container'>
                    <div className='row vdpg-block'>
                        <div className='col-md-6 col-6'>
                            <div className='vdpg-box'>
                                <Image src={getImages('vdp-thumb1.webp')} alt='' width={320} height={180} sizes="(max-width: 768px) 50vw, 33vw" />
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='vdpg-box'>
                                <Image src={getImages('vdp-thumb2.webp')} alt='' width={320} height={180} sizes="(max-width: 768px) 50vw, 33vw" />
                            </div>
                        </div>
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box'>
                                <Image src={getImages('vdp-thumb3.webp')} alt='' width={320} height={180} sizes="(max-width: 768px) 50vw, 33vw" />
                            </div>
                        </div>
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box'>
                                <Image src={getImages('vdp-thumb4.webp')} alt='' width={320} height={180} sizes="(max-width: 768px) 50vw, 33vw" />
                            </div>
                        </div>
                        
                        <div className='col-md-4 col-6'>
                            <div className='vdpg-box position-relative'>
                                <Image src={getImages('vdp-thumb5.webp')} alt='' width={320} height={180} sizes="(max-width: 768px) 50vw, 33vw" />
                                <div className='vdpg-count'>+15</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='vdp-content-wrap cv-auto'>
                <div className='container'>
                    <div className='vdpa-block mt-xl-4 row'>
                        <div className='col-xl-4 order-xl-2 mb-3 mb-xl-0'>
                            <VdpVehicleInfo vehicleData={vehicleData} numberFormatter={numberFormatter} />
                        </div>
                        <div className='col-xl-8'>
                            <VdpAbout text={text} />
                            <div className='vdpa-box vdpa-question-box'>
                                <div id="gotAQuestion" ref={sectionRef} >
                                    <div className='lg-title mb-90 wow fadeInUp' data-wow-delay="0.6s">Got a question? <a href="#" className='text-theme'>Call</a> or <a href="#" className='text-theme'>Chat</a> live with a sales representative</div>
                                    <VdpContactForm vehicleData={vehicleData} submitContactForm={submitContactForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Vdp
