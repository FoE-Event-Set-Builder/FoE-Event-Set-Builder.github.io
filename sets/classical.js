let pool = {
    name: "Classical Garden Pool",
    text: "G",
    size: [4, 2],
    road: true,
    level: [{
        rewards: [
            { type: "happiness", values: [290,370,480,570,680,800,910,1000,1070,1250,1450,1760,2340,2870,3620,4890,7830,8510] }
        ],
        bonuses: [
            { type: "defendingDefense", values: Array(18).fill(4) },
            { type: "attackingAttack", values: Array(18).fill(5) }
        ]
    }
    ],
    color: 0xaee2cd
}

let patio = {
    name: "Classical Garden Patio",
    text: "P",
    size: [2, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [200,480,800,1120,1480,2250,2810,3410,4240,5330,6940,8040,9220,10470,11810,13230,22090,24470] }
        ],
        bonuses: [
            { type: "supplies", values: [220,530,880,1230,1630,2070,2510,2950,3430,3920,4400,4930,5410,5940,6510,7040,11400,12230] },
            { type: "goods", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0x66cdaa
}

let statues = {
    name: "Classical Garden Statues",
    text: "S",
    size: [2, 2],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [120,190,210,230,260,300,340,370,400,420,480,590,700,820,950,1130,1810,1960] }
        ],
        bonuses: [
            { type: "coinsBoost", values: [6,6,6,7,7,7,8,8,9,9,10,10,11,11,12,12,13,13] },
            { type: "supplyBoost", values: [8,8,8,9,9,9,10,10,11,11,12,12,13,13,14,14,15,15] }
        ]
    }
    ],
    color: 0x73cda9
}

function getClassicalGarden() {
    return [pool, patio, statues];
}
