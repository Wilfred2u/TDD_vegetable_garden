const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./vegetable_garden.js");

// 1. Get yield for one plant
describe("getYieldForPlant", () => {
    test("Get yield for plant with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: 0,
                    medium: 0,
                    high: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(3);
    });
    test("Get yield for plant with no environment factors, negative yield-number", () => {
        const corn = {
            name: "corn",
            yield: -3,
            factor: {
                sun: {
                    low: 0,
                    medium: 0,
                    high: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(false);
    });
    test("Get yield for plant with low sun factor", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.5);
    });
    test("Get yield for plant with high sun factor", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(4.5);
    });
});

// 2. Get yield for crop
describe("getYieldForCrop", () => {
    test("Get yield for crop with high sun and high wind", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const input = {
            crop: corn,
            numPlants: 10,
        };
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(18);
    });
    test("Get yield for crop, number of plants = 0", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const input = {
            crop: corn,
            numPlants: 0,
        };
        const environmentFactors = {
            sun: "high",
            wind: "high",
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(false);
    });
});

//3. Get total yield
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: 0,
                    medium: 0,
                    high: 0,
                },
                wind: {
                    high: 0,
                    medium: 0,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        const crops = [
            { crop: corn, numPlants: 5 },
            { crop: pumpkin, numPlants: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBeGreaterThan(0);
    });
    test("Calculate total yield with multiple crops with high sun and medium wind factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -25,
                    medium: -10,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        const crops = [
            { crop: corn, numPlants: 5 },
            { crop: pumpkin, numPlants: 2 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBeGreaterThan(0);
    });
    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -60,
                    medium: -30,
                    low: 0,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -25,
                    medium: -10,
                    low: 0,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        const crops = [
            { crop: corn, numPlants: 0 },
            { crop: pumpkin, numPlants: 0 },
        ];
        expect(getTotalYield({ crops }, environmentFactors)).toBe(0);
    });
});

// 4. Get costs for crop
describe("getCostsForCrop", () => {
    test("Get costs for crop", () => {
        const carrot = {
            name: "carrot",
            costs: 0.5,
        };
        const input = {
            crop: carrot,
            numPlants: 30,
        };
        expect(getCostsForCrop(input)).toBe(15);
    });
    test("Get costs for crop, negative costs", () => {
        const cabbage = {
            name: "cabbage",
            costs: -1,
        };
        const input = {
            crop: cabbage,
            numPlants: 30,
        };
        expect(getCostsForCrop(input)).toBe(false);
    });
});

// 5. Get revenue for crop
describe("getRevenueForCrop", () => {
    test("Get revenue for crop with no environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            salesPrice: 2.5,
            yield: 4,
            factor: {
                sun: {
                    low: 0,
                    medium: 0,
                    high: 0,
                },
                wind: {
                    high: 0,
                    medium: 0,
                    low: 0,
                },
            },
        };
        const input = {
            crop: pumpkin,
            numPlants: 2,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(20);
    });
    test("Get revenue for crop with medium sun and low wind factors", () => {
        const pumpkin = {
            name: "pumpkin",
            salesPrice: 2.5,
            yield: 4,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -50,
                    medium: -30,
                    low: 10,
                },
            },
        };
        const input = {
            crop: pumpkin,
            numPlants: 2,
        };
        const environmentFactors = {
            sun: "medium",
            wind: "low",
        };
        expect(getRevenueForCrop(input, environmentFactors)).toBe(22);
    });
});

// 6. Get profit for crop
describe("getProfitForCrop", () => {
    test("Get profit for crop with no environment factors", () => {
        const pumpkin = {
            name: "pumpkin",
            salesPrice: 2.5,
            costs: 1,
            yield: 4,
            factor: {
                sun: {
                    low: 0,
                    medium: 0,
                    high: 0,
                },
                wind: {
                    high: 0,
                    medium: 0,
                    low: 0,
                },
            },
        };
        const input = {
            crop: pumpkin,
            numPlants: 2,
        };
        const environmentFactors = {
            sun: "medium",
            wind: "low",
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(18);
    });
    test("Get profit for crop with high sun and medium wind factors", () => {
        const pumpkin = {
            name: "pumpkin",
            salesPrice: 2.5,
            costs: 1,
            yield: 4,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -50,
                    medium: -30,
                    low: 10,
                },
            },
        };
        const input = {
            crop: pumpkin,
            numPlants: 2,
        };
        const environmentFactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getProfitForCrop(input, environmentFactors)).toBe(19);
    });
});
// 7. Get total profit
describe("getTotalProfit", () => {
    test("Calculate total profit with multiple crops with low sun and high wind factors", () => {
        const corn = {
            name: "corn",
            salesPrice: 2,
            costs: 0.5,
            yield: 3,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -50,
                    medium: -30,
                    low: 10,
                },
            },
        };
        const potato = {
            name: "potato",
            salesPrice: 2.75,
            costs: 1,
            yield: 6,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -10,
                    medium: 0,
                    low: 10,
                },
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "high",
        };
        const crops = [
            { crop: corn, numPlants: 5 },
            { crop: potato, numPlants: 3 },
        ];
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(30.23);
    });
    test("Calculate total profit with multiple crops with high sun and low wind factors", () => {
        const corn = {
            name: "corn",
            salesPrice: 2,
            costs: 0.5,
            yield: 3,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -50,
                    medium: -30,
                    low: 10,
                },
            },
        };
        const potato = {
            name: "potato",
            salesPrice: 2.75,
            costs: 1,
            yield: 6,
            factor: {
                sun: {
                    low: -40,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    high: -10,
                    medium: 0,
                    low: 10,
                },
            },
        };
        const environmentFactors = {
            sun: "high",
            wind: "low",
        };
        const crops = [
            { crop: corn, numPlants: 5 },
            { crop: potato, numPlants: 3 },
        ];
        expect(getTotalProfit({ crops }, environmentFactors)).toBeGreaterThan(125);
    });
});