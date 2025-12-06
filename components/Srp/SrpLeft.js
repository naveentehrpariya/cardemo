import React from 'react'
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { getImages } from '../Common/const';

const SrpLeft = ({
    mobFilter,
    handleCloseFilter,
    numberFormatter,
    handlePriceSliderChange,
    value,
    handleInputChange,
    handleFilterModal,
    filteredVehicleData,
    currentFilterData,
    priceFilterData,
    clearAllFilters,
    clearFilter
}) => {
    return (
        <>
            <div className={`srp-left ${mobFilter ? "open" : ""}`}>
                <div className='srpl-heading d-lg-none'>
                    <div className='csmodal-title'>Filters</div>
                    <button type='button' className='filter-close' onClick={handleCloseFilter}>
                        <img src={getImages('close-icon.webp')} alt='close' />
                    </button>
                </div>
                <div className='srpl-body'>
                    <div className='sl-card-box mb-3'>
                        <div className='xs-title'>Price Range</div>
                        <div className='price-range-slider'>
                            <RangeSlider
                                value={[priceFilterData?.current_min, priceFilterData?.current_max]}
                                onInput={handlePriceSliderChange}
                                min={priceFilterData?.min}
                                max={priceFilterData?.max}
                            />
                            <div className='d-flex align-items-center justify-content-between pr-labels'>
                                <div>{numberFormatter(priceFilterData?.current_min, true)}</div>
                                <div>{numberFormatter(priceFilterData?.current_max, true)}</div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between mt-3'>
                                <div>
                                    <input
                                        type="text"
                                        value={priceFilterData?.current_min == priceFilterData?.min ? "Min" : numberFormatter(priceFilterData?.current_min, true)}
                                        className='pr-input-field'
                                        onChange={(e) => handleInputChange(0, e)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={priceFilterData?.current_max == priceFilterData?.max ? "Max" : numberFormatter(priceFilterData?.current_max, true)}
                                        className='pr-input-field'
                                        onChange={(e) => handleInputChange(1, e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sl-list'>
                        <div className='row'>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.year?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("year");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('year.svg')} />
                                        </div>
                                        <div className='slc-title'>Year</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.make?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("make");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('make.svg')} />
                                        </div>
                                        <div className='slc-title'>Make</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.model?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("model");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('model.svg')} />
                                        </div>
                                        <div className='slc-title'>Model</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.mileage?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("mileage");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('mileage.svg')} />
                                        </div>
                                        <div className='slc-title'>Mileage</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.exterior_color?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("exterior_color");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('ext-color.svg')} />
                                        </div>
                                        <div className='slc-title'>Ext Color</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.interior_color?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("interior_color");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('int-color.svg')} />
                                        </div>
                                        <div className='slc-title'>Int Color</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.body_style?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("body_style");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('body-style.svg')} />
                                        </div>
                                        <div className='slc-title'>Body Style</div>
                                    </div>
                                </button>
                            </div>
                            <div className='col-md-6 col-6'>
                                <button type='button'
                                    className={`sl-card-box sl-sm-card text-center p-2 w-100 d-flex align-items-center ${currentFilterData.transmission?.some(item => item.isSelected) ? "active" : ""}`}
                                    onClick={() => {
                                        handleFilterModal("transmission");
                                    }}
                                >
                                    <div className='w-100'>
                                        <div className='mb-2'>
                                            <img src={getImages('transmission.svg')} />
                                        </div>
                                        <div className='slc-title'>Transmission</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-1 d-none d-lg-block'>
                    <button type='button' className='clear-filter-btn' onClick={() => {clearAllFilters()}}>Clear Filters</button>
                </div>
                <div className='d-lg-none'>
                    <div className='d-flex align-items-center justify-content-between filter-bottom'>
                        <div>
                            <button type='button' className='clear-filter-btn' onClick={() => clearAllFilters()}>
                                Clear All
                            </button>
                        </div>
                        <div>
                            {filteredVehicleData && <button type='button' className='black-btn get-started-btn text-uppercase px-4'>View {filteredVehicleData.length} Matches</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SrpLeft