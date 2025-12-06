import React, { useState, useEffect } from 'react'
import { getImages } from '../Common/const';


const SelectFilterModal = ({ close,updateFilter,activeFilter, filterData, locationFilters = ["Boerne, TX", "Austin, TX"] }) => {
    const [boxes, setBoxes] = useState(filterData);

    const [selectedCount, setSelectedCount] = useState(0);

    const handleCheckboxChange = (index) => {
        const newBoxes = [...boxes];
        newBoxes[index].isSelected = !newBoxes[index].isSelected;
        setBoxes(newBoxes);

        updateFilter(newBoxes);

        setSelectedCount(selectedCount + (newBoxes[index].isSelected ? 1 : -1) * newBoxes[index]['available']);
    };
    const clearAllSelections = () => {
        const newBoxes = [];

        boxes.forEach((v) => {
            newBoxes.push({...v,isSelected:false})
        });

        setBoxes(newBoxes);

        updateFilter(newBoxes);

        setSelectedCount(0);
    };

    useEffect(() => {
        var selected = 0;

        for(var key in filterData) {
            selected += filterData[key].isSelected ? filterData[key].available : 0;
        }

        setSelectedCount(selected);
        setBoxes(filterData);
    }, [filterData]);
    return (
        <>
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title filter-modal-title">
                        Select {activeFilter}
                    </h1>
                    <button className="sm-box-close" type="button" onClick={close}>
                        <img src={getImages('white-close.svg')}/>
                    </button>
                </div>
                <div className="modal-body px-4 py-4">
                    <div className='row make-box-list'>
                        {boxes?.map((v, i) => {
                            if(!v.isVisible) return false;
                            return(
                                <div className='col-md-4 my-2' key={i}>
                                    <div className={`make-box d-flex align-items-center justify-content-between ${v.isSelected ? 'selected' : ''}`}>
                                        <div>
                                            <div className='sm-title fw-700 mb-2'>{v.name}</div>
                                            <div className='xs-title fw-300 font-13 text-white'>{(locationFilters.includes("Austin, TX") ? v.available_austin  : 0) + (locationFilters.includes("Boerne, TX") ? v.available_boerne  : 0)} available</div>
                                        </div>
                                        <div>
                                            <label className="cs-checkbox">
                                                <input type="checkbox"
                                                id={`${activeFilter}Box${i}`}
                                                checked={v.isSelected}
                                                onChange={() => handleCheckboxChange(i)}/>
                                                <label htmlFor={`${activeFilter}Box${i}`}></label>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="modal-footer d-flex align-items-center justify-content-between">
                    <div>
                        <button className='transparent-btn text-green text-decoration-underline' type='button' onClick={clearAllSelections}>Clear Selection</button>
                    </div>
                    <div>
                        <button className='btn-theme view-match-btn' type='button' onClick={close}>{"View " + (selectedCount > 0 ? selectedCount + " " : "") + "Match" + ((selectedCount > 1 || selectedCount == 0 ? "es" : ""))}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectFilterModal