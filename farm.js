let barn = {
    name: "Harvest Barn",
    text: "B",
    size: [4,3],
    road: true,
    level: [{
        id: "R_MultiAge_FallBonus20a",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
            { type: "population", values: Array(18).fill(1)},
            { type: "coins", values: Array(18).fill(1)}
            
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(1) },
            { type: "medals", values: Array(18).fill(1)}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20b",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
            { type: "population", values: Array(18).fill(1)},
            { type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(2) },
            { type: "medals", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(5)}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20c",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
            { type: "population", values: Array(18).fill(1)},
            { type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(3) },
            { type: "medals", values: Array(18).fill(1)},
            { type: "goods", values: Array(18).fill(10)},
            { type: "goods", values: Array(18).fill(15)}
        ]
    },
    {
        id: "R_MultiAge_FallBonus20d",
        rewards: [
            { type: "happiness", values: Array(18).fill(1)},
            { type: "population", values: Array(18).fill(1)},
            { type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(4) },
            { type: "medals", values: Array(18).fill(1)},
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
            { type: "happiness", values: Array(18).fill(1)},
            { type: "population", values: Array(18).fill(1)},
            { type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "supplies", values: Array(18).fill(1)},
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
            { type: "happiness", values: Array(18).fill(1)}
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
            { type: "medals", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(2)},
            { type: "medals", values: Array(18).fill(1)},
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
            { type: "medals", values: Array(18).fill(1)}
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(5)},
            { type: "medals", values: Array(18).fill(1)},
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
            { type: "happiness", values: Array(18).fill(1)}
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
            { type: "happiness", values: Array(18).fill(1)}
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