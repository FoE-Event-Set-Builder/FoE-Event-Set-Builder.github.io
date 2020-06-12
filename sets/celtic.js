let moon = {
    name: "Moon Gate",
    text: "M",
    size: [4, 3],
    road: true,
    level: [{
        rewards: [
            { type: "population", values: [162, 348, 534, 750, 984, 1242, 1518, 1812, 2124, 2448, 2790, 3144, 3516, 3900, 4296, 4704, 7446, 8088] },
            { type: "coins", values: [450, 800, 1300, 1900, 2400, 3700, 4600, 5600, 7000, 8800, 11500, 13300, 15200, 17300, 19500, 21800, 36500, 40400] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "medals", values: [4, 5, 6, 7, 8, 10, 13, 18, 26, 36, 52, 70, 93, 119, 144, 170, 201, 232] },
            { type: "goods", values: Array(18).fill(5) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    },
    {
        rewards: [
            { type: "population", values: [203, 435, 668, 938, 1230, 1553, 1898, 2265, 2655, 3060, 3488, 3930, 4395, 4875, 5370, 5880, 9308, 10110] },
            { type: "coins", values: [600, 1100, 1800, 2500, 3300, 5100, 6300, 7700, 9500, 12000, 15600, 18100, 20700, 23600, 26600, 29800, 49700, 55100] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(2) },
            { type: "medals", values: [7, 9, 11, 13, 15, 17, 24, 33, 48, 66, 95, 128, 170, 217, 264, 312, 368, 425] },
            { type: "goods", values: Array(18).fill(10) },
            { type: "fps", values: Array(18).fill(6) }
        ]
    }
    ],
    color: 0x8CFFCB
}

let faery = {
    name: "Faery Rings",
    text: "F",
    size: [3, 3],
    road: true,
    level: [{
        rewards: [
            { type: "population", values: [67, 144, 220, 309, 406, 512, 626, 747, 876, 1010, 1151, 1297, 1450, 1609, 1772, 1940, 3071, 3336] },
            { type: "coins", values: [500, 1100, 1800, 2500, 3300, 5100, 6300, 7700, 9500, 12000, 15600, 18100, 20700, 23600, 26600, 29800, 49700, 55100] }
        ],
        bonuses: [
            { type: "supplies", values: [430, 1100, 1800, 2500, 3300, 5100, 6300, 7700, 9500, 12000, 15600, 18100, 20700, 23600, 26600, 29800, 49700, 55100] },
            { type: "fps", values: Array(18).fill(2) },
            { type: "goods", values: Array(18).fill(5) }
        ]
    },
    {
        rewards: [
            { type: "population", values: [97, 196, 300, 422, 554, 699, 854, 1019, 1195, 1377, 1569, 1769, 1978, 2194, 2417, 2646, 4188, 4550] },
            { type: "coins", values: [600, 1400, 2300, 3200, 4200, 6300, 7900, 9600, 11900, 1500, 19500, 22600, 25900, 29500, 33200, 37200, 62100, 68800] }
        ],
        bonuses: [
            { type: "supplies", values: [540, 1300, 2160, 3020, 4000, 5080, 6160, 7240, 8420, 9610, 10800, 12100, 13280, 13580, 15980, 17280, 27970, 30020] },
            { type: "fps", values: Array(18).fill(4)},
            { type: "goods", values: Array(18).fill(10) }
        ]
    }
    ],
    color: 0x38FF73
}

let druid = {
    name: "Druid Willow",
    text: "D",
    size: [2, 3],
    road: true,
    level: [{
        rewards: [
            { type: "happiness", values: [170, 260, 310, 360, 420, 490, 550, 610, 650, 730, 850, 1030, 1320, 1590, 1950, 2540, 4060, 4420] }
        ],
        bonuses: [
            { type: "defendingDefense", values: Array(18).fill(3) },
            { type: "attackingDefense", values: Array(18).fill(3) }
        ]
    },
    {
        rewards: [
            { type: "happiness", values: [200, 280, 360, 430, 510, 600, 680, 750, 800, 940, 1090, 1320, 1760, 2150, 2720, 3670, 5870, 6380] }
        ],
        bonuses: [
            { type: "defendingDefense", values: Array(18).fill(6) },
            { type: "attackingDefense", values: Array(18).fill(6)}
        ]
    }
    ],
    color: 0xC3FFA8
}

let fawn = {
    name: "Majestic Fawn",
    text: "F",
    size: [1, 1],
    road: false,
    level: [{
        rewards: [
            { type: "medals", values: [1,1,1,1,1,1,2,2,4,5,6,8,10,12,15,19,24,30] } //SAAB not accurate, estimated based on 1st bonus
        ],
        bonuses: [
            { type: "medals", values: [1,1,1,2,3,4,5,6,7,8,10,14,16,18,20,22,24,28] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "attackingAttack", values: Array(18).fill(2)}
        ]
    },
    {
        rewards: [
            { type: "medals", values: [1,2,2,2,2,2,3,4,6,8,10,12,15,22,30,39,50,62] } //SAAB not accurate, estimated based on 1st bonus
        ],
        bonuses: [
            { type: "medals", values: [2,2,2,4,6,8,10,12,14,16,20,28,32,36,40,44,48,54] },
            { type: "fps", values: Array(18).fill(2) },
            { type: "attackingAttack", values: Array(18).fill(4)}
        ]
    }
    ],
    color: 0x37B972
}

let stone = {
    name: "Standing Stone",
    text: "S",
    size: [1, 2],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [60,90,110,1200,140,170,190,210,220,230,270,330,410,480,570,680,1090,1190] }
        ],
        bonuses: [
            { type: "supplyBoost", values: Array(18).fill(3) },
            { type: "defendingAttack", values: Array(18).fill(3) }
        ]
    },
    {
        rewards: [
            { type: "happiness", values: [70,110,130,150,180,210,240,260,280,290,340,420,530,610,750,890,1430,1550] }
        ],
        bonuses: [
            { type: "supplyBoost", values: Array(18).fill(6) },
            { type: "defendingAttack", values: Array(18).fill(6) }
        ]
    }
    ],
    color: 0x388073
}

function getCeltic() {
    return [moon, faery, druid, fawn, stone];
}

// 9x9 design: 48 FPs, 40 Goods, 24/12% atk
//020001171I4I-2.5x020101170I1.5I0.5x020201171I5I0.5x020301171I1.5I-1.5x020401171I1.5I-3x020001171I4I3.5x020001171I-1I-2.5x020001171I-1I3.5x020201171I-2I0.5x020301171I1.5I2.5x020401171I1.5I4x020301171I3.5I-0.5x020301171I3.5I1.5x020301171I-0.5I-0.5x020301171I-0.5I1.5x020301171I3.5I0.5x020301171I-0.5I0.5