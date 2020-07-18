let homes = {
    name: "Piazza Homes",
    text: "H",
    size: [2, 3],
    road: true,
    level: [{
        id: "R_MultiAge_CarnivalBonus19a",
        rewards: [
            { type: "population", values: [81,174,267,375,492,621,759,906,1062,1224,1395,1572,1758,1950,2148,2352,3723,4044] },
            { type: "coins", values: [250,400,700,900,1200,1900,2300,2800,3500,4400,5700,6600,7600,8600,9700,10900,18200,20200] }
        ],
        bonuses: [
            { type: "supplies", values: [280,660,1100,1550,2050,2600,3150,3700,4300,4900,5500,6200,6800,7500,8200,8860,14340,15400]},
            { type: "goods", values: Array(18).fill(4)},
            { type: "fps", values: Array(18).fill(1) }
        ]
    },
    {
        id: "R_MultiAge_CarnivalBonus19b",
        rewards: [
            { type: "population", values: [101,218,334,469,615,776,949,1133,1328,1530,1744,1965,2198,2438,2685,2940,4654,5055] },
            { type: "coins", values: [300,500,900,1300,1700,2500,3200,3800,4800,6000,7800,9100,10400,11800,13300,14900,24900,27500] }
        ],
        bonuses: [
            { type: "supplies", values: [320,760,1260,1760,2330,2960,3590,4220,4910,5610,6300,7060,7750,8510,9320,10080,16320,17510]},
            { type: "goods", values: Array(18).fill(8) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0xFF8C00
}

let cafe = {
    name: "Piazza Cafe",
    text: "C",
    size: [3, 2],
    road: true,
    level: [{
        id: "R_MultiAge_CarnivalBonus19c",
        rewards: [
            { type: "population", values: [45,96,147,206,271,342,417,498,584,673,767,865,967,1073,1181,1294,2048,2224] },
            { type: "coins", values: [300,700,1200,1700,2200,3400,4200,5100,6400,8000,10400,12100,13800,15700,17700,19800,33100,36700] }
        ],
        bonuses: [
            { type: "medals", values: [3,4,4,5,6,7,9,12,18,24,35,47,62,79,96,114,134,155]},
            { type: "supplies", values: [270,650,1080,1510,2000,2540,3080,3620,4210,4810,5400,6050,6640,7290,7990,8640,13990,15010]},
            { type: "fps", values: Array(18).fill(1) }
        ]
    },
    {
        id: "R_MultiAge_CarnivalBonus19d",
        rewards: [
            { type: "population", values: [65,131,200,281,369,466,569,680,797,918,1046,1179,1319,1463,1611,1764,2792,3033] },
            { type: "coins", values: [400,900,1500,2100,2800,4200,5300,6400,8000,10000,13000,15100,17300,19600,22100,24800,41400,45900] }
        ],
        bonuses: [
            { type: "medals", values: [6,8,10,12,13,16,22,30,43,60,86,116,155,198,240,283,335,386]},
            { type: "supplies", values: [330,790,1320,1850,2440,3100,3760,4420,5150,5870,6600,7390,8120,8910,9770,10560,17090,18350]},
            { type: "fps", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0xFFF4E8
}

let clock = {
    name: "Piazza Clock Tower",
    text: "T",
    size: [3, 2],
    road: true,
    level: [{
        id: "A_MultiAge_CarnivalBonus19a",
        rewards: [
            { type: "happiness", values: [170,260,310,360,420,490,550,610,650,730,850,1030,1320,1590,1950,2540,4060,4420] }
        ],
        bonuses: [
            { type: "coinsBoost", values: [4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9] },
            { type: "supplyBoost", values: [4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9] },
            { type: "attackingAttack", values: [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7] }
        ]
    },
    {
        id: "A_MultiAge_CarnivalBonus19b",
        rewards: [
            { type: "happiness", values: [200,280,360,430,510,600,680,750,800,940,1090,1320,1760,2150,2720,3670,5870,6380] }
        ],
        bonuses: [
            { type: "coinsBoost", values: [8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13] },
            { type: "supplyBoost", values: [8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,13,13,13] },
            { type: "attackingAttack", values: [4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9] }
        ]
    }
    ],
    color: 0xEB9D4D
}

let fountain = {
    name: "Piazza Fountain",
    text: "F",
    size: [2, 3],
    road: false,
    level: [{
        id: "D_MultiAge_CarnivalBonus19a",
        rewards: [
            { type: "happiness", values: [180,280,320,370,430,510,570,630,670,700,820,990,1230,1430,1710,2050,3270,3560] }
        ],
        bonuses: [
            { type: "happiness", values: [220,340,380,440,520,610,680,760,800,840,980,1190,1480,1720,2050,2460,3920,4270] },
            { type: "defendingDefense", values: Array(18).fill(2) },
            { type: "defendingDefense", values: Array(18).fill(3) }
        ]
    },
    {
        id: "D_MultiAge_CarnivalBonus19b",
        rewards: [
            { type: "happiness", values: [220,330,390,460,540,640,720,790,850,880,1030,1250,1580,1840,2240,2680,4290,4660] }
        ],
        bonuses: [
            { type: "happiness", values: [260,400,470,550,650,770,860,950,1020,1060,1240,1500,1900,2210,2690,3220,5150,5590] },
            { type: "defendingDefense", values: Array(18).fill(3) },
            { type: "defendingDefense", values: Array(18).fill(5) }
        ]
    }
    ],
    color: 0xD8D167
}

let mask = {
    name: "Piazza Mask Vendor",
    text: "M",
    size: [1, 1],
    road: false,
    level: [{
        id: "L_AllAge_CarnivalBonus19a",
        rewards: [
            { type: "medals", values: [1,1,1,1,2,2,2,3,4,5,6,10,15,17,20,23,25,28] } //Guestimates https://forgeofempires.fandom.com/wiki/Piazza_Mask_Vendor#Level%202
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(2) },
            { type: "goods", values: Array(18).fill(3) },
            { type: "fps", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    },
    {
        id: "L_AllAge_CarnivalBonus19b",
        rewards: [
            { type: "medals", values: [2,2,2,2,2,2,2,3,4,5,8,12,16,22,30,40,50,50] } //Guestimates https://forgeofempires.fandom.com/wiki/Piazza_Mask_Vendor#Level%202
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(3) },
            { type: "goods", values: Array(18).fill(5) },
            { type: "fps", values: Array(18).fill(2) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0xBCDBFE
}

function getPiazza(){
    return [homes,cafe,clock,fountain,mask];
}