import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SrpLeft from '../Srp/SrpLeft';
import Image from 'next/image';
import { VehicleContext } from '../../context/VehicleContext';
import SearchComponent from '../Srp/SearchComponent';
import { getImages } from '../Common/const';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import dynamic from 'next/dynamic';
import InventoryItem from '../Srp/InventoryItem';
import ModalLayout from '../Common/ModalLayout';
import SelectFilterModal from '../Srp/SelectFilterModal';
import Header from '../Common/Header';
import Footer from '../Common/Footer';

export default function Inventory() {
    const router = useRouter();
    const { getVehicleData, vehicleData, filteredVehicleData, searchText, setSearchText, numberFormatter, priceFormatter, currentFilterData, setCurrentFilterData, activeFilter, setActiveFilter, priceFilterData, setPriceFilterData, } = useContext(VehicleContext);
    
    const [isSticky, setIsSticky] = useState(false);
    //const [srpFilter, setSrpFilter] = useState(false);
    //const [pageSize, setPageSize] = useState(50);
    const [isDataLoaded, setIsDataLoaded] = useState(true);
    const [isOpacity, setIsOpacity] = useState(true);
    const [value, setValue] = useState([priceFilterData.min, priceFilterData.max]);
    
    const handleInputChange = (index, event) => {
        let newValue = Number(event.target.value);
        if (!isNaN(newValue)) {
            const updatedValues = [...value];

            if (index === 0) {
                updatedValues[0] = newValue;
                if (newValue > updatedValues[1]) {
                    updatedValues[1] = newValue;
                }
            } else {
                updatedValues[1] = Math.max(newValue, updatedValues[0]);
            }
            setValue(updatedValues);
        }
    };

    const handlePriceSliderChange = (newValue) => {
        setPriceFilterData({ ...priceFilterData, ['current_min']: newValue[0], ['current_max']: newValue[1] });
    };

    // const handleMileageSliderChange = (newValue) => {
    //     setMileageFilterData({ ...mileageFilterData, ['current_min']: newValue[0], ['current_max']: newValue[1] });
    // };
    const [mobFilter, setMobFilter] = useState(false);
    const handleFilterBtn = () => {
        setMobFilter(!mobFilter)
    }
    const handleCloseFilter = () => {
        setMobFilter(false)
    }
    var srpCarSlider = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
    };


    useEffect(() => {
        if (filteredVehicleData) {
            setIsDataLoaded(false);
            setTimeout(() => {
                setIsOpacity(false);
            }, 100);
        }
        //console.log("filtered vehicle data", filteredVehicleData);
        //console.log("current filters",currentFilterData);
    }, [filteredVehicleData]);

    useEffect(() => {
        getVehicleData();

        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                const topSection = document.getElementById('srpFilter');
                if (topSection) {
                    const topSectionRect = topSection.getBoundingClientRect();
                    const isTopSectionVisible = topSectionRect.top <= 0;
                    setIsSticky(isTopSectionVisible);
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    
    const [openFilterModal, setOpenFilterModal] = useState(false);

    const [filterData, setFilterData] = useState([]);

    const handleFilterModal = (field) => {
        setOpenFilterModal(true);

        setFilterData(currentFilterData[field]);
        setActiveFilter(field);
        if (typeof document !== 'undefined') {
            document.body.classList.add('overflow-active');
        }
    };
    const closeMakeModal = () => {
        setOpenFilterModal(false)
        if (typeof document !== 'undefined') {
            document.body.classList.remove('overflow-active');
        }
    }

    const updateFilter = (filter_data) => {
        setCurrentFilterData({ ...currentFilterData, [activeFilter]: filter_data });
    }

    const clearFilter = (field) => {
        

        const filter_data = [];

        if (currentFilterData[field]) currentFilterData[field].forEach((v) => {
            filter_data.push({ ...v, isSelected: false })
        });

        setCurrentFilterData({ ...currentFilterData, [field]: filter_data });
    }

    const clearAllFilters = () => {
        clearFilter('year');
        clearFilter('make');
        clearFilter('model');
        clearFilter('trim');
        clearFilter('body_style');

        handlePriceSliderChange([priceFilterData.min, priceFilterData.max]);
        // handleMileageSliderChange([mileageFilterData.min, mileageFilterData.max]);

        const filter_data = {};

        Object.keys(currentFilterData).map((field) => {
            filter_data[field] = [];
            currentFilterData[field].forEach((v) => {
                filter_data[field].push({ ...v, isSelected: false })
            });
        });

        setCurrentFilterData(filter_data);

        // setLocationFilters(["Boerne, TX", "Austin, TX"]);
    }

    const openVDP = (vdp_url) => {
        if (typeof window !== 'undefined') {
            window.location.href = "/vdp";
        }
    }




    const vehicleMake = router.query.make || null;

    useEffect(() => {

        clearAllFilters();

        if (vehicleMake) {

            const filter_data = currentFilterData.make.map((v, i) => {
                return v.name.toLowerCase() == vehicleMake.toLowerCase() ? { ...v, "isSelected": true } : v;
            });

            setCurrentFilterData({ ...currentFilterData, ["make"]: filter_data });

        }

        

    }, [vehicleMake, vehicleData]);

    // const router = useRouter();
    // useEffect(() => {
    //     const preselected = router.query?.preselectedLocation;
    //
    //     if (preselected) {
    //         setLocationFilters([preselected]);
    //     }
    // }, [router.query?.preselectedLocation]);


    const [isSlMobile, setIsSlMobile] = useState(false);
    const handleSlResize = () => {
        if (typeof window !== 'undefined') {
            setIsSlMobile(window.innerWidth < 768);
        }
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            handleSlResize();
            window.addEventListener('resize', handleSlResize);
            return () => {
                window.removeEventListener('resize', handleSlResize);
            };
        }
    }, []);
    // Hover state moved to InventoryItem
    
    // Sort By data 
    const [sortColumn, setSortColumn] = useState('price');
    const [sortSelectValue, setSortSelectValue] = useState('price');
    const [sortOrder, setSortOrder] = useState(1);
    const handleSortByChange = (e) => {
        const sort_val = e.target.value;
        setSortSelectValue(sort_val);
        setSortOrder(sort_val.includes("_low") ? -1 : 1);
        setSortColumn(sort_val.replace("_low", ""));

        //console.log(sort_val,sort_val.includes("_low") ? -1 : 1)
    };
    const totalFilterCount =
        ((priceFilterData.current_min > priceFilterData.min || priceFilterData.current_max < priceFilterData.max) ? 1 : 0) +
        // ((mileageFilterData.current_min > mileageFilterData.min || mileageFilterData.current_max < mileageFilterData.max) ? 1 : 0) +
        Object.values(currentFilterData).reduce((count, items) => {
            return count + items.filter(item => item.isSelected).length;
        }, 0);
        const hasActiveFilters =
    (priceFilterData.current_min > priceFilterData.min || priceFilterData.current_max < priceFilterData.max) ||
    // (mileageFilterData.current_min > mileageFilterData.min || mileageFilterData.current_max < mileageFilterData.max) ||  // if used
    Object.keys(currentFilterData).some((key) =>
        currentFilterData[key].some(item => item.isSelected)
    );
    return (
        <>
            <Header />
            <section className='srp-wrap'>
                <div className='container'>
                    <div className='srp-flex d-flex'>
                        <SrpLeft
                            mobFilter={mobFilter}
                            handleCloseFilter={handleCloseFilter}
                            handlePriceSliderChange={handlePriceSliderChange}
                            // value={value}
                            // handleInputChange={handleInputChange}
                            handleFilterModal={handleFilterModal}
                            filteredVehicleData={filteredVehicleData}
                            numberFormatter={numberFormatter}
                            currentFilterData={currentFilterData}
                            priceFilterData={priceFilterData}
                            // mileageFilterData={mileageFilterData}
                            clearAllFilters={clearAllFilters}
                            // locationFilters={locationFilters}
                            // setLocationFilters={setLocationFilters}
                        // clearFilter={clearFilter}
                        />
                        <div className='srp-right'>
                            <div className='d-flex align-items-center srp-title-flex justify-content-between mb-3'>
                                <div className='srp-title text-uppercase'>Search Results</div>
                                <div className='d-lg-none'>
                                    <button type='button' className='filter-btn' onClick={handleFilterBtn}>
                                        Filters <img src={getImages('filter-icon.svg')} alt='icon' />
                                    </button>
                                </div>
                            </div>
                            <SearchComponent filteredVehicleData={filteredVehicleData} searchText={searchText} setSearchText={setSearchText} openVDP={openVDP} />

                            <div className={`selected-filter-flex ${totalFilterCount > 2 ? 'mob-filter-flex' : ''}`}>
                                <div className='d-lg-block selected-items'>
                                    <div className='d-flex align-lg-items-center flex-wrap'>
                                        {filteredVehicleData && <div className='sm-title fw-700 me-4 mb-lg-2 mb-2 mt-lg-0 mt-1 srp-result-count'>{filteredVehicleData.length} Results</div>}
                                        {hasActiveFilters && (
                                            <div className='tags-group-block' style={{ height: '40px', overflow: 'hidden' }}>
                                                <SimpleBar
                                                    style={{ maxHeight: '40px', whiteSpace: 'nowrap' }}
                                                    autoHide={true}
                                                >
                                                    <div className='tags-group d-flex align-items-center'>
                                                        {/* {locationFilters.map((item, index) =>
                                                            <div className='tag-btn me-2 mb-0' key={index}>{item}
                                                                <img
                                                                    src={getImages('close-anticon.svg')}
                                                                    alt="Remove"
                                                                    onClick={() => {
                                                                        clearFilter(item);

                                                                        setLocationFilters(locationFilters.filter((location) => location !== item));
                                                                    }}
                                                                    style={{ cursor: "pointer" }}
                                                                />
                                                            </div>
                                                        )} */}
                                                        {(priceFilterData.current_min > priceFilterData.min || priceFilterData.current_max < priceFilterData.max) && <div className='tag-btn me-2 mb-0'>Price {priceFilterData.current_min == priceFilterData.min ? "Min" : numberFormatter(priceFilterData.current_min, true)} - {priceFilterData.current_max == priceFilterData.max ? "Max" : numberFormatter(priceFilterData.current_max, true)} <img src={getImages('close-anticon.svg')} alt="Remove" onClick={() => { handlePriceSliderChange([priceFilterData.min, priceFilterData.max]) }} /></div>}
                                                        {/* {(mileageFilterData.current_min > mileageFilterData.min || mileageFilterData.current_max < mileageFilterData.max) && <div className='tag-btn me-2 mb-0'>Mileage {mileageFilterData.current_min == mileageFilterData.min ? "Min" : numberFormatter(mileageFilterData.current_min)} - {mileageFilterData.current_max == mileageFilterData.max ? "Max" : numberFormatter(mileageFilterData.current_max)} <img src={getImages('close-anticon.svg')} onClick={() => { handleMileageSliderChange([mileageFilterData.min, mileageFilterData.max]) }} /></div>} */}
                                                        {Object.keys(currentFilterData)
                                                            .filter((key) => currentFilterData[key].some(item => item.isSelected))
                                                            .map((key, index) => {
                                                                const displayLabel = key === 'body_style' ? 'Body Style' : key;

                                                                return (
                                                                    <div className='tag-btn me-2 mb-0' key={index}>
                                                                        {displayLabel}
                                                                        <img
                                                                            src={getImages('close-anticon.svg')}
                                                                            alt="Remove"
                                                                            onClick={() => clearFilter(key)}
                                                                            style={{ cursor: "pointer" }}
                                                                        />
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </SimpleBar>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='row g-4 mt-md-2'>
                                {/* {console.log("filteredVehicleData", filteredVehicleData)} */}
                                        {filteredVehicleData &&
                                    filteredVehicleData.sort((a, b) => (b[sortColumn] - a[sortColumn]) * sortOrder).map((item, index) => (
                                        <div className='col-xl-4 col-sm-6 col-12' key={index}>
                                            <div className='srp-box'
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {/* {console.log("item", item)} */}
                                                <div className='srp-top'>
                                                    {item.images.length > 0 ?
                                                        <>
                                                            {/* {(item.images.length > 2 && (isSlMobile || hoveredIndex === index)) ? ( */}             
                                                            {/* {console.log("item.images", item.images[0])} */}
                                                            <Slider className='srp-slider' {...srpCarSlider} >
                                                                {item.images && item.images.map((photo, j) => {
                                                                    if (j > 2) return false;
                                                                    return (
                                                                        <div onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} key={"vdp" + j}>
                                                                            <div className='inner'>
                                                                                <Image 
                                                                                    src={photo}
                                                                                    alt={`${item.year} ${item.make} ${item.model}`}
                                                                                    width={800}
                                                                                    height={533}
                                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </Slider>
                                                        </>
                                                        :
                                                        <div style={{ cursor: 'pointer' }} onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)} key={"vdp" + index}>
                                                            <Image src={getImages('srp_coming_soon.webp')} alt='' width={800} height={533} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                                        </div>
                                                    }
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
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {openFilterModal &&
                <ModalLayout open={openFilterModal} close={closeMakeModal} darkThemeCls='true' cls="dark-bg-modal" modalWidth={970}>
                    <SelectFilterModal
                        close={closeMakeModal}
                        filterData={filterData}
                        updateFilter={updateFilter}
                        activeFilter={activeFilter}
                        // locationFilters={locationFilters}
                    />
                </ModalLayout>
            }
            <Footer />
        </>
    )
}
