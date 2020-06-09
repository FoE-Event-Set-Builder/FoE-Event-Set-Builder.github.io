let sakura = {
    name: "Sakura Rock",
    text: "S",
    size: [2, 3],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [200, 260, 280, 320, 350, 410, 470, 510, 550, 570, 660, 810, 970, 1130, 1300, 1550, 2480, 2700] }
        ],
        bonuses: [
            { type: "happiness", values: [240, 310, 340, 380, 420, 490, 560, 610, 660, 680, 790, 970, 1160, 1360, 1560, 1860, 2980, 3240] },
            { type: "attackingAttack", values: Array(18).fill(2) },
            { type: "attackingAttack", values: Array(18).fill(3) }
        ]
    },
    {
        rewards: [
            { type: "happiness", values: [340, 580, 640, 720, 800, 940, 1060, 1170, 1250, 1300, 1510, 1830, 2200, 2560, 2950, 3530, 5650, 6140] }
        ],
        bonuses: [
            { type: "happiness", values: [410, 700, 770, 860, 960, 1130, 1270, 1400, 1500, 1560, 1810, 2200, 2640, 3070, 3540, 4240, 6780, 7370] },
            //{ type: "attackingAttack", values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
            { type: "attackingAttack", values: Array(18).fill(4)},
            { type: "attackingAttack", values: Array(18).fill(6)}
        ]
    }
    ],
    color: 0xEB4A5F
}

let emp = {
    name: "Emperor's Entrance",
    text: "E",
    size: [3, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [300, 720, 1200, 1700, 2200, 2400, 5100, 6500, 8000, 10400, 12000, 13800, 15700, 17700, 19830, 33120, 36690] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "supplies", values: [280, 660, 1100, 1550, 2050, 2600, 3150, 3700, 4300, 4900, 5500, 6200, 6800, 7500, 8200, 8860, 14340, 15400] },
            { type: "medals", values: [3, 3, 4, 4, 5, 6, 9, 11, 15, 21, 30, 38, 48, 57, 66, 80, 100, 120] }
        ]
    },
    {
        rewards: [
            { type: "coins", values: [450, 1080, 1800, 2520, 3330, 5070, 6320, 7670, 9540, 12000, 15620, 18090, 20740, 23560, 26570, 29760, 49710, 55060] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "medals", values: [5, 6, 7, 8, 10, 12, 15, 20, 30, 45, 60, 75, 90, 110, 120, 135, 160, 180] },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0xB56B9C
}

let zen = {
    name: "Zen Zone",
    text: "Z",
    size: [3, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [260, 630, 1050, 1450, 1950, 2950, 2700, 4500, 5600, 7000, 8100, 10500, 12000, 18800, 15500, 17360, 29000, 32120] }
        ],
        bonuses: [
            { type: "supplies", values: [340, 810, 1350, 1890, 2500, 3180, 3850, 4530, 5270, 6010, 6760, 7570, 8310, 9120, 10000, 10810, 17500, 18780] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "goods", values: Array(18).fill(5) }
        ]
    },
    {
        rewards: [
            { type: "coins", values: [380, 900, 1500, 2100, 2780, 4230, 5270, 6390, 7950, 10000, 13020, 15080, 17280, 19640, 22140, 24800, 41420, 45880] }
        ],
        bonuses: [
            { type: "supplies", values: [530, 1260, 2100, 2940, 3890, 4940, 5990, 7040, 8190, 9350, 10500, 11760, 12920, 14180, 15540, 16800, 27200, 29190] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "goods", values: Array(18).fill(10) }
        ]
    }
    ],
    color: 0xFFD0C3
}

let pond = {
    name: "Nishikigoi Pond",
    text: "N",
    size: [2, 3],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [200, 260, 280, 320, 350, 410, 470, 510, 550, 570, 660, 810, 970, 1130, 1300, 1550, 2480, 2700] }
        ],
        bonuses: [
            { type: "happiness", values: [240, 310, 340, 380, 420, 490, 560, 610, 660, 680, 790, 970, 1160, 1360, 1560, 1860, 2980, 3240] },
            { type: "defendingDefense", values: Array(18).fill(2) },
            { type: "defendingDefense", values: Array(18).fill(3) }
        ]
    },
    {
        rewards: [
            { type: "happiness", values: [340, 580, 640, 720, 800, 940, 1060, 1170, 1250, 1300, 1510, 1830, 2200, 2560, 2950, 3530, 5650, 6140] }
        ],
        bonuses: [
            { type: "happiness", values: [410, 700, 770, 860, 960, 1130, 1270, 1400, 1500, 1560, 1810, 2200, 2640, 3070, 3540, 4240, 6780, 7370] },
            { type: "defendingDefense", values: Array(18).fill(5)},
            { type: "defendingDefense", values: Array(18).fill(7) }
        ]
    }
    ],
    color: 0x6A5ACD
}

let gong = {
    name: "Gong of Wisdom",
    text: "G",
    size: [1, 1],
    road: false,
    level: [{
        rewards: [
            { type: "medals", values: [1, 1, 1, 1, 1, 1, 2, 2, 4, 5, 6, 8, 10, 12, 15, 18, 24, 30] }
        ],
        bonuses: [
            { type: "medals", values: [1, 1, 1, 1, 2, 2, 3, 4, 5, 7, 10, 12, 15, 15, 16, 18, 22, 25] },
            { type: "medals", values: [1, 1, 2, 2, 2, 3, 4, 5, 6, 10, 15, 20, 25, 30, 35, 40, 48, 54] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    },
    {
        rewards: [
            { type: "medals", values: [1, 1, 1, 1, 1, 1, 2, 2, 4, 5, 6, 8, 10, 12, 15, 18, 24, 30] }
        ],
        bonuses: [
            { type: "medals", values: [2, 2, 2, 2, 3, 4, 6, 8, 10, 12, 15, 18, 21, 25, 30, 35, 44, 54] },
            { type: "medals", values: [2, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 55, 65] },
            { type: "fps", values: Array(18).fill(2) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0xE0003A
}

function getCherry(){
    return [sakura, emp, zen, pond, gong];
}

// Cherry 12x13, 140% atk, 140 tiles
//010001171I-10I-6.5x010101171I-7.5I-7x010201171I-9.5I-4x010301171I-7I-4.5x010401171I-8.5I-5.5x000001171I-9I3.5x000101171I-8.5I6x000201171I-6.5I3x000401171I-7.5I4.5x010001171I-2I-6.5x010101171I-1.5I-4x010201171I-9.5I-9x010201171I-4.5I-7x010201171I-4.5I-4x010401171I-7.5I-8.5x010401171I-4.5I-5.5x010401171I-0.5I-5.5x010401171I-1.5I-2.5x010201171I0.5I-7x010201171I0.5I-2x010301171I1I-4.5x000001171I-6I5.5x000001171I-7I8.5x000001171I-10I8.5x000401171I-8.5I7.5x000201171I-8.5I11x000001171I-6I11.5x000001171I-9I13.5x000101171I-6.5I14x000401171I-7.5I12.5x000401171I-14.5I4.5x000401171I-10.5I10.5x000401171I-14.5I12.5x000401171I-13.5I7.5x000401171I-10.5I6.5x000001171I-16I5.5x000001171I-13I3.5x000001171I-11I4.5x000001171I-12I8.5x000001171I-15I8.5x000001171I-13I13.5x000101171I-15.5I3x000101171I-13.5I11x000201171I-15.5I14x000201171I-13.5I6x000001171I-16I11.5x000001171I-11I12.5