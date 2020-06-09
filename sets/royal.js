let king = {
    name: "King Statue",
    text: "K",
    size: [2, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [220,530,880,1260,1670,2140,2670,3320,4130,5070,6250,7640,9220,11000,12990,14550,24300,26920] }
        ],
        bonuses: [
            { type: "medals", values: [2,2,3,3,3,4,6,9,12,16,20,25,30,36,42,50,65,80] },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0x067136
}

let queen = {
    name: "Queen Statue",
    text: "Q",
    size: [2, 2],
    road: true,
    level: [{
        rewards: [
            { type: "coins", values: [220,530,880,1260,1670,2140,2670,3320,4130,5070,6250,7640,9220,11000,12990,14550,24300,26920] }
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(5) },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0x0bdc69
}

let ruins = {
    name: "Garden Ruins",
    text: "G",
    size: [3, 3],
    road: false,
    level: [{
        rewards: [
            { type: "happiness", values: [290,360,410,470,530,600,670,750,830,910,1000,1160,1360,1580,1830,2180,3490,3790] }
        ],
        bonuses: [
            { type: "defendingDefense", values: Array(18).fill(2) },
            { type: "defendingDefense", values: Array(18).fill(3)  }
        ]
    }
    ],
    color: 0x009e41
}

function getRoyalGarden() {
    return [king, queen, ruins];
}
