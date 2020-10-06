let ginger = {
    name: "Gingerbread Bakery",
    text: "G",
    size: [3, 5],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonus20fGingerbread",
        rewards: [
            { type: "population", values: [216,464,712,1000,1312,1656,2024,2416,2832,3264,3720,4192,4688,5200,5728,6272,9928,10784] },
            { type: "happiness", values: [1170,2020,2230,2490,2780,3270,3680,4040,4330,4510,5240,6360,7620,8870,10240,12230,19570,21270] },
            { type: "coins", values: [1600,3700,6200,8700,11500,17500,21800,26400,32900,41300,53800,62300,71400,81200,91500,102500,171200,189600] },
            { type: "supplies", values: [1530,2640,2920,3260,3630,4270,4820,5290,5660,5900,6850,8320,9960,11600,13390,15990,25590,27810] },
            { type: "goods", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "fps", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "defendingAttack", values: [6,6,6,8,8,10,10,10,12,12,14,14,14,16,16,18,18,18] }
        ],
        bonuses: [
            { type: "attackingAttack", values: Array(18).fill(10) },
            { type: "attackingAttack", values: Array(18).fill(5) }
        ]
    }],
    color: 0xD89954
}

let marzipan = {
    name: "Marzipan Bakery",
    text: "Z",
    size: [3, 5],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonus20fMarzipan",
        rewards: [
            { type: "population", values: [254,545,837,1175,1542,1946,2378,2839,3328,3835,4371,4926,5508,6110,6730,7370,11665,12671] },
            { type: "happiness", values: [1170,2020,2230,2490,2780,3270,3680,4040,4330,4510,5240,6360,7620,8870,10240,12230,19570,21270] },
            { type: "coins", values: [1600,3700,6200,8700,11500,17500,21800,26400,32900,41300,53800,62300,71400,81200,91500,102500,171200,189600] },
            { type: "supplies", values: [1530,2640,2920,3260,3630,4270,4820,5290,5660,5900,6850,8320,9960,11600,13390,15990,25590,27810] },
            { type: "goods", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "fps", values: [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6] },
            { type: "coinsBoost", values: [20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20] }
        ],
        bonuses: [
            { type: "fps", values: Array(18).fill(1) },
            { type: "fps", values: Array(18).fill(1) }
        ]
    }],
    color: 0xd4f2f0
}

let macaron = {
    name: "Macaron Bakery",
    text: "M",
    size: [3, 5],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonus20fPatisserie",
        rewards: [
            { type: "population", values: [216,464,712,1000,1312,1656,2024,2416,2832,3264,3720,4192,4688,5200,5728,6272,9928,10784] },
            { type: "happiness", values: [1170,2020,2230,2490,2780,3270,3680,4040,4330,4510,5240,6360,7620,8870,10240,12230,19570,21270] },
            { type: "coins", values: [1600,3700,6200,8700,11500,17500,21800,26400,32900,41300,53800,62300,71400,81200,91500,102500,171200,189600] },
            { type: "supplies", values: [1530,2640,2920,3260,3630,4270,4820,5290,5660,5900,6850,8320,9960,11600,13390,15990,25590,27810] },
            { type: "goods", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "fps", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "defendingDefense", values: [6,6,6,8,8,10,10,10,12,12,14,14,14,16,16,18,18,18] }
        ],
        bonuses: [
            { type: "attackingDefense", values: Array(18).fill(13) },
            { type: "attackingDefense", values: Array(18).fill(5) }
        ]
    }],
    color: 0xdfbbe9
}

let lussebullar = {
    name: "Lussebullar Bakery",
    text: "L",
    size: [3, 5],
    road: true,
    level: [{
        id: "R_MultiAge_WinterBonus20fLussebullar",
        rewards: [
            { type: "population", values: [216,464,712,1000,1312,1656,2024,2416,2832,3264,3720,4192,4688,5200,5728,6272,9928,10784] },
            { type: "happiness", values: [1170,2020,2230,2490,2780,3270,3680,4040,4330,4510,5240,6360,7620,8870,10240,12230,19570,21270] },
            { type: "coins", values: [1600,3700,6200,8700,11500,17500,21800,26400,32900,41300,53800,62300,71400,81200,91500,102500,171200,189600] },
            { type: "supplies", values: [1530,2640,2920,3260,3630,4270,4820,5290,5660,5900,6850,8320,9960,11600,13390,15990,25590,27810] },
            { type: "goods", values: [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10] },
            { type: "fps", values: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
            { type: "supplyBoost", values: [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25] }
        ],
        bonuses: [
            { type: "goods", values: Array(18).fill(5) },
            { type: "goods", values: Array(18).fill(5) }
        ]
    }],
    color: 0xF7BE3B
}

/*


var stringP = "{ type: \"population\", values: [";
var stringH = "{ type: \"happiness\", values: [";
var stringC = "{ type: \"coins\", values: [";
var stringS = "{ type: \"supplies\", values: [";
var stringG = "{ type: \"goods\", values: [";
var stringF = "{ type: \"fps\", values: [";
var stringX = "{ type: \"defendingDefense\", values: [";
var building = "R_MultiAge_WinterBonus20fPatisserie";

for(var i = 1; i<18; i++){
    stringP += MainParser.CityEntities[building].entity_levels[i].provided_population + ",";
    stringH += MainParser.CityEntities[building].entity_levels[i].provided_happiness + ",";
    stringC += MainParser.CityEntities[building].entity_levels[i].produced_money + ",";
    var age = MainParser.CityEntities[building].entity_levels[i].era;
    stringS += MainParser.CityEntities[building].abilities[4].additionalResources[age].resources["supplies"] + ",";
    stringG += MainParser.CityEntities[building].abilities[4].additionalResources["AllAge"].resources["all_goods_of_age"]+",";
    stringF += MainParser.CityEntities[building].abilities[4].additionalResources["AllAge"].resources["strategy_points"]+",";
    stringX += MainParser.CityEntities[building].abilities[5].boostHints[0].boostHintEraMap[age].value + ",";
    //stringX += MainParser.CityEntities[building].abilities[5].boostHints[0].boostHintEraMap["AllAge"].value + ",";
}
var i = 18;
stringP += MainParser.CityEntities[building].entity_levels[i].provided_population + "] },";
stringH += MainParser.CityEntities[building].entity_levels[i].provided_happiness + "] },";
stringC += MainParser.CityEntities[building].entity_levels[i].produced_money + "] },";
var age = MainParser.CityEntities[building].entity_levels[i].era;
stringS += MainParser.CityEntities[building].abilities[4].additionalResources[age].resources["supplies"] + "] },";
stringG += MainParser.CityEntities[building].abilities[4].additionalResources["AllAge"].resources["all_goods_of_age"]+"] },";
stringF += MainParser.CityEntities[building].abilities[4].additionalResources["AllAge"].resources["strategy_points"]+"] },";
stringX += MainParser.CityEntities[building].abilities[5].boostHints[0].boostHintEraMap[age].value + "] }";
//stringX += MainParser.CityEntities[building].abilities[5].boostHints[0].boostHintEraMap["AllAge"].value + "] }";
console.log(stringP + "\n" + stringH + "\n" + stringC + "\n" + stringS + "\n" + stringG + "\n" + stringF + "\n" + stringX);

var bonus1;
var bonus2; 



*/

function getBakery() {
    return [ginger, marzipan, macaron,lussebullar];
}

// 9x9 design: 48 FPs, 40 Goods, 24/12% atk
//020001171I4I-2.5x020101170I1.5I0.5x020201171I5I0.5x020301171I1.5I-1.5x020401171I1.5I-3x020001171I4I3.5x020001171I-1I-2.5x020001171I-1I3.5x020201171I-2I0.5x020301171I1.5I2.5x020401171I1.5I4x020301171I3.5I-0.5x020301171I3.5I1.5x020301171I-0.5I-0.5x020301171I-0.5I1.5x020301171I3.5I0.5x020301171I-0.5I0.5