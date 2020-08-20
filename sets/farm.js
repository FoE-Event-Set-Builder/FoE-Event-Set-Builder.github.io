let barn = {
    name: "Harvest Barn",
    text: "B",
    size: [4,3],
    road: true,
    level: [{
        id: "R_MultiAge_FallBonus20a",
        rewards: [
            { type: "happiness", values: [350,610,670,750,830,980,1100,1210,1300,1350,1570,1910,2290,2660,3070,3670,5870,6380]},
            { type: "population", values: [85,183,280,394,517,652,797,951,1115,1285,1465,1651,1846,2048,2255,2470,3909,4246]},
            { type: "coins", values: [500,1200,1900,2700,3600,5400,6700,8200,10200,12800,16700,19300,22100,25100,28300,31700,53000,58700]}

        ],
        bonuses: [
            { type: "supplies", values: [500,1190,1980,2770,3660,4650,5640,6630,7720,8810,9900,11090,12180,13370,14650,15840,25640,27520] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "medals", values: [6,7,9,11,12,14,20,27,39,54,78,105,139,178,216,255,301,348]}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20b",
        rewards: [
            { type: "happiness", values: [430,750,820,920,1030,1210,1360,1490,1600,1660,1930,2350,2810,3280,3780,4520,7230,7850]},
            { type: "population", values: [89,191,294,413,541,683,835,997,1168,1346,1535,1729,1934,2145,2363,2587,4095,4448]},
            { type: "coins", values: [600,1300,2200,3100,4100,6300,7800,9500,11800,14800,19300,22300,25600,29100,32800,36700,61300,67900]}
        ],
        bonuses: [
            { type: "supplies", values: [540,1300,2160,3020,4000,5080,6160,7240,8420,9610,10800,12100,13280,14580,15980,17280,27970,30020] },
            { type: "fps", values: Array(18).fill(2) },
            { type: "medals", values: [8,10,12,14,16,19,26,36,52,72,103,139,186,237,288,340,402,463]},
            { type: "goods", values: Array(18).fill(5)}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20c",
        rewards: [
            { type: "happiness", values: [510,890,980,1090,1220,1430,1610,1770,1900,1980,2300,2790,3340,3890,4490,5360,8580,9330]},
            { type: "population", values: [97,209,320,450,590,745,911,1087,1274,1469,1674,1886,2110,2340,2578,2822,4468,4853]},
            { type: "coins", values: [700,1600,2600,3700,4900,7400,9300,11300,14000,17600,22900,26500,30400,34600,39000,43700,72900,80800]}
        ],
        bonuses: [
            { type: "supplies", values: [600,1440,2400,3360,4440,5640,6840,8040,9360,10680,12000,13440,14760,16200,17760,19200,31080,33360] },
            { type: "fps", values: Array(18).fill(3) },
            { type: "medals", values: [9,12,15,17,20,24,33,45,65,90,129,174,232,296,360,425,502,579]},
            { type: "goods", values: Array(18).fill(10)},
            { type: "goods", values: Array(18).fill(15)}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20d",
        rewards: [
            { type: "happiness", values: [590,1020,1130,1260,1410,1660,1870,2050,2200,2290,2660,3230,3870,4500,5200,6210,9940,10800]},
            { type: "population", values: [105,226,347,488,640,807,987,1178,1381,1591,1814,2044,2285,2535,2792,3058,4840,5257]},
            { type: "coins", values: [800,1800,3000,4200,5600,8500,10500,12800,15900,20000,26000,30200,34600,39300,44300,49600,82900,91800]}
        ],
        bonuses: [
            { type: "supplies", values: [680,1620,2700,3780,5000,6350,7700,9050,10530,12020,13500,15120,16610,18230,19980,21600,34970,37530] },
            { type: "fps", values: Array(18).fill(4)},
            { type: "medals", values: [12,15,18,22,25,30,41,57,82,114,163,220,294,375,456,538,636,733]},
            { type: "goods", values: Array(18).fill(15)},
            { type: "goods", values: Array(18).fill(20)},
            { type: "fps", values: Array(18).fill(8)}
        ]
    }
    ],
    color: 0x6d494c
}

let sunflower = {
    name: "Sunflower Patch",
    text: "S",
    size: [3, 2],
    road: true,
    level: [{
        id: "R_MultiAge_FallBonus20d",
        rewards: [
            { type: "happiness", values: [270,470,520,570,640,750,850,930,1000,1040,1210,1470,1760,2050,2360,2820,4520,4910]},
            { type: "population", values: [51,109,167,234,308,388,474,566,664,765,872,983,1099,1219,1343,1470,2327,2528]},
            { type: "coins", values: [300,700,1100,1600,2100,3200,4000,4900,6000,7600,9900,11500,13100,14900,16800,18900,31500,34900]}
        ],
        bonuses: [
            { type: "supplies", values: [280,670,1110,1550,2050,2610,3160,3720,4330,4940,5550,6220,6830,7490,8210,8880,14370,15430]},
            { type: "fps", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0xbff374
}

let wheat = {
    name: "Wheat Field",
    text: "W",
    size: [3, 2],
    road: false,
    level: [{
        id: "D_MultiAge_FallBonus20a",
        rewards: [
            { type: "happiness", values: [220,330,390,460,540,640,720,790,850,880,1030,1250,1580,1840,2240,2820,4520,5150]}
        ],
        bonuses: [
            { type: "coinsBoost", values: Array(18).fill(10) },
            { type: "attackingAttack", values: Array(18).fill(12) }
        ]
    }
    ],
    color: 0xf4ed7e
}

let begonia = {
    name: "Begonia Bench",
    text: "B",
    size: [1, 3],
    road: false,
    level: [{
        id: "L_AllAge_FallBonus20a",
        rewards: [
            { type: "medals", values: [3,3,4,6,10,12,16,18,22,26,32,43,50,55,62,68,74,84]}
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(2)},
            { type: "medals", values: [3,3,4,6,10,12,16,18,22,26,32,43,50,55,62,68,74,84]},
            { type: "fps", values: Array(18).fill(3)}
        ]
    }
    ],
    color: 0xcf14eb
}

let autumn = {
    name: "Autumn Scarecrow",
    text: "A",
    size: [1, 3],
    road: false,
    level: [{
        id: "L_AllAge_FallBonus20b",
        rewards: [
            { type: "medals", values: [3,4,4,6,11,13,17,20,24,28,33,45,52,56,64,70,76,85]}
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(5)},
            { type: "medals", values: [3,4,4,6,11,13,17,20,24,28,33,45,52,56,64,70,76,85]},
            { type: "goods", values: Array(18).fill(10)}
        ]
    }
    ],
    color: 0x88e6f5
}

let ochre = {
    name: "Ochre Yard",
    text: "O",
    size: [2, 2],
    road: false,
    level: [{
        id: "D_MultiAge_FallBonus20b",
        rewards: [
            { type: "happiness", values: [140,220,270,320,360,430,500,540,580,610,710,880,1050,1300,1500,1790,3010,3270]}
        ],
        bonuses: [
            { type: "supplyBoost", values: Array(18).fill(12) },
            { type: "attackingDefense", values: Array(18).fill(8) }
        ]
    }
    ],
    color: 0xee407b
}

let primrose = {
    name: "Primrose Bloom",
    text: "P",
    size: [3, 2],
    road: true,
    level: [{
        id: "A_MultiAge_FallBonus20",
        rewards: [
            { type: "happiness", values: [200,280,360,430,510,600,680,750,800,940,1090,1320,1760,2150,2720,3390,5650,6140]}
        ],
        bonuses: [
            { type: "defendingDefense", values: Array(18).fill(6) },
            { type: "defendingAttack", values: Array(18).fill(10) }
        ]
    }
    ],
    color: 0xf3949b
}

function getHarvestBarn() {
    return [barn, sunflower, wheat, begonia, autumn, ochre, primrose];
}
