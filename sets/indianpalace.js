let palace = {
    name: "Maharaja's Palace",
    text: "P",
    size: [4, 4],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [880, 2110, 3520, 4930, 6510, 9920, 12360, 15000, 18660, 23470, 30550, 35380, 40550, 46080, 51960, 58190, 97200, 107670] }
        ],
        bonuses: [
            { type: "supplies", values: [900, 2160, 3600, 5040, 6670, 8470, 10270, 12070, 14050, 16040, 18020, 20180, 22160, 24320, 26670, 28830, 46670, 60090] },
            { type: "medals", values: [11, 14, 17, 20, 23, 28, 39, 54, 77, 107, 153, 206, 252, 305, 351, 427, 519, 610] },
            { type: "goods", values: Array(18).fill(5) },
            { type: "fps", values: Array(18).fill(5) }
        ]
    }
    ],
    color: 0xb9f2ff
}

let west = {
    name: "Western Palace Tower",
    text: "W",
    size: [2, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [180,430,720,1010,1330,2030,2530,3070,3820,4800,6250,7240,8290,9420,10630,11900,19880,22020] }
        ],
        bonuses: [
            { type: "coins", values: [220,530,880,1230,1630,2480,3090,3750,4660,5870,7640,8840,10140,11520,12990,14550,24300,26920] },
            { type: "goods", values: Array(18).fill(5) }
        ]
    }
    ],
    color: 0x85ffff
}

let east = {
    name: "Eastern Palace Tower",
    text: "E",
    size: [2, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [180,430,720,1010,1330,2030,2530,3070,3820,4800,6250,7240,8290,9420,10630,11900,19880,22020] }
        ],
        bonuses: [
            { type: "coins", values: [220,530,880,1230,1630,2480,3090,3750,4660,5870,7640,8840,10140,11520,12990,14550,24300,26920] }, //guess: https://forgeofempires.fandom.com/wiki/Eastern_Palace_Tower
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0x47f5f5
}

let bandar = {
    name: "Bandar Playground",
    text: "B",
    size: [2, 2],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] } 
        ],
        bonuses: [
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] },
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] }
        ]
    }
    ],
    color: 0x24d9d9
}

let jungle = {
    name: "Maharaja's Jungle Pond",
    text: "J",
    size: [2, 2],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] } 
        ],
        bonuses: [
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] },
            { type: "happiness", values: [100,140,150,170,190,230,250,280,300,310,360,440,530,610,710,850,1350,1470] }
        ]
    }
    ],
    color: 0x0ac0c0
}

function getIndianPalace() {
    return [palace, west, east, bandar, jungle];
}

//030000171I-5I0x030100171I-8I-4x030200171I-8I-6x030300171I-2I-2x030400171I-2I2x030000171I-5I-4x030000171I1I0x030000171I1I-4x030100171I4I-4x030400171I-2I-6x030200171I4I-6x030200171I-8I-2x030200171I4I-2x030200171I-2I-4x030200171I-2I0x030200171I-8I2x030200171I4I2x030100171I-8I0x030100171I4I0