let teacups = {
    name: "Terror Teacups",
    text: "T",
    size: [2, 3],
    road: true,
    level: [{
        id: "A_MultiAge_HalloweenBonusSet21a",
        rewards: [
            {type: "happiness", values: [170,260,310,360,420,490,550,610,650,730,850,1030,1320,1590,1950,2540,4060,4420,4770]}
        ],
        bonuses: [
            {type: "defendingAttack", values: Array(18).fill(4)},
            {type: "defendingDefense", values: Array(18).fill(3)},
            {type: "attackingDefense", values: Array(18).fill(3)}
            ]
    },
    {
        id: "A_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "happiness", values: [200,280,360,430,510,600,680,750,800,940,1090,1320,1760,2150,2720,3670,5870,6380,6890]}
        ],
        bonuses: [
            {type: "defendingAttack", values: Array(18).fill(8)},
            {type: "defendingDefense", values: Array(18).fill(7)},
            {type: "attackingDefense", values: Array(18).fill(6)}
            ]
    }
    ],
    color: 0xDC8CA8
}

let organ = {
    name: "Mystical Organ",
    text: "M",
    size: [3, 1],
    road: false,
    level: [{
        id: "D_MultiAge_HalloweenBonusSet21a",
        rewards: [
            {type: "happiness", values: [90,140,160,190,220,250,290,310,340,350,410,500,620,720,860,1020,1640,1780,1920]}
        ],
        bonuses: [
            {type: "coinsBoost", values: Array(18).fill(4)},
            {type: "defendingAttack", values: Array(18).fill(1)},
            {type: "attackingDefense", values: Array(18).fill(2)}
            ]
    },
    {
        id: "D_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "happiness", values: [110,160,190,230,270,320,360,400,420,440,510,620,790,920,1120,1340,2150,2330,2520]}
        ],
        bonuses: [
            {type: "coinsBoost", values: Array(18).fill(8)},
            {type: "defendingAttack", values: Array(18).fill(3)},
            {type: "attackingDefense", values: Array(18).fill(5)}
            ]
    }
    ],
    color: 0xa67be9
}

let wheel = {
    name: "Wheel of Death",
    text: "W",
    size: [2, 1],
    road: false,
    level: [{
        id: "L_AllAge_HalloweenBonusSet21a",
        rewards: [
            {type: "medals", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(18).fill(1)},
            {type: "fps", values: Array(18).fill(1)}
            ]

    },
    {
        id: "L_AllAge_HalloweenBonusSet21b",
        rewards: [
            {type: "medals", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(18).fill(1)},
            {type: "fps", values: Array(18).fill(3)}
            ]
    }
    ],
    color: 0x7589B8
}

let helter = {
    name: "Helter Skelter",
    text: "H",
    size: [3, 3],
    road: true,
    level: [{
        id: "R_SS_MultiAge_HalloweenBonusSet21a",
        rewards: [
            {type: "coins", values: Array(18).fill(1)},
            {type: "happiness", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(18).fill(1)},
            {type: "goods", values: Array(18).fill(1)},
            {type: "fps", values: Array(18).fill(3)},
            {type: "goods", values: Array(18).fill(4)}
            ]
    },
    {
        id: "R_SS_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "coins", values: Array(18).fill(1)},
            {type: "happiness", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(18).fill(1)},
            {type: "goods", values: Array(18).fill(2)},
            {type: "fps", values: Array(18).fill(6)},
            {type: "goods", values: Array(18).fill(8)}
            ]
    }
    ],
    color: 0x9a2552
}

let clown = {
    name: "Clown Town",
    text: "C",
    size: [5, 2],
    road: true,
    level: [{
        id: "R_SS_MultiAge_HalloweenBonusSet21c",
        rewards: [
            {type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "fps", values: Array(18).fill(1)},
            {type: "goods", values: Array(18).fill(5)}
            ]
    },
    {
        id: "R_SS_MultiAge_HalloweenBonusSet21d",
        rewards: [
            {type: "coins", values: Array(18).fill(1)}
        ],
        bonuses: [
            {type: "fps", values: Array(18).fill(2)},
            {type: "goods", values: Array(18).fill(15)}
            ]
    }
    ],
    color: 0xD82D4A
}

function getCircus(){
    return [teacups,organ,wheel,helter,clown];
}
