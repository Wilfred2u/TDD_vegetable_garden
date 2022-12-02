// 1. Get yield for one plant
const getYieldForPlant = (crop, evFactor) => {
    const cropYield = crop.yield;
    const sunFactor = ((100 + crop.factor.sun[evFactor.sun]) / 100);

    return cropYield >= 0 ? cropYield * sunFactor : false;
};

// 2. Get yield for crop
const getYieldForCrop = (input, evFactor) => {
    const cropYield = input.crop.yield;
    const numPlants = input.numPlants;
    const sunFactor = ((100 + input.crop.factor.sun[evFactor.sun]) / 100);
    const windFactor = ((100 + input.crop.factor.wind[evFactor.wind]) / 100);

    return cropYield >= 0 && numPlants > 0 ? cropYield * numPlants * sunFactor * windFactor : false
};

//3. Get total yield
const getTotalYield = ({ crops }, evFactor) => {
    let cropYield;

    const totalYield = crops.reduce((currentTotal, item) => {
        const sunFactor = ((100 + item.crop.factor.sun[evFactor.sun]) / 100);
        const windFactor = ((100 + item.crop.factor.wind[evFactor.wind]) / 100);
        cropYield = item.crop.yield;
        const numPlants = item.numPlants;

        return (cropYield * numPlants * sunFactor * windFactor) + currentTotal
    }, 0)

    return cropYield >= 0 ? totalYield : false;
};

// 4. Get costs for crop
const getCostsForCrop = input => {
    const costs = input.crop.costs;
    const numPlants = input.numPlants

    return costs >= 0 ? costs * numPlants : false;
};


// 5. Get revenue for crop
const getRevenueForCrop = (input, evFactor) => {
    const salesPrice = input.crop.salesPrice;
    const cropYield = input.crop.yield;
    const numPlants = input.numPlants;
    const sunFactor = ((100 + input.crop.factor.sun[evFactor.sun]) / 100);
    const windFactor = ((100 + input.crop.factor.wind[evFactor.wind]) / 100);

    return cropYield >= 0 && numPlants > 0 ? salesPrice * cropYield * numPlants * sunFactor * windFactor : false
};

// 6. Get profit for crop
const getProfitForCrop = (input, evFactor) => {
    const costs = input.crop.costs;
    const salesPrice = input.crop.salesPrice;
    const cropYield = input.crop.yield;
    const numPlants = input.numPlants;
    const sunFactor = ((100 + input.crop.factor.sun[evFactor.sun]) / 100);
    const windFactor = ((100 + input.crop.factor.wind[evFactor.wind]) / 100);
    const cropRevenue = salesPrice * cropYield * numPlants * sunFactor * windFactor;
    const cropCosts = costs * numPlants;

    return cropYield >= 0 && numPlants > 0 ? cropRevenue - cropCosts : false;
};

// 7. Get total profit
const getTotalProfit = ({ crops }, evFactor) => {
    let cropYield;
    let numPlants;

    const totalProfit = crops.reduce((currentTotal, item) => {
        const costs = item.crop.costs;
        const salesPrice = item.crop.salesPrice;
        cropYield = item.crop.yield;
        numPlants = item.numPlants;
        const sunFactor = ((100 + item.crop.factor.sun[evFactor.sun]) / 100);
        const windFactor = ((100 + item.crop.factor.wind[evFactor.wind]) / 100);
        const cropRevenue = salesPrice * cropYield * numPlants * sunFactor * windFactor;
        const cropCosts = costs * numPlants;
        return (cropRevenue - cropCosts) + currentTotal
    }, 0)

    return cropYield >= 0 && numPlants > 0 ? totalProfit : false;
};

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
};