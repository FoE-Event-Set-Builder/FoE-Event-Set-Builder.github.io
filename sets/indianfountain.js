// Fountain Blue (warm ocean)

let elephant = {
    name: "Elephant Fountain",
    text: "E",
    size: [4, 4],
    road: true,
    level: [{
        id: "A_MultiAge_SummerBonusSetB17a",
        rewards: [
            { type: "happiness", values: [1120,1240,1510,1690,1880,2210,2490,2740,2930,3050,3550,4300,5160,6010,6930,8280,13250,14400] }
        ],
        bonuses: [
            { type: "coinsBoost", values: [8,8,8,9,9,9,10,10,11,11,12,12,13,13,14,14,15,15] },
            { type: "supplyBoost", values: [8,8,8,9,9,9,10,10,11,11,12,12,13,13,14,14,15,15] },
            { type: "defendingDefense", values: [3,3,3,4,4,4,5,5,6,6,7,7,8,8,9,9,10,10] },
            { type: "attackingAttack", values: [2,2,2,3,3,3,4,4,5,5,6,6,7,7,8,8,9,9] }
        ]
    }
    ],
    color: 0xdddddd
}

let gate = {
    name: "Elephant Fountain Gate",
    text: "G",
    size: [1, 3],
    road: true,
    level: [{
        id: "R_MultiAge_SummerBonusSetB17b",
        rewards: [
            { type: "coins", values: [150,360,600,840,1110,1690,2110,2560,3180,4000,5210,6030,6910,7850,8860,9920,16570,18350] }
        ],
        bonuses: [
            { type: "coins", values: [150,360,600,840,1110,1690,2110,2560,3180,4000,5210,6030,6910,7850,8860,9920,16570,18350] }, //guess
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0xbbbbbb
}

let chhatri = {
    name: "Chhatri Garden",
    text: "C",
    size: [1, 3],
    road: false,
    level: [{
        id: "D_MultiAge_SummerBonusSetB17b",
        rewards: [
            { type: "happiness", values: [70,100,120,130,140,170,190,190,210,220,230,270,330,400,460,530,640,1020] } 
        ],
        bonuses: [
            { type: "happiness", values: [70,100,120,130,140,170,190,190,210,220,230,270,330,400,460,530,640,1020] },
            { type: "happiness", values: [70,100,120,130,140,170,190,190,210,220,230,270,330,400,460,530,640,1020] }
        ]
    }
    ],
    color: 0x999999
}

let titan = {
    name: "Titan Arum Plant",
    text: "T",
    size: [1, 1],
    road: false,
    level: [{
        id: "D_MultiAge_SummerBonusSetB17a",
        rewards: [
            { type: "happiness", values: [20,25,30,35,40,45,50,60,70,80,95,115,130,150,180,210,340,370] } 
        ],
        bonuses: [
            { type: "happiness", values: [20,25,30,35,40,45,50,60,70,80,95,115,130,150,180,210,340,370] },
            { type: "happiness", values: [20,25,30,35,40,45,50,60,70,80,95,115,130,150,180,210,340,370] }
        ]
    }
    ],
    color: 0x777777
}

let memorial = {
    name: "Memorial Chhatri",
    text: "M",
    size: [1, 1],
    road: true,
    level: [{
        id: "R_MultiAge_SummerBonusSetB17a",
        rewards: [
            { type: "coins", values: [50,120,200,280,370,560,700,850,1060,1330,1740,2010,2300,2620,2950,3310,5520,6120] } 
        ],
        bonuses: [
            { type: "coins", values: [50,130,210,290,390,590,740,890,1110,1400,1820,2110,2420,2750,3100,3470,5800,6420] },
            { type: "medals", values: [1,1,1,2,3,5,7,10,13,18,23,30,35,40,47,53,60,70] }
        ]
    }
    ],
    color: 0x555555
}

function getIndianFountain() {
    return [elephant, gate, chhatri, titan, memorial];
}
