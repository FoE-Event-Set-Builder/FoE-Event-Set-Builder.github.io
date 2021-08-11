let teacups = {
    name: "Terror Teacups",
    text: "T",
    size: [2, 3],
    road: true,
    level: [{
        id: "A_S_MultiAge_HalloweenBonusSet21a",
        rewards: [
        ],
        bonuses: [
            ]
    },
    {
        id: "A_SS_MultiAge_HalloweenBonusSet21b",
        rewards: [
            ],
        bonuses: [
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
        id: "D_SS_MultiAge_HalloweenBonusSet21a",
        rewards: [
        ],
        bonuses: [
            ]
    },
    {
        id: "D_SS_MultiAge_HalloweenBonusSet21b",
        rewards: [
            ],
        bonuses: [
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
        id: "L_SS_AllAge_HalloweenBonusSet21a",
        rewards: [
        ],
        bonuses: [
            ]
    },
    {
        id: "L_SS_AllAge_HalloweenBonusSet21b",
        rewards: [
            ],
        bonuses: [
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
        ],
        bonuses: [
            ]
    },
    {
        id: "R_SS_MultiAge_HalloweenBonusSet21b",
        rewards: [
            ],
        bonuses: [
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
        ],
        bonuses: [
            ]
    },
    {
        id: "R_SS_MultiAge_HalloweenBonusSet21d",
        rewards: [
            ],
        bonuses: [
        ]
    }
    ],
    color: 0xD82D4A
}

function getCircus(){
    return [teacups,organ,wheel,helter,clown];
}