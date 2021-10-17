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
            {type: "defendingDefense", values: Array(19).fill(4)},
            {type: "defendingAttack", values: Array(19).fill(3)},
            {type: "attackingAttack", values: Array(19).fill(3)}
            ]
    },
    {
        id: "A_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "happiness", values: [200,280,360,430,510,600,680,750,800,940,1090,1320,1760,2150,2720,3670,5870,6380,6890]}
        ],
        bonuses: [
            {type: "defendingDefense", values: Array(19).fill(8)},
            {type: "defendingAttack", values: Array(19).fill(6)},
            {type: "attackingAttack", values: Array(19).fill(6)}
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
            {type: "coinsBoost", values: Array(19).fill(4)},
            {type: "defendingAttack", values: Array(19).fill(1)},
            {type: "attackingDefense", values: Array(19).fill(2)}
            ]
    },
    {
        id: "D_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "happiness", values: [110,160,190,230,270,320,360,400,420,440,510,620,790,920,1120,1340,2150,2330,2520]}
        ],
        bonuses: [
            {type: "coinsBoost", values: Array(19).fill(8)},
            {type: "defendingAttack", values: Array(19).fill(4)},
            {type: "attackingDefense", values: Array(19).fill(5)}
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
            {type: "medals", values: Array(19).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(19).fill(1)},
            {type: "fps", values: Array(19).fill(1)}
            ]

    },
    {
        id: "L_AllAge_HalloweenBonusSet21b",
        rewards: [
            {type: "medals", values: Array(19).fill(1)}
        ],
        bonuses: [
            {type: "medals", values: Array(19).fill(1)},
            {type: "fps", values: Array(19).fill(3)}
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
        id: "R_MultiAge_HalloweenBonusSet21a",
        rewards: [
            {type: "coins", values: [350,800,1400,1900,2500,3800,4700,5800,7200,9000,1100,13600,15600,17700,19900,22300,37300,41300,45500]},
            {type: "happiness", values: [-40,-70,-80,-90,-100,-110,-130,-140,-150,-160,-180,-220,-260,-310,-350,-420,-680,-740,-800]}
        ],
        bonuses: [
            {type: "medals", values: [3,4,5,6,6,7,10,14,20,27,39,53,70,89,108,128,151,174,197]},
            {type: "goods", values: Array(19).fill(1)},
            {type: "fps", values: Array(19).fill(3)},
            {type: "goods", values: Array(19).fill(4)}
            ]
    },
    {
        id: "R_MultiAge_HalloweenBonusSet21b",
        rewards: [
            {type: "coins", values: [400,1000,1600,2300,3000,4600,5700,6900,8600,10800,14100,16300,18700,21200,23900,26800,44700,49600,54600]},
            {type: "happiness", values: [-40,-70,-80,-90,-100,-110,-130,-140,-150,-160,-180,-220,-260,-310,-350,-420,-680,-740,-800]}
        ],
        bonuses: [
            {type: "medals", values: [5,7,8,10,11,13,18,25,36,50,71,96,128,163,198,234,276,319,361]},
            {type: "goods", values: Array(19).fill(2)},
            {type: "fps", values: Array(19).fill(6)},
            {type: "goods", values: Array(19).fill(8)}
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
        id: "R_MultiAge_HalloweenBonusSet21c",
        rewards: [
            {type: "coins", values: [400,1000,1600,2400,3200,4800,6000,7200,9000,11300,14800,17100,19600,22300,25100,28100,47000,52000,57300]},
            {type: "happiness", values: [-90,-160,-170,-190,-210,-250,-280,-310,-330,-350,-400,-490,-590,-680,-790,-940,-1510,-1640,-1770]}
        ],
        bonuses: [
            {type: "fps", values: Array(19).fill(1)},
            {type: "goods", values: Array(19).fill(5)}
            ]
    },
    {
        id: "R_MultiAge_HalloweenBonusSet21d",
        rewards: [
            {type: "coins", values: [500,1100,1900,2700,3500,5400,6700,8100,10100,12700,16500,19100,21900,24900,28000,31400,52500,58100,64100]},
            {type: "happiness", values: [-90,-160,-170,-190,-210,-250,-280,-310,-330,-350,-400,-490,-590,-680,-790,-940,-1510,-1640,-1770]}
        ],
        bonuses: [
            {type: "fps", values: Array(19).fill(2)},
            {type: "goods", values: Array(19).fill(15)}
            ]
    }
    ],
    color: 0xD82D4A
}

function getCircus(){
    return [teacups,organ,wheel,helter,clown];
}
