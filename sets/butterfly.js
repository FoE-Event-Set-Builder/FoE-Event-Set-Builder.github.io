let house = {
    name: "Butterfly House",
    text: "H",
    size: [3,4],
    road: true,
    level: [{
        id: "R_MultiAge_ArcheologyBonus22a",
        rewards: [
            { type: "happiness", values:  Array(18).fill(1)},
            { type: "population", values:  Array(18).fill(1)},
            { type: "coins", values:  Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(3)}
        ]
    },
    {
        id: "R_MultiAge_ArcheologyBonus22b",
        rewards: [
            { type: "happiness", values:  Array(18).fill(1)},
            { type: "population", values:  Array(18).fill(1)},
            { type: "coins", values:  Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
            { type: "medals", values: Array(18).fill(1)}
        ]
    },
    {
        id: "R_MultiAge_ArcheologyBonus22c",
        rewards: [
            { type: "happiness", values:  Array(18).fill(1)},
            { type: "population", values:  Array(18).fill(1)},
            { type: "coins", values:  Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(3)},
            { type: "medals", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(1)}
        ]
    },
    {
        id: "R_MultiAge_ArcheologyBonus22d",
        rewards: [
            { type: "happiness", values:  Array(18).fill(1)},
            { type: "population", values:  Array(18).fill(1)},
            { type: "coins", values:  Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(4)},
            { type: "medals", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(6)},
            { type: "fps", values: Array(18).fill(2)}
        ]
    },
    {
        id: "R_MultiAge_ArcheologyBonus22e",
        rewards: [
            { type: "happiness", values:  Array(18).fill(1)},
            { type: "population", values:  Array(18).fill(1)},
            { type: "coins", values:  Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(6)},
            { type: "medals", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(2)},
            { type: "goods", values: Array(18).fill(11)},
            { type: "fps", values: Array(18).fill(4)}
        ]
    }
    ],
    color: 0x6d494c
}

let wild = {
    name: "Wildflower Meadow",
    text: "W",
    size: [2, 3],
    road: true,
    level: [{
        id: "A_MultiAge_ArcheologyBonus22a",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(4)},
            { type: "attackingAttack", values: Array(18).fill(4)},
            { type: "goods", values: Array(18).fill(4)}
        ]
    }
    ],
    color: 0xbff374
}

let snap = {
    name: "Snapdragon Bloom",
    text: "S",
    size: [2, 3],
    road: false,
    level: [{
        id: "D_MultiAge_ArcheologyBonus22a",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(6)},
            { type: "coins", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(3)}
        ]
    }
    ],
    color: 0xf4ed7e
}

let daylily = {
    name: "Daylily Flowerbed",
    text: "D",
    size: [2, 2],
    road: false,
    level: [{
        id: "D_MultiAge_ArcheologyBonus22b",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(5)},
            { type: "fps", values: Array(18).fill(1)}
        ]
    }
    ],
    color: 0xcf14eb
}

let marigold = {
    name: "Marigold Patch",
    text: "M",
    size: [2, 3],
    road: false,
    level: [{
        id: "D_MultiAge_ArcheologyBonus22c",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1)},
            { type: "supplies", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(7)}
        ]
    }
    ],
    color: 0x88e6f5
}

let saphire = {
    name: "Saphire Arch",
    text: "S",
    size: [3, 1],
    road: false,
    level: [{
        id: "L_AllAge_ArcheologyBonus22a",
        rewards: [
            { type: "medals", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "supplyBoost", values: Array(18).fill(10) },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0xee407b
}

let magenta = {
    name: "Magenta Arch",
    text: "M",
    size: [3, 1],
    road: true,
    level: [{
        id: "L_AllAge_ArcheologyBonus22b",
        rewards: [
            { type: "medals", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "coinsBoost", values: Array(18).fill(10) },
            { type: "goods", values: Array(18).fill(3) }
        ]
    }
    ],
    color: 0xf3949b
}

function getButterfly() {
    return [house, wild, snap, daylily, marigold, saphire, magenta];
}
