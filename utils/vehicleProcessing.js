export const getTopX = (arr, key, x) => {
    const sortedArr = [...arr].sort((a, b) => b[key] - a[key]);
    return sortedArr.slice(0, x);
};

export const processVehicleData = (vehicleList) => {
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

    vehicleList.map((v, i) => {
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

    const newFilters = {
        'year': Object.keys(vehicle_years).map(key => vehicle_years[key]).sort((b, a) => a.name - b.name),
        'make': Object.keys(vehicle_makes).map(key => vehicle_makes[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
        'model': Object.keys(vehicle_models).map(key => vehicle_models[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
        'trim': Object.keys(vehicle_trims).map(key => vehicle_trims[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0)),
        'body_style': Object.keys(vehicle_body_styles).map(key => vehicle_body_styles[key]).sort((b, a) => b.name > a.name ? 1 : (a.name > b.name ? -1 : 0))
    }

    return {
        vehicleData: vehicles,
        vehiclesByVIN: vehicles_by_vin,
        vehicleVINsbyID: vehicles_vins_by_id,
        featuredVehicles: getTopX(vehicles, 'price', 10),
        currentFilterData: newFilters,
        vehicleYears: Object.keys(vehicle_years),
        vehicleMakes: Object.keys(vehicle_makes),
        vehicleModels: Object.keys(vehicle_models),
        vehicleTrims: Object.keys(vehicle_trims),
        vehicleBodyStyles: Object.keys(vehicle_body_styles)
    };
}
