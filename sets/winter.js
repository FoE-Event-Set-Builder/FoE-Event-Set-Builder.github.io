let toymaker = {
    name: "Toymaker's Booth",
    text: "T",
    size: [3,2],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonusSet17c",
        rewards: [
            { type: "coins", values: [300,720,1200,1680,2220,3380,4210,5110,6360,8000,10420,12060,13820,15710,17710,19840,33140,36710] }
        ],
        bonuses: [
            { type: "coins", values: [330,790,1320,1850,2440,3720,4630,5620,7000,8800,11460,13270,15210,17280,19480,21820,36450,40380] },
            { type: "supplies", values: [320,760,1260,1760,2330,2960,3590,4220,4910,5610,6300,7060,7750,8510,9320,10080,16320,17510] },
            { type: "goods", values: Array(18).fill(5) },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0x8b4513
}

let moose = {
    name: "Moose Meadow",
    text: "M",
    size: [2, 3],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonusSet17b",
        rewards: [
            { type: "coins", values: [300,720,1200,1680,2220,3380,4210,5110,6360,8000,10420,12060,13820,15710,17710,19840,33140,36710] }
        ],
        bonuses: [
            { type: "coins", values: [330,790,1320,1850,2440,3720,4630,5620,7000,8800,11460,13270,15210,17280,19480,21820,36450,40380] },
            { type: "supplies", values: [320,760,1260,1760,2330,2960,3590,4220,4910,5610,6300,7060,7750,8510,9320,10080,16320,17510] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "goods", values: Array(18).fill(5) }
        ]
    }
    ],
    color: 0x814f2c
}

let sugar = {
    name: "Sugar Baker's Booth",
    text: "B",
    size: [2, 2],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonusSet17a",
        rewards: [
            { type: "coins", values: [200,480,800,1120,1480,2250,2810,3410,4240,5330,6940,8040,9220,10470,11810,13230,22090,24470] }
        ],
        bonuses: [
            { type: "coins", values: [220,530,880,1230,1630,2480,3090,3750,4660,5870,7640,8840,10140,11520,12990,14550,24300,26920] },
            { type: "supplies", values: [210,500,840,1180,1550,1970,2390,2810,3280,3740,4200,4700,5170,5670,6220,6720,10880,11680] },
            { type: "medals", values: [4,6,7,8,9,11,15,20,29,40,58,78,95,115,132,160,195,229] },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0x966441
}

let feast = {
    name: "Smörgåsbord Feast",
    text: "S",
    size: [1, 2],
    road: false,
    level: [{
        id: "D_MultiAge_WinterBonusSet17b",
        rewards: [
            { type: "happiness", values: [50,70,80,90,100,110,130,140,150,160,180,220,260,310,350,420,680,740] } 
        ],
        bonuses: [
            { type: "happiness", values: [60,80,100,110,120,130,160,170,180,190,220,260,310,370,420,500,820,890] },
            { type: "defendingDefense", values: Array(18).fill(2) },
            { type: "defendingDefense", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0xae5617
}

let candle = {
    name: "Candlemaker's Tent",
    text: "C",
    size: [1,2],
    road: false,
    level: [{
        id: "D_MultiAge_WinterBonusSet17d",
        rewards: [
            { type: "happiness", values: [50,70,80,90,100,110,130,140,150,160,180,220,260,310,350,420,680,740] } 
        ],
        bonuses: [
            { type: "happiness", values: [60,80,100,110,120,130,160,170,180,190,220,260,310,370,420,500,820,890] },
            { type: "supplyBoost", values: Array(18).fill(2) },
            { type: "supplyBoost", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0x9a4204
}

let tinkerer = {
    name: "Tinkerer's Tent",
    text: "T",
    size: [2, 1],
    road: false,
    level: [{
        id: "D_MultiAge_WinterBonusSet17c",
        rewards: [
            { type: "happiness", values: [50,70,80,90,100,110,130,140,150,160,180,220,260,310,350,420,680,740] } 
        ],
        bonuses: [
            { type: "happiness", values: [60,80,100,110,120,130,160,170,180,190,220,260,310,370,420,500,820,890] },
            { type: "coinsBoost", values: Array(18).fill(2) },
            { type: "coinsBoost", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0xc15305
}

let halmbock = {
    name: "Halmbock",
    text: "H",
    size: [2,1],
    road: false,
    level: [{
        id: "D_MultiAge_WinterBonusSet17a",
        rewards: [
            { type: "happiness", values: [50,70,80,90,100,110,130,140,150,160,180,220,260,310,350,420,680,740] } 
        ],
        bonuses: [
            { type: "happiness", values: [60,80,100,110,120,130,160,170,180,190,220,260,310,370,420,500,820,890] },
            { type: "attackingAttack", values: Array(18).fill(1) },
            { type: "attackingAttack", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0x9f5927
}

let straw = {
    name: "Straw Star Tent",
    text: "S",
    size: [1,1],
    road: false,
    level: [{
        id: "L_AllAge_WinterBonusSet17b",
        rewards: [
            { type: "medals", values: [1,1,1,1,1,1,2,2,4,5,6,8,10,12,15,18,20,24] } //guestimate https://forgeofempires.fandom.com/wiki/Straw_Star_Tent
        ],
        bonuses: [
            { type: "medals", values: [1,1,1,1,2,2,3,4,5,7,10,12,15,15,16,18,22,26] },
            { type: "goods", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(1)}
        ]
    }
    ],
    color: 0xd2691e
}

let madam = {
    name: "Madam Fortuna's Tent",
    text: "F",
    size: [1,1],
    road: false,
    level: [{
        id: "L_AllAge_WinterBonusSet17a",
        rewards: [
            { type: "medals", values: [1,1,1,1,1,1,2,2,4,5,6,8,10,12,15,18,20,24] } //guestimate https://forgeofempires.fandom.com/wiki/Madame_Fortuna%27s_Tent
        ],
        bonuses: [
            { type: "medals", values: [1,1,1,1,2,2,3,4,5,7,10,12,15,15,16,18,22,25] },
            { type: "medals", values: [1,1,2,2,2,3,4,5,6,10,15,20,25,30,35,40,48,56]},
            { type: "medals", values: [1,2,2,2,3,4,5,6,8,12,18,24,30,35,40,45,55,65]},
            { type: "fps", values: Array(18).fill(1)}
        ]
    }
    ],
    color: 0xa85418
}

function getWinterVillage() {
    return [toymaker,moose,sugar,feast,candle,tinkerer,halmbock,straw,madam];
}