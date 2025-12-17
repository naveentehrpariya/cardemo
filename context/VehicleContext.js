import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { processVehicleData, getTopX } from '../utils/vehicleProcessing';

export const VehicleContext = createContext();

export const VehicleContextProvider = ({ children, initialData }) => {
    const baseURL = "https://alphaone.greenlightautomotivesolutions.com/";
    
    const Axios = axios.create({ baseURL: baseURL });

    const [vehicleData, setVehicleData] = useState(initialData?.vehicleData || false);
    const [filteredVehicleData, setFilteredVehicleData] = useState(initialData?.vehicleData || false);
    const [vehiclesByVIN, setVehiclesByVIN] = useState(initialData?.vehiclesByVIN || false);
    const [vehicleVINsbyID, setVehicleVINsbyID] = useState(initialData?.vehicleVINsbyID || {});

    const [searchText, setSearchText] = useState("");

    const [currentFilterData, setCurrentFilterData] = useState(initialData?.currentFilterData || { 'year': [], 'make': [], 'model': [], 'trim': [], 'body_style': [] });
    const [activeFilter, setActiveFilter] = useState("");

    const [priceFilterData, setPriceFilterData] = useState({ 'min': 0, 'max': 500000, 'current_min': 0, 'current_max': 500000 });

    const [vehicleYears, setVehicleYears] = useState(initialData?.vehicleYears || []);
    const [vehicleMakes, setVehicleMakes] = useState(initialData?.vehicleMakes || []);
    const [vehicleModels, setVehicleModels] = useState(initialData?.vehicleModels || []);
    const [vehicleTrims, setVehicleTrims] = useState(initialData?.vehicleTrims || []);
    const [vehicleBodyStyles, setVehicleBodyStyles] = useState(initialData?.vehicleBodyStyles || []);

    const [featuredVehicles, setFeaturedVehicles] = useState(initialData?.featuredVehicles || []);

    const getVehicleData = async () => {
        if (vehicleData) return;

        try {
            var values = {
                "dealership_id": "wholesale-298",
                "sort_inventory": true
            };

            const response = await Axios.get('bridge/inventory/inventory.php', {
                retry: 0, retryDelay: 3000, params: values
            });

            const processedData = processVehicleData(response.data);

            setFeaturedVehicles(processedData.featuredVehicles);
            setVehicleData(processedData.vehicleData);
            setFilteredVehicleData(processedData.vehicleData);
            setVehiclesByVIN(processedData.vehiclesByVIN);
            setVehicleVINsbyID(processedData.vehicleVINsbyID);
            setCurrentFilterData(processedData.currentFilterData);
            setVehicleYears(processedData.vehicleYears);
            setVehicleMakes(processedData.vehicleMakes);
            setVehicleModels(processedData.vehicleModels);
            setVehicleTrims(processedData.vehicleTrims);
            setVehicleBodyStyles(processedData.vehicleBodyStyles);

        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return {};
        }
    };

    const getTopX = (arr, key, x) => {
        const sortedArr = [...arr].sort((a, b) => b[key] - a[key]);
        return sortedArr.slice(0, x);
    }

    const filterVehicleData = (vehicleData) => {
        var filteredResults = vehicleData;

        if (searchText) {
            filteredResults = vehicleData.filter(vehicle =>
                searchText.toLowerCase().split(' ').every(item => vehicle.vehicle_name.toLowerCase().includes(item)) ||
                (vehicle.vin && vehicle.vin.toLowerCase().includes(searchText.toLowerCase()))
            );
        }

        filteredResults = filterByField(filteredResults, 'year');
        filteredResults = filterByField(filteredResults, 'make');
        filteredResults = filterByField(filteredResults, 'model');
        filteredResults = filterByField(filteredResults, 'trim');
        filteredResults = filterByField(filteredResults, 'body_style');

        if (priceFilterData.current_min != priceFilterData.min) {
            filteredResults = filteredResults.filter(vehicle => vehicle.price >= priceFilterData.current_min);
        }

        if (priceFilterData.current_max != priceFilterData.max) {
            filteredResults = filteredResults.filter(vehicle => vehicle.price <= priceFilterData.current_max);
        }

        setFilterVisibility();

        Object.keys(currentFilterData).map((i) => {
            currentFilterData[i].map((filter, j) => {
                currentFilterData[i][j].visible = 0;
                Object.keys(filteredResults).map((x) => {
                    if (filteredResults[x][i] == filter['name']) currentFilterData[i][j].visible++;
                });
            });
        });

        return filteredResults;
    }

    const filterByField = (current_data, field) => {
        var current_filter = [];

        current_filter = currentFilterData[field].filter((v) => v.isSelected).map(a => a.name);

        if (current_data && current_filter.length > 0) {
            current_data = current_data.filter(vehicle =>
                current_filter.includes(vehicle[field])
            );
        }

        return current_data;
    }

    const setFilterVisibility = () => {
        var selectedYears = currentFilterData['year'].filter((v) => v.isSelected);
        var selectedMakes = currentFilterData['make'].filter((v) => v.isSelected);
        var selectedModels = currentFilterData['model'].filter((v) => v.isSelected);
        var selectedTrims = currentFilterData['trim'].filter((v) => v.isSelected);

        var visible_makes = vehicleMakes;
        var visible_models = vehicleModels;
        var visible_trims = vehicleTrims;
        var visible_body_styles = vehicleBodyStyles;

        if (selectedYears.length > 0) visible_makes = selectedYears.flatMap((v, i) => { return v.assocMakes; }).filter(w => visible_makes.includes(w));

        currentFilterData['make'].map((v, i) => {
            currentFilterData['make'][i].isVisible = (selectedYears.length == 0) || visible_makes.includes(v.name);
        });

        if (selectedYears.length > 0) visible_models = selectedYears.flatMap((v, i) => { return v.assocModels; }).filter(w => visible_models.includes(w));
        if (selectedMakes.length > 0) visible_models = selectedMakes.flatMap((v, i) => { return v.assocModels; }).filter(w => visible_models.includes(w));

        currentFilterData['model'].map((v, i) => {
            currentFilterData['model'][i].isVisible = (selectedYears.length == 0 && selectedMakes.length == 0) || visible_models.includes(v.name);
        });

        if (selectedYears.length > 0) visible_trims = selectedYears.flatMap((v, i) => { return v.assocTrims; }).filter(w => visible_trims.includes(w));
        if (selectedMakes.length > 0) visible_trims = selectedMakes.flatMap((v, i) => { return v.assocTrims; }).filter(w => visible_trims.includes(w));
        if (selectedModels.length > 0) visible_trims = selectedModels.flatMap((v, i) => { return v.assocTrims; }).filter(w => visible_trims.includes(w));

        currentFilterData['trim'].map((v, i) => {
            currentFilterData['trim'][i].isVisible = (selectedYears.length == 0 && selectedMakes.length == 0 && selectedModels.length == 0) || visible_trims.includes(v.name);
        });

        if (selectedYears.length > 0) visible_body_styles = selectedYears.flatMap((v, i) => { return v.assocBodyStyles; }).filter(w => visible_body_styles.includes(w));
        if (selectedMakes.length > 0) visible_body_styles = selectedMakes.flatMap((v, i) => { return v.assocBodyStyles; }).filter(w => visible_body_styles.includes(w));
        if (selectedModels.length > 0) visible_body_styles = selectedModels.flatMap((v, i) => { return v.assocBodyStyles; }).filter(w => visible_body_styles.includes(w));
        if (selectedTrims.length > 0) visible_body_styles = selectedTrims.flatMap((v, i) => { return v.assocBodyStyles; }).filter(w => visible_body_styles.includes(w));

        currentFilterData['body_style'].map((v, i) => {
            currentFilterData['body_style'][i].isVisible = (selectedYears.length == 0 && selectedMakes.length == 0 && selectedModels.length == 0 && selectedModels.length == 0 && selectedTrims.length == 0) || visible_body_styles.includes(v.name);
        });
    }

    const numberFormatter = (value, currency = false, includeK = true) => {
        var num = value ? value.toString().replace(/[^0-9\.]+/g, "") : 0;
        var thousands = num >= 1000;

        if (thousands && includeK) num = Math.round(num / 100) / 10;

        var sign = num >= 0 ? "" : "-";
        var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
        if (str.indexOf(".") > 0) {
            parts = str.split(".");
            str = parts[0];
        }
        str = str.split("").reverse();
        for (var j = 0, len = str.length; j < len; j++) {
            if (str[j] != ",") {
                output.push(str[j]);
                if (i % 3 == 0 && j < (len - 1)) {
                    output.push(",");
                }
                i++;
            }
        }
        formatted = output.reverse().join("");
        return ((currency ? "$" : "") + sign + formatted + ((parts) ? "." + parts[1].substr(0, 2) : "") + (thousands && includeK ? "k" : ""));
    }

    const priceFormatter = (value, currency = false) => {
        var num = value ? value.toString().replace(/[^0-9\.]+/g, "") : 0;

        var sign = num >= 0 ? "" : "-";
        var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
        if (str.indexOf(".") > 0) {
            parts = str.split(".");
            str = parts[0];
        }
        str = str.split("").reverse();
        for (var j = 0, len = str.length; j < len; j++) {
            if (str[j] != ",") {
                output.push(str[j]);
                if (i % 3 == 0 && j < (len - 1)) {
                    output.push(",");
                }
                i++;
            }
        }
        formatted = output.reverse().join("");
        return ((currency ? "$" : "") + sign + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
    }

    const submitContactForm = async (values) => {
        if (typeof window !== 'undefined') {
            const referrer = getCookie('__gtm_referrer');
            const gtm_info = getCookie('__gtm_campaign_url');

            if (referrer) values.referrer = referrer;
            if (gtm_info) values.gtm_info = gtm_info;
        }

        let response;
        try {
            response = await Axios.post('bridge/contact/', values);
        } catch (error) {
            try {
                response = await axios.post('/api/contact-proxy', values);
            } catch (error2) {
                if (error2 && error2.response && error2.response.data) return error2.response.data;
                return { error: 'Network Error' };
            }
        }

        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({ 'event': 'gasFormEvent', 'eventCategory': 'Submit', 'eventAction': 'GAS Form Submission' });
        }

        return response.data ? response.data : response;
    }

    const getCookie = (key) => {
        if (typeof document === 'undefined') return "";
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const uploadDocument = async (values) => {
        try {
            const response = await Axios.post('bridge/contact/s3_upload_file.php', values);
            return response?.data || {};
        } catch (error) {
            if (error && error.response && error.response.data) {
                return error.response.data;
            }
            const message = error && error.message ? error.message : 'Upload failed';
            return { error: message };
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.pathname.includes("inventory") || window.location.pathname.includes("vdp")) {
                getVehicleData();
            }
        }
    }, []);

    useEffect(() => {
        if (vehicleData) {
            setFilteredVehicleData(filterVehicleData(vehicleData));
        }
    }, [searchText, currentFilterData, priceFilterData]);

    return (
        <VehicleContext.Provider value={{ 
            vehicleData, 
            getVehicleData, 
            featuredVehicles, 
            numberFormatter, 
            priceFormatter, 
            filteredVehicleData, 
            searchText, 
            setSearchText, 
            vehiclesByVIN, 
            vehicleVINsbyID,
            currentFilterData, 
            setCurrentFilterData, 
            activeFilter, 
            setActiveFilter, 
            submitContactForm, 
            priceFilterData, 
            setPriceFilterData, 
            uploadDocument 
        }}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContextProvider;
