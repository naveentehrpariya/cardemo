import React, { useState } from 'react';

const VdpVehicleInfo = ({ vehicleData, numberFormatter }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    
    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = vehicleData.vin;
        textArea.style.position = 'absolute';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showTooltip();
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
        document.body.removeChild(textArea);
    };

    const showTooltip = () => {
        setTooltipVisible(true);
        setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
    };

    return (
        <div className='vdpa-box p-4 h-100'>
            <div className='lg-title text-uppercase fw-400 mb-3 wow fadeInUp' data-wow-delay="0.2s">Vehicle Info</div>
            <div className='vdpa-table'>
                <table className='w-100'>
                    <tbody>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Stock</th>
                            <td>{vehicleData.stockno}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>VIN</th>
                            <td className="text-nowrap">
                                <span className='position-relative copy-info'>
                                    <span className='copy_icon' onClick={handleCopy} style={{ cursor: 'pointer' }}></span>
                                    {tooltipVisible && <span className='copy-tooltip'>Copied!</span>}
                                </span>
                                {vehicleData.vin}
                            </td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Year</th>
                            <td>{vehicleData.year}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Make</th>
                            <td>{vehicleData.make}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Model</th>
                            <td>{vehicleData.model}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Trim</th>
                            <td>{vehicleData.trim}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Mileage</th>
                            <td>{numberFormatter(vehicleData.mileage, false, false)}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Body Style</th>
                            <td>{vehicleData.body_style}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Exterior Color</th>
                            <td>{vehicleData.exterior_color}</td>
                        </tr>
                        <tr className='wow fadeInUp' data-wow-delay="0.2s">
                            <th>Interior Color</th>
                            <td>{vehicleData.interior_color}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='mt-4 mb-2 wow fadeInUp' data-wow-delay="0.2s">
                <div className='text-center'>
                    {/* Carfax logo commented out in original */}
                </div>
            </div>
        </div>
    );
};

export default VdpVehicleInfo;
