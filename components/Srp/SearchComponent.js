import React, { useState, useEffect, useRef } from 'react';
import { getImages } from '../Common/const';

const SearchComponent = ({filteredVehicleData, searchText, setSearchText, openVDP}) => {
    const [isVisible, setIsVisible] = useState(false);

    const sectionRef = useRef(null);

    const handleClickOutside = (event) => {
        if (sectionRef.current && !sectionRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, []);

    const searchTimerRef = useRef(null);

    useEffect(() => {

        if(searchText == "") return;

        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 20000)

        return () => {
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
        };
    },[searchText]);

    //const [timer, setTimer] = useState(null);
    //const [vehicleSearchText, setVehicleSearchText] = useState("");

    const searchInputChanged = (val) => {

        setSearchText(val);
        setIsVisible(true);

        /*setVehicleSearchText(val);

        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setSearchText(val);
        }, 500)

        setTimer(newTimer)*/
    }

  return (
    /*<div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Section
      </button>
      {isVisible && (
        <div ref={sectionRef} style={{ border: '1px solid black', padding: '10px' }}>
          This is the section to hide.
        </div>
      )}
    </div>*/
    <div className='position-relative srr-search-block'>
        <div className='d-inline-flex srr-search-box mb-3'>
            <div className='srs-field'>
                <input
                    type='text'
                    className='form-control w-100'
                    placeholder='Search by make, model, or keyword. Ex: “Ferrari Spider”'
                    value={searchText}
                    onChange={(e) => { searchInputChanged(e.target.value) }}
                />
            </div>
            <div>
                <button className='black-btn lg-btn srs-btn' type='button' >
                    <span className='d-none d-md-block'>Search</span>
                    <span className='d-md-none 2'>
                        <img className='ms-3' src={getImages('search-icon.svg')} alt='search' />
                    </span>
                </button>
            </div>
        </div>
        {isVisible && <ul className='fdm-list' ref={sectionRef}>
            {filteredVehicleData.length > 0 ? (
                filteredVehicleData.map((item, index) => (
                    <li key={index}>
                        <button
                            type='button'
                            onClick={() => openVDP(item.vdp_url ?? "used-" + item.vin)}
                            className='d-block'
                        >
                            {item.images[0] && <img src={item.images[0]} alt={`${item.year} ${item.make} ${item.model}`} onError={(e) => { e.target.src = getImages("unavailable_stockphoto.webp") }} />}
                            <div className='fd-title'>{item.year} {item.make} {item.model} {item.trim}</div>
                        </button>
                    </li>
                ))
            ) : (
                <li className="text-muted">No results found</li>
            )}
        </ul>}
    </div>


  );
}

export default SearchComponent;
