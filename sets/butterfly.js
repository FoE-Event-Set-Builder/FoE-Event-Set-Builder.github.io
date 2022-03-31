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
            { type: "supplies", values: Array(18).fill(1)}
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
            { type: "goods", values: Array(18).fill(2)}
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
            { type: "goods", values: Array(18).fill(4)},
            { type: "medals", values: Array(18).fill(1)}
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
            { type: "goods", values: Array(18).fill(6)},
            { type: "medals", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(1)}
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
            { type: "goods", values: Array(18).fill(10)},
            { type: "medals", values: Array(18).fill(1)},
            { type: "fps", values: Array(18).fill(4)},
            { type: "goods", values: Array(18).fill(30)},
            { type: "fps", values: Array(18).fill(10)}
        ]
    }
    ],
    color: 0xaedefe
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
            { type: "supplyBoost", values: Array(18).fill(10)},
            { type: "attackingAttack", values: Array(18).fill(10)}
        ]
    }
    ],
    color: 0xe880ec
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
            { type: "coinsBoost", values: Array(18).fill(5)},
            { type: "defendingDefense", values: Array(18).fill(8)},
            { type: "attackingAttack", values: Array(18).fill(5)}
        ]
    }
    ],
    color: 0x9400d3
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
            { type: "coinsBoost", values: Array(18).fill(10)},
            { type: "attackingDefense", values: Array(18).fill(7)}
        ]
    }
    ],
    color: 0xff392e
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
            { type: "supplyBoost", values: Array(18).fill(5)},
            { type: "attackingDefense", values: Array(18).fill(3)},
            { type: "attackingAttack", values: Array(18).fill(3)}
        ]
    }
    ],
    color: 0xffaa00
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
            { type: "goods", values: Array(18).fill(4) },
            { type: "fps", values: Array(18).fill(4) }
        ]
    }
    ],
    color: 0x4a7fff
}

let magenta = {
    name: "Magenta Arch",
    text: "M",
    size: [3, 1],
    road: false,
    level: [{
        id: "L_AllAge_ArcheologyBonus22b",
        rewards: [
            { type: "medals", values: Array(18).fill(1)},
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(2) },
            { type: "goods", values: Array(18).fill(9) }
        ]
    }
    ],
    color: 0xf6178c
}

function getButterfly() {
    return [house, wild, snap, daylily, marigold, saphire, magenta];
}
