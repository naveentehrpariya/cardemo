import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const VehicleContext = createContext();

export const VehicleContextProvider = ({ children }) => {
    const baseURL = "https://alphaone.greenlightautomotivesolutions.com/";
    
    const Axios = axios.create({ baseURL: baseURL });

    const [vehicleData, setVehicleData] = useState(false);
    const [filteredVehicleData, setFilteredVehicleData] = useState(false);
    const [vehiclesByVIN, setVehiclesByVIN] = useState(false);
    const [vehicleVINsbyID, setVehicleVINsbyID] = useState({});

    const [searchText, setSearchText] = useState("");

    const [currentFilterData, setCurrentFilterData] = useState({ 'year': [], 'make': [], 'model': [], 'trim': [], 'body_style': [] });
    const [activeFilter, setActiveFilter] = useState("");

    const [priceFilterData, setPriceFilterData] = useState({ 'min': 0, 'max': 500000, 'current_min': 0, 'current_max': 500000 });

    const [vehicleYears, setVehicleYears] = useState([]);
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleTrims, setVehicleTrims] = useState([]);
    const [vehicleBodyStyles, setVehicleBodyStyles] = useState([]);

    const [featuredVehicles, setFeaturedVehicles] = useState([]);

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

            var vehicles = [];
            var vehicles_by_vin = {};
            var vehicles_vins_by_id = {};

            var found_lastest_drop = false;
            var latest_drop;

            var vehicle_years = {};
            var vehicle_makes = {};
            var vehicle_models = {};
            var vehicle_trims = {};
            var vehicle_body_styles = {};

            response.data.map((v, i) => {
                if (v.image_urls) {
                    v.images = v.image_urls.replaceAll('\\"', '').replaceAll('"', '').split(",");

                    v.vdp_hero_image = "https://s3-us-west-2.amazonaws.com/ethosautos/vdp/alphaone/" + v.vin + ".gif?new";

                    if (!found_lastest_drop && v['latest_drop']) {
                        v.LatestDrop = true;
                        latest_drop = v;
                        found_lastest_drop = true;
                    } else {
                        vehicles.push(v);
                        vehicles_by_vin[v.vin] = v;
                    }

                    if (latest_drop && i % 3 == 0 && i != 0) {
                        vehicles.push(latest_drop);
                        vehicles_by_vin[latest_drop.vin] = latest_drop;
                        latest_drop = null;
                    }
                }

                // Build filter data
                if (v.year in vehicle_years) {
                    vehicle_years[v.year]['available']++;
                    vehicle_years[v.year]['visible']++;
                    vehicle_years[v.year]['assocYears'].push(v.year);
                    vehicle_years[v.year]['assocMakes'].push(v.make);
                    vehicle_years[v.year]['assocModels'].push(v.model);
                    vehicle_years[v.year]['assocTrims'].push(v.trim);
                    vehicle_years[v.year]['assocBodyStyles'].push(v.body_style);
                } else vehicle_years[v.year] = { name: v.year, available: 1, visible: 1, isSelected: false, isVisible: true, assocYears: [v.year], assocMakes: [v.make], assocModels: [v.model], assocTrims: [v.trim], assocBodyStyles: [v.body_style] };

                if (v.make in vehicle_makes) {
                    vehicle_makes[v.make]['available']++;
                    vehicle_makes[v.make]['visible']++;
                    vehicle_makes[v.make]['assocYears'].push(v.year);
                    vehicle_makes[v.make]['assocMakes'].push(v.make);
                    vehicle_makes[v.make]['assocModels'].push(v.model);
                    vehicle_makes[v.make]['assocTrims'].push(v.trim);
                    vehicle_makes[v.make]['assocBodyStyles'].push(v.body_style);
                } else vehicle_makes[v.make] = { name: v.make, available: 1, visible: 1, isSelected: false, isVisible: true, assocYears: [v.year], assocMakes: [v.make], assocModels: [v.model], assocTrims: [v.trim], assocBodyStyles: [v.body_style] };

                if (v.model in vehicle_models) {
                    vehicle_models[v.model]['available']++;
                    vehicle_models[v.model]['visible']++;
                    vehicle_models[v.model]['assocYears'].push(v.year);
                    vehicle_models[v.model]['assocMakes'].push(v.make);
                    vehicle_models[v.model]['assocModels'].push(v.model);
                    vehicle_models[v.model]['assocTrims'].push(v.trim);
                    vehicle_models[v.model]['assocBodyStyles'].push(v.body_style);
                } else vehicle_models[v.model] = { name: v.model, available: 1, visible: 1, isSelected: false, isVisible: true, assocYears: [v.year], assocMakes: [v.make], assocModels: [v.model], assocTrims: [v.trim], assocBodyStyles: [v.body_style] };

                if (v.trim in vehicle_trims) {
                    vehicle_trims[v.trim]['available']++;
                    vehicle_trims[v.trim]['visible']++;
                    vehicle_trims[v.trim]['assocYears'].push(v.year);
                    vehicle_trims[v.trim]['assocMakes'].push(v.make);
                    vehicle_trims[v.trim]['assocModels'].push(v.model);
                    vehicle_trims[v.trim]['assocTrims'].push(v.trim);
                    vehicle_trims[v.trim]['assocBodyStyles'].push(v.body_style);
                } else vehicle_trims[v.trim] = { name: v.trim, available: 1, visible: 1, isSelected: false, isVisible: true, assocYears: [v.year], assocMakes: [v.make], assocModels: [v.model], assocTrims: [v.trim], assocBodyStyles: [v.body_style] };

                if (v.body_style in vehicle_body_styles) {
                    vehicle_body_styles[v.body_style]['available']++;
                    vehicle_body_styles[v.body_style]['visible']++;
                    vehicle_body_styles[v.body_style]['assocYears'].push(v.year);
                    vehicle_body_styles[v.body_style]['assocMakes'].push(v.make);
                    vehicle_body_styles[v.body_style]['assocModels'].push(v.model);
                    vehicle_body_styles[v.body_style]['assocTrims'].push(v.trim);
                    vehicle_body_styles[v.body_style]['assocBodyStyles'].push(v.body_style);
                } else vehicle_body_styles[v.body_style] = { name: v.body_style, available: 1, visible: 1, isSelected: false, isVisible: true, assocYears: [v.year], assocMakes: [v.make], assocModels: [v.model], assocTrims: [v.trim], assocBodyStyles: [v.body_style] };
            });

            setFeaturedVehicles(getTopX(vehicles, 'price', 10));
            setVehicleData(vehicles);
            setFilteredVehicleData(vehicles);
            setVehiclesByVIN(vehicles_by_vin);
            setVehicleVINsbyID(vehicles_vins_by_id);

            const newFilters = {
                'year': Object.keys(vehicle_years).map(key => vehicle_years[key]).sort((b, a) => a.name - b.name),
                'make': Object.keys(vehicle_makes).map(key => vehicle_makes[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
                'model': Object.keys(vehicle_models).map(key => vehicle_models[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
                'trim': Object.keys(vehicle_trims).map(key => vehicle_trims[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
                'body_style': Object.keys(vehicle_body_styles).map(key => vehicle_body_styles[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0))
            }

            setCurrentFilterData(newFilters);
            setVehicleYears(Object.keys(vehicle_years));
            setVehicleMakes(Object.keys(vehicle_makes));
            setVehicleModels(Object.keys(vehicle_models));
            setVehicleTrims(Object.keys(vehicle_trims));
            setVehicleBodyStyles(Object.keys(vehicle_body_styles));

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

        const response = await Axios.post('bridge/contact/', values);

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
        const { data } = await Axios.post('bridge/contact/s3_upload_file.php', values).catch(function (error) {
            if (error.response) console.log(error.response.data, error.response.status, error.response.headers);
            else if (error.request) console.log(error.request);
            else console.log('Error', error.message);
            console.log(error.config);
        });

        return data;
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
