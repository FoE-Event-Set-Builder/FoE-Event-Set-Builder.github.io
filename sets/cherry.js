let sakura = {
    name: "Sakura Rock",
    text: "S",
    size: [2, 3],
    road: false,
    level: [{
        id: "D_MultiAge_SpringBonusSet17b",
        rewards: [
            { type: "happiness", values: [200, 260, 280, 320, 350, 410, 470, 510, 550, 570, 660, 810, 970, 1130, 1300, 1550, 2480, 2700] }
        ],
        bonuses: [
            { type: "happiness", values: [240, 310, 340, 380, 420, 490, 560, 610, 660, 680, 790, 970, 1160, 1360, 1560, 1860, 2980, 3240] },
            { type: "attackingAttack", values: Array(18).fill(2) },
            { type: "attackingAttack", values: Array(18).fill(3) }
        ]
    },
    {
        id: "D_MultiAge_SpringBonusSet18b",
        rewards: [
            { type: "happiness", values: [340, 580, 640, 720, 800, 940, 1060, 1170, 1250, 1300, 1510, 1830, 2200, 2560, 2950, 3530, 5650, 6140] }
        ],
        bonuses: [
            { type: "happiness", values: [410, 700, 770, 860, 960, 1130, 1270, 1400, 1500, 1560, 1810, 2200, 2640, 3070, 3540, 4240, 6780, 7370] },
            //{ type: "attackingAttack", values: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
            { type: "attackingAttack", values: Array(18).fill(4)},
            { type: "attackingAttack", values: Array(18).fill(6)}
        ]
    }
    ],
    color: 0xEB4A5F
}

let emp = {
    name: "Emperor's Entrance",
    text: "E",
    size: [3, 2],
    road: true,
    level: [{
        id: "R_MultiAge_SpringBonusSet17b",
        rewards: [
            { type: "coins", values: [300, 720, 1200, 1700, 2200, 2400, 5100, 6500, 8000, 10400, 12000, 13800, 15700, 17700, 19830, 33120, 36690] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "supplies", values: [280, 660, 1100, 1550, 2050, 2600, 3150, 3700, 4300, 4900, 5500, 6200, 6800, 7500, 8200, 8860, 14340, 15400] },
            { type: "medals", values: [3, 3, 4, 4, 5, 6, 9, 11, 15, 21, 30, 38, 48, 57, 66, 80, 100, 120] }
        ]
    },
    {
        id: "R_MultiAge_SpringBonusSet18b",
        rewards: [
            { type: "coins", values: [450, 1080, 1800, 2520, 3330, 5070, 6320, 7670, 9540, 12000, 15620, 18090, 20740, 23560, 26570, 29760, 49710, 55060] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "medals", values: [5, 6, 7, 8, 10, 12, 15, 20, 30, 45, 60, 75, 90, 110, 120, 135, 160, 180] },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }
    ],
    color: 0xB56B9C
}

let zen = {
    name: "Zen Zone",
    text: "Z",
    size: [3, 2],
    road: true,
    level: [{
        id: "R_MultiAge_SpringBonusSet17a",
        rewards: [
            { type: "coins", values: [260, 630, 1050, 1450, 1950, 2950, 2700, 4500, 5600, 7000, 8100, 10500, 12000, 18800, 15500, 17360, 29000, 32120] }
        ],
        bonuses: [
            { type: "supplies", values: [340, 810, 1350, 1890, 2500, 3180, 3850, 4530, 5270, 6010, 6760, 7570, 8310, 9120, 10000, 10810, 17500, 18780] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "goods", values: Array(18).fill(5) }
        ]
    },
    {
        id: "R_MultiAge_SpringBonusSet18a",
        rewards: [
            { type: "coins", values: [380, 900, 1500, 2100, 2780, 4230, 5270, 6390, 7950, 10000, 13020, 15080, 17280, 19640, 22140, 24800, 41420, 45880] }
        ],
        bonuses: [
            { type: "supplies", values: [530, 1260, 2100, 2940, 3890, 4940, 5990, 7040, 8190, 9350, 10500, 11760, 12920, 14180, 15540, 16800, 27200, 29190] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "goods", values: Array(18).fill(10) }
        ]
    }
    ],
    color: 0xFFD0C3
}

let pond = {
    name: "Nishikigoi Pond",
    text: "N",
    size: [2, 3],
    road: false,
    level: [{
        id: "D_MultiAge_SpringBonusSet17a",
        rewards: [
            { type: "happiness", values: [200, 260, 280, 320, 350, 410, 470, 510, 550, 570, 660, 810, 970, 1130, 1300, 1550, 2480, 2700] }
        ],
        bonuses: [
            { type: "happiness", values: [240, 310, 340, 380, 420, 490, 560, 610, 660, 680, 790, 970, 1160, 1360, 1560, 1860, 2980, 3240] },
            { type: "defendingDefense", values: Array(18).fill(2) },
            { type: "defendingDefense", values: Array(18).fill(3) }
        ]
    },
    {
        id: "D_MultiAge_SpringBonusSet18a",
        rewards: [
            { type: "happiness", values: [340, 580, 640, 720, 800, 940, 1060, 1170, 1250, 1300, 1510, 1830, 2200, 2560, 2950, 3530, 5650, 6140] }
        ],
        bonuses: [
            { type: "happiness", values: [410, 700, 770, 860, 960, 1130, 1270, 1400, 1500, 1560, 1810, 2200, 2640, 3070, 3540, 4240, 6780, 7370] },
            { type: "defendingDefense", values: Array(18).fill(5)},
            { type: "defendingDefense", values: Array(18).fill(7) }
        ]
    }
    ],
    color: 0x6A5ACD
}

let gong = {
    name: "Gong of Wisdom",
    text: "G",
    size: [1, 1],
    road: false,
    level: [{
        id: "L_AllAge_SpringBonusSet17",
        rewards: [
            { type: "medals", values: [1, 1, 1, 1, 1, 1, 2, 2, 4, 5, 6, 8, 10, 12, 15, 18, 24, 30] }
        ],
        bonuses: [
            { type: "medals", values: [1, 1, 1, 1, 2, 2, 3, 4, 5, 7, 10, 12, 15, 15, 16, 18, 22, 25] },
            { type: "medals", values: [1, 1, 2, 2, 2, 3, 4, 5, 6, 10, 15, 20, 25, 30, 35, 40, 48, 54] },
            { type: "fps", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    },
    {
        id: "L_AllAge_SpringBonusSet18",
        rewards: [
            { type: "medals", values: [1, 1, 1, 1, 1, 1, 2, 2, 4, 5, 6, 8, 10, 12, 15, 18, 24, 30] }
        ],
        bonuses: [
            { type: "medals", values: [2, 2, 2, 2, 3, 4, 6, 8, 10, 12, 15, 18, 21, 25, 30, 35, 44, 54] },
            { type: "medals", values: [2, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 55, 65] },
            { type: "fps", values: Array(18).fill(2) },
            { type: "fps", values: Array(18).fill(2) }
        ]
    }
    ],
    color: 0xE0003A
}

function getCherry(){
    return [sakura, emp, zen, pond, gong];
}

// Cherry 12x13, 140% atk, 140 tiles
//010001171I-10I-6.5x010101171I-7.5I-7x010201171I-9.5I-4x010301171I-7I-4.5x010401171I-8.5I-5.5x000001171I-9I3.5x000101171I-8.5I6x000201171I-6.5I3x000401171I-7.5I4.5x010001171I-2I-6.5x010101171I-1.5I-4x010201171I-9.5I-9x010201171I-4.5I-7x010201171I-4.5I-4x010401171I-7.5I-8.5x010401171I-4.5I-5.5x010401171I-0.5I-5.5x010401171I-1.5I-2.5x010201171I0.5I-7x010201171I0.5I-2x010301171I1I-4.5x000001171I-6I5.5x000001171I-7I8.5x000001171I-10I8.5x000401171I-8.5I7.5x000201171I-8.5I11x000001171I-6I11.5x000001171I-9I13.5x000101171I-6.5I14x000401171I-7.5I12.5x000401171I-14.5I4.5x000401171I-10.5I10.5x000401171I-14.5I12.5x000401171I-13.5I7.5x000401171I-10.5I6.5x000001171I-16I5.5x000001171I-13I3.5x000001171I-11I4.5x000001171I-12I8.5x000001171I-15I8.5x000001171I-13I13.5x000101171I-15.5I3x000101171I-13.5I11x000201171I-15.5I14x000201171I-13.5I6x000001171I-16I11.5x000001171I-11I12.5

// My setup cherry + piazza
// 010001171I-10I-6.5x010101171I-7.5I-7x010201171I-9.5I-4x010301171I-7I-4.5x010401171I-8.5I-5.5x000001171I-9I3.5x000101171I-8.5I6x000201171I-6.5I3x000401171I-7.5I4.5x010001171I-2I-6.5x010101171I-1.5I-4x010201171I-9.5I-9x010201171I-4.5I-7x010201171I-4.5I-4x010401171I-7.5I-8.5x010401171I-4.5I-5.5x010401171I-0.5I-5.5x010401171I-1.5I-2.5x010201171I0.5I-7x010201171I0.5I-2x010301171I1I-4.5x000001171I-6I5.5x000001171I-7I8.5x000001171I-10I8.5x000401171I-8.5I7.5x000201171I-8.5I11x000001171I-6I11.5x000001171I-9I13.5x000101171I-6.5I14x000401171I-7.5I12.5x000401171I-14.5I4.5x000401171I-10.5I10.5x000401171I-14.5I12.5x000401171I-13.5I7.5x000401171I-10.5I6.5x000001171I-16I5.5x000001171I-13I3.5x000001171I-11I4.5x000001171I-12I8.5x000001171I-15I8.5x000001171I-13I13.5x000101171I-15.5I3x000101171I-13.5I11x000201171I-15.5I14x000201171I-13.5I6x000001171I-16I11.5x000001171I-11I12.5x000001171I-14I16.5x000001171I-17I16.5x000001171I-8I16.5x000001171I-5I16.5x000001171I-9I19.5x000001171I-6I21.5x000001171I-16I21.5x000001171I-13I19.5x000101171I-15.5I19x000201171I-6.5I19x000201171I-13.5I22x000101171I-8.5I22x000001171I-11I20.5x000401171I-15.5I15.5x000401171I-6.5I15.5x000401171I-14.5I20.5x000401171I-7.5I20.5x000401171I-10.5I22.5x010401171I-5.5I-5.5x010401171I-3.5I-5.5
// 101h1uyauy6wgz111h1uy7wguy7z121h1uy9wguy4z131h1uy7uy4wgz141h1uy8wguy5wgz001h1uy9u3wgz011h0uy8wgu6z021h1uy6wgu3z041h1uy7wgu4wgz101h1uy2uy6wgz111h1uy1wguy4z121h1uy9wguy9z121h1uy4wguy7z121h1uy4wguy4z141h1uy7wguy8wgz141h1uy4wguy5wgz141h1uy0wguy5wgz141h1uy1wguy2wgz121h1u0wguy7z121h1u0wguy2z131h1u1uy4wgz001h1uy6u5wgz001h1uy7u8wgz001h1uyau8wgz041h1uy8wgu7wgz021h0uy8wgubz001h1uy6ubwgz001h1uy9udwgz011h1uy6wguez041h1uy7wgucwgz041h1uyewgu4wgz041h1uyawguawgz041h1uyewgucwgz041h1uydwgu7wgz041h1uyawgu6wgz001h1uygu5wgz001h1uydu3wgz001h1uybu4wgz001h1uycu8wgz001h1uyfu8wgz001h1uydudwgz011h1uyfwgu3z011h0uydwgubz021h1uyfwguez021h0uydwgu6z001h1uygubwgz001h1uybucwgz001h1uyeugwgz001h1uyhugwgz001h1uy8ugwgz001h1uy5ugwgz001h1uy9ujwgz001h1uy6ulwgz001h1uygulwgz001h1uydujwgz011h1uyfwgujz021h1uy6wgujz021h1uydwgumz011h1uy8wgumz001h1uybukwgz041h1uyfwgufwgz041h1uy6wgufwgz041h1uyewgukwgz041h1uy7wgukwgz041h1uyawgumwgz141h1uy5wguy5wgz141h1uy3wguy5wg

// All
// 070000171I-14.5I-24x070100171I-17I-23.5x070200171I-12I-22x070300171I-15.5I-22x070400171I-12.5I-24x070500171I-14I-21.5x070600171I-17I-21.5x070700171I-13.5I-22.5x070800171I-14.5I-22.5x000001171I0I-24.5x000101171I2.5I-25x000201171I0.5I-22x000301171I3I-22.5x000401171I1.5I-23.5x010001171I0I-17.5x010101171I0.5I-15x010201171I2.5I-18x010301171I3I-15.5x010401171I1.5I-16.5x020001171I1I-10.5x020101171I2.5I-7.5x020201171I0I-7.5x020301171I3.5I-9.5x020401171I3.5I-11x030000171I-17I-11x030100171I-20I-12x030200171I-14I-12x030300171I-14I-10x030400171I-20I-10x040400171I-14.5I-3.5x040300171I-19.5I-3.5x040200171I-14.5I-5.5x040100171I-19.5I-5.5x040000171I-17I-5x050000171I-15I-18x050100171I-16I-16x050200171I-14I-16x060000171I-4I-1x060100171I-9I-1x060200171I-6.5I-1.5
// 700h1u3wguyfz710h1u1uyewgz720h1uy1uyfz730h1u2wguydz740h1uy1wguydz750h1u4uydwgz760h1u0uycwgz770h1uy0wguydwgz780h1u1wguycwgz001h1uy1uy1wgz011h1u1wguy2z021h1uy0wgu1z031h1u2u0wgz041h1u0wguy0wgz101h1uycuy8wgz111h1uybwguy6z121h1uy9wguy9z131h1uy9uy6wgz141h1uyawguy7wgz201h1uybuy1wgz211h1uy9wgu1wgz221h1uycu1wgz231h1uy8wguy0wgz241h1uy8wguy2z300h1u2uy8z310h1uy1uy9z320h1u5uy9z330h1uy1uy7z340h1u5uy7z440h1uy7wgu8wgz430h1uycwgu8wgz420h1uy7wgu6wgz410h1uycwgu6wgz400h1uyau7z500h1uybuyfz510h1uycuydz520h1uyauydz600h1u2u7z610h1u0u8z620h1uy0wgu5wg