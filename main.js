// As you can see this is just me fooling around testing a bunch of stuff, this is a hobby project, proper coding styles be damned :P
let controls, renderer, scene, camera, objects = [], texts = [], startPosition, guiControls, grid, raycaster, gui, selectionBox, selectionHelper;
let texture = new THREE.TextureLoader().load('/assets/texture.png');
let topx = 0;
let topz = 0;
let currentx = 0;
let currentz = 0;

let initDone = false;
let doUpdateRewards = true;
let line;
let frustumSize = 48;
let dragging = false;
let isDown = true;

let buildingSelected = false;
let prevSet = 0;

let testString = "test";

let pset = 0;
let pbuilding = 0;
let plevel = 1;
let page = 17;

let folder2;


// Get the information on all sets and their buildings.
let cherry = getCherry();
let piazza = getPiazza();
let celtic = getCeltic();
let indianPalace = getIndianPalace();
let indianFountain = getIndianFountain();
let classicalGarden = getClassicalGarden();
let royalGarden = getRoyalGarden();
let winterVillage = getWinterVillage();

// Array used for easy access of information, DO NOT change order, it'll break everything. Probs a better way to do this, but meh :)
let sets = [cherry, piazza, celtic, indianPalace, indianFountain, classicalGarden, royalGarden, winterVillage];

// Display information for the dat.gui controls. Again do not change order...
let setBuildings = [{ SakuraRock: 0, EmperorsEntrance: 1, ZenZone: 2, NishikigoiPond: 3, GongOfWisdom: 4 },
{ Homes: 0, Cafe: 1, ClockTower: 2, Fountain: 3, MaskVendor: 4 },
{ MoonGate: 0, FaeryRings: 1, DruidWillow: 2, MajesticFawn: 3, StandingStone: 4 },
{ Palace: 0, WesternTower: 1, EasternTower: 2, BandarPlayground: 3, JunglePond: 4 },
{ ElephantFountain: 0, FountainGate: 1, ChhatriGarden: 2, TitanArum: 3, MemorialChhatri: 4 },
{ GardenPool: 0, GardenPatio: 1, GardenStatues: 2 },
{ KingStatue: 0, QueenStatue: 1, GardenRuins: 2 },
{ Toymaker: 0, MooseMeadow: 1, SugerBaker: 2, Smörgåsbord: 3, Candlemaker: 4, Tinkerer: 5, Halmbock: 6, StrawStar: 7, MadameFortuna: 8 }];
let setNames = ["Cherry Garden", "Piazza", "Celtic Forest", "Indian Palace", "Indian Fountain", "Classical Garden", "Royal Garden", "Winter Village"];


//let selBox;

let helpElement = document.getElementById("info");
helpElement.style.display = "none";
let closeHelp = document.getElementsByClassName("close")[0];

closeHelp.onclick = function () {
    helpElement.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == helpElement) {
        helpElement.style.display = "none";
    }
}


function init() {
    // Basuc threejs stuff
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 100);

    camera.position.set(0, 20, 0);
    scene.add(camera);

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {

        var aspect = window.innerWidth / window.innerHeight;

        camera.left = frustumSize * aspect / - 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = - frustumSize / 2;

        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    // On click for main canvas
    document.querySelector("#canvas").addEventListener('mousedown', onDocumentClick, false);

    // WIP
    //window.addEventListener('mousemove', onMouseMove, false);
    //window.addEventListener('mouseup', onMouseUp, false);
    // Not in use
    //document.addEventListener('keydown', keyPressEvent, false);

    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, document.querySelector("#canvas"));
    controls.enableRotate = false;
    controls.update();

    // Drag controls for moving the buildings
    var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', dragStart);
    dragControls.addEventListener('dragend', dragEnd);
    dragControls.addEventListener('drag', drag);

    raycaster = new THREE.Raycaster();


    // Helper grid to make it easier to use, see building sizes etc
    grid = new THREE.GridHelper(1000, 1000, 0x777777, 0x777777);
    scene.add(grid);

    // Outline of the max foe city limits
    var lineMat = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var points = [];
    points.push(new THREE.Vector3(4, 0, -32));
    points.push(new THREE.Vector3(4, 0, -24));
    points.push(new THREE.Vector3(24, 0, -24));
    points.push(new THREE.Vector3(24, 0, -16));
    points.push(new THREE.Vector3(28, 0, -16));
    points.push(new THREE.Vector3(28, 0, 0));
    points.push(new THREE.Vector3(32, 0, 0));
    points.push(new THREE.Vector3(32, 0, 16));
    points.push(new THREE.Vector3(24, 0, 16));
    points.push(new THREE.Vector3(24, 0, 24));
    points.push(new THREE.Vector3(8, 0, 24));
    points.push(new THREE.Vector3(8, 0, 28));
    points.push(new THREE.Vector3(-4, 0, 28));
    points.push(new THREE.Vector3(-4, 0, 24));
    points.push(new THREE.Vector3(-24, 0, 24));
    points.push(new THREE.Vector3(-24, 0, 20));
    points.push(new THREE.Vector3(-32, 0, 20));
    points.push(new THREE.Vector3(-32, 0, -16));
    points.push(new THREE.Vector3(-24, 0, -16));
    points.push(new THREE.Vector3(-24, 0, -32));
    points.push(new THREE.Vector3(4, 0, -32));
    var lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);


    /* To be implemented
    var boxGeo = new THREE.PlaneGeometry(2, 2, 1);
    var tx = new THREE.TextureLoader().load("/assets/sel.png");
    tx.minFilter = THREE.LinearFilter;
    var boxMat = new THREE.MeshPhongMaterial({ map: tx, transparent: true, side: THREE.DoubleSide });

    selBox = new THREE.Mesh(boxGeo, boxMat);
    selBox.rotateX(90);
    scene.add(selBox);
    */


    // Controls! What do you mean the naming scheme makes no sense? 
    guiControls = new addGuiControls();
    gui = new dat.GUI();
    // Add Building
    gui.add(guiControls, 'showHelp').name("How To Use")
    var folder1 = gui.addFolder('Add Building');
    folder1.add(guiControls, 'addBuilding1').name("Add Building");;
    folder1.add(guiControls, 'set', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7 }).name("Set").onChange(updateSetBuildings);
    folder1.add(guiControls, 'building', setBuildings[guiControls.set]).name("Building").listen();
    folder1.add(guiControls, 'level', { 1: 0, 2: 1 }).name("Level").listen();;
    folder1.add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age");
    folder1.add(guiControls, 'road1').name("Road");
    folder1.add(guiControls, 'base1').name("Base");
    folder1.add(guiControls, 'bonus1').name("Set Bonus 1");
    folder1.add(guiControls, 'bonus2').name("Set Bonus 2");
    folder1.add(guiControls, 'bonus3').name("Set Bonus 3");
    folder1.open();

    // Current Building
    folder2 = gui.addFolder("Current Building");
    folder2.add(guiControls, 'removeBuilding').name("Remove Building");
    folder2.add(guiControls, 'curSet').listen().name("Set");
    folder2.add(guiControls, 'cBuilding', "").listen().name("Building");
    folder2.add(guiControls, 'cAge', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateCurrentBuilding);
    folder2.add(guiControls, 'cLevel', { 1: 0, 2: 1 }).listen().name("Level").onChange(updateCurrentBuilding);
    folder2.add(guiControls, 'cConnected').listen().name("Road Connection").onChange(updateCurrentBuilding);

    // Production overview
    var folder21 = gui.addFolder("Production Overview");

    // Combined Production
    var folder22 = folder21.addFolder("All Sets");
    // Total
    var folder3 = folder22.addFolder("Total");
    var folder4 = folder3.addFolder("Stats");
    folder4.add(guiControls, 'population').listen().name("Population");
    folder4.add(guiControls, 'happiness').listen().name("Happiness");
    folder4.open();
    var folder5 = folder3.addFolder("Resources");
    folder5.add(guiControls, 'fps').listen().name("Forge Points");
    folder5.add(guiControls, 'goods').listen().name("Goods");
    folder5.add(guiControls, 'medals').listen().name("Medals");
    folder5.add(guiControls, 'coins').listen().name("Coins");
    folder5.add(guiControls, 'supplies').listen().name("Supplies");
    folder5.open();
    var folder6 = folder3.addFolder("Boosts");
    folder6.add(guiControls, 'attackingAttack').listen().name("Atk Atk %");
    folder6.add(guiControls, 'attackingDefense').listen().name("Atk Def %");
    folder6.add(guiControls, 'defendingAttack').listen().name("Def Atk %");
    folder6.add(guiControls, 'defendingDefense').listen().name("Def Def %");
    folder6.add(guiControls, 'coinsBoost').listen().name("Coins %");
    folder6.add(guiControls, 'supplyBoost').listen().name("Supplies %");
    folder6.open();
    // Per Tile
    var folder8 = folder22.addFolder("Per Tile");
    var folder9 = folder8.addFolder("Stats");
    folder9.add(guiControls, 'tpopulation').listen().name("Population");
    folder9.add(guiControls, 'thappiness').listen().name("Happiness");
    folder9.open();
    var folder10 = folder8.addFolder("Resources");
    folder10.add(guiControls, 'tfps').listen().name("Forge Points");
    folder10.add(guiControls, 'tgoods').listen().name("Goods");
    folder10.add(guiControls, 'tmedals').listen().name("Medals");
    folder10.add(guiControls, 'tcoins').listen().name("Coins");
    folder10.add(guiControls, 'tsupplies').listen().name("Supplies");
    folder10.open();
    var folder11 = folder8.addFolder("Boosts");
    folder11.add(guiControls, 'tattackingAttack').listen().name("Atk Atk %");
    folder11.add(guiControls, 'tattackingDefense').listen().name("Atk Def %");
    folder11.add(guiControls, 'tdefendingAttack').listen().name("Def Atk %");
    folder11.add(guiControls, 'tdefendingDefense').listen().name("Def Def %");
    folder11.add(guiControls, 'tcoinsBoost').listen().name("Coins %");
    folder11.add(guiControls, 'tsupplyBoost').listen().name("Supplies %");
    folder11.open();

    // Per Set Productions
    var folder322 = folder21.addFolder("Per Set");
    folder322.add(guiControls, 'cset', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7 }).listen().name("Set");
    // Total
    var folder33 = folder322.addFolder("Total");
    var folder34 = folder33.addFolder("Stats");
    folder34.add(guiControls, 'spopulation').listen().name("Population");
    folder34.add(guiControls, 'shappiness').listen().name("Happiness");
    folder34.open();
    var folder35 = folder33.addFolder("Resources");
    folder35.add(guiControls, 'sfps').listen().name("Forge Points");
    folder35.add(guiControls, 'sgoods').listen().name("Goods");
    folder35.add(guiControls, 'smedals').listen().name("Medals");
    folder35.add(guiControls, 'scoins').listen().name("Coins");
    folder35.add(guiControls, 'ssupplies').listen().name("Supplies");
    folder35.open();
    var folder36 = folder33.addFolder("Boosts");
    folder36.add(guiControls, 'sattackingAttack').listen().name("Atk Atk %");
    folder36.add(guiControls, 'sattackingDefense').listen().name("Atk Def %");
    folder36.add(guiControls, 'sdefendingAttack').listen().name("Def Atk %");
    folder36.add(guiControls, 'sdefendingDefense').listen().name("Def Def %");
    folder36.add(guiControls, 'scoinsBoost').listen().name("Coins %");
    folder36.add(guiControls, 'ssupplyBoost').listen().name("Supplies %");
    folder36.open();
    // Per Tile
    var folder38 = folder322.addFolder("Per Tile");
    var folder39 = folder38.addFolder("Stats");
    folder39.add(guiControls, 'stpopulation').listen().name("Population");
    folder39.add(guiControls, 'sthappiness').listen().name("Happiness");
    folder39.open();
    var folder310 = folder38.addFolder("Resources");
    folder310.add(guiControls, 'stfps').listen().name("Forge Points");
    folder310.add(guiControls, 'stgoods').listen().name("Goods");
    folder310.add(guiControls, 'stmedals').listen().name("Medals");
    folder310.add(guiControls, 'stcoins').listen().name("Coins");
    folder310.add(guiControls, 'stsupplies').listen().name("Supplies");
    folder310.open();
    var folder311 = folder38.addFolder("Boosts");
    folder311.add(guiControls, 'stattackingAttack').listen().name("Atk Atk %");
    folder311.add(guiControls, 'stattackingDefense').listen().name("Atk Def %");
    folder311.add(guiControls, 'stdefendingAttack').listen().name("Def Atk %");
    folder311.add(guiControls, 'stdefendingDefense').listen().name("Def Def %");
    folder311.add(guiControls, 'stcoinsBoost').listen().name("Coins %");
    folder311.add(guiControls, 'stsupplyBoost').listen().name("Supplies %");
    folder311.open();

    // Save / Load Build
    var folder7 = gui.addFolder("Save/Load Build");
    folder7.add(guiControls, 'save').name("Save Build");
    folder7.add(guiControls, 'saveString').listen().name("Copy:");
    folder7.add(guiControls, 'loadString').listen().name("Paste:");
    folder7.add(guiControls, 'load').name("Load Build");
    folder7.open();

    // Toggles
    var folder41 = gui.addFolder("Settings / Toggles");
    folder41.add(guiControls, 'texts').name("Show Initials").onChange(updateTextVisibilities);
    folder41.add(guiControls, 'line').name("City Outline").onChange(updateLineVisibilities);
    folder41.add(guiControls, 'highlightRoads').name("Needs Road").onChange(updateRoadHighlight);
    folder41.open();

    //selectionBox = new SelectionBox(camera, scene);
    //selectionHelper = new SelectionHelper(selectionBox, renderer, 'selectBox');

    initDone = true; // Not really used, but why not leave it in??
}

// Update the highlighting of buildings requiring roads
function updateRoadHighlight() {
    var highlight = guiControls.highlightRoads;
    for (var i = 0; i < objects.length; i++) {
        var color = highlight ? (sets[objects[i].set][objects[i].building].road ? 0xffff33 : 0xcccccc) : sets[objects[i].set][objects[i].building].color;
        objects[i].material.color = new THREE.Color(color);
    }
}


// Update the "Add Building" controls based on which set is selected
function updateSetBuildings() {

    while (gui.__folders["Add Building"].__controllers.length > 0) {
        gui.__folders["Add Building"].__controllers[gui.__folders["Add Building"].__controllers.length - 1].remove();
    }

    var levels = sets[guiControls.set][0].level.length == 1 ? { 1: 0 } : { 1: 0, 2: 1 };
    gui.__folders["Add Building"].add(guiControls, 'addBuilding1').name("Add Building");;
    gui.__folders["Add Building"].add(guiControls, 'set', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7 }).name("Set").onChange(updateSetBuildings);
    gui.__folders["Add Building"].add(guiControls, 'building', setBuildings[guiControls.set]).listen().name("Building");
    gui.__folders["Add Building"].add(guiControls, 'level', levels).name("Level").listen().setValue(levels[Object.keys(levels).length]);;
    gui.__folders["Add Building"].add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age");;
}

// Update the gui display of building productions
function updateRewards(current, ob) {
    var folder = current ? "Current Building" : "Add Building";
    var len = gui.__folders[folder].__controllers.length;

    var stop = current ? 0 : 5;

    if (gui.__folders[folder].__controllers.length < stop) { return; }

    for (var x = 0; x < len; x++) {
        if (gui.__folders[folder].__controllers.length <= stop) { break; }
        gui.__folders[folder].__controllers[gui.__folders[folder].__controllers.length - 1].remove();
    }

    var set = current ? ob.set : guiControls.set;
    var building = current ? ob.building : guiControls.building;
    var level = current ? ob.level : guiControls.level;
    var age = current ? ob.age : guiControls.age;

    var rewardNum = sets[set][building].level[level].rewards.length;
    var bonusNum = sets[set][building].level[level].bonuses.length;

    if (current) {

        gui.__folders[folder].add(guiControls, 'removeBuilding').name("Remove Building");
        gui.__folders[folder].add(guiControls, 'curSet').listen().name("Set");
        gui.__folders[folder].add(guiControls, 'cBuilding', "").listen().name("Building");
        gui.__folders[folder].add(guiControls, 'cAge', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateCurrentBuilding);
        var cLevel = sets[set][building].level.length == 1 ? { 1: 0 } : { 1: 0, 2: 1 };
        gui.__folders[folder].add(guiControls, 'cLevel', cLevel).listen().name("Level").onChange(updateCurrentBuilding);
        if (sets[set][building].road) {
            gui.__folders[folder].add(guiControls, 'cConnected', ob.connected).listen().name("Road Connection").onChange(updateCurrentBuilding);
        }

    } else {
        var road = sets[set][building].road ? "Required" : "Not Required";
        gui.__folders[folder].add(guiControls, "road1").setValue(road).name("Road");
    }

    var codes = ["population", "happiness", "fps", "goods", "medals", "coins", "supplies", "attackingAttack", "attackingDefense", "defendingAttack", "defendingDefense", "coinsBoost", "supplyBoost"];
    var displayNames = ["Population", "Happiness", "FPs", "Goods", "Medals", "Coins", "Supplies", "Atk Atk (%)", "Atk Def (%)", "Def Atk (%)", "Def Def (%)", "Coin Boost (%)", "Supply Boost (%)"]
    for (var i = 0; i < rewardNum; i++) {
        //var displayBase = displayNames[codes.indexOf(sets[set][building].level[level].rewards[i].type)] + ": " + sets[set][building].level[level].rewards[i].values[age];
        var displayBase = sets[set][building].level[level].rewards[i].values[age] + " " + displayNames[codes.indexOf(sets[set][building].level[level].rewards[i].type)];
        gui.__folders[folder].add(guiControls, "base" + (i + 1)).setValue(displayBase).name("Base");
    }
    for (var j = 0; j < bonusNum; j++) {
        //var displayBonus = displayNames[codes.indexOf(sets[set][building].level[level].bonuses[j].type)] + ": " + sets[set][building].level[level].bonuses[j].values[age];
        var displayBonus = sets[set][building].level[level].bonuses[j].values[age] + " " + displayNames[codes.indexOf(sets[set][building].level[level].bonuses[j].type)];
        gui.__folders[folder].add(guiControls, "bonus" + (j + 1)).setValue(displayBonus).name("Set Bonus " + (j + 1));
    }

    if (current) {
        var neighbours = getNeighbours(objects.indexOf(ob), ob.name);
        var unique = [...new Set(neighbours)];
        gui.__folders[folder].add(guiControls, "cNeighbours").setValue(Math.min(unique.length, sets[set][building].level[level].bonuses.length)).name("Current Bonuses");
    }

    for (var d = 0; d < gui.__folders[folder].__controllers.length; d++) {
        gui.__folders[folder].__controllers[d].updateDisplay();
    }

}

// Update the visibility of the texts ... duh
function updateTextVisibilities() {
    for (var i = 0; i < texts.length; i++) {
        texts[i].visible = guiControls.texts;
    }
}

// Same^^
function updateLineVisibilities() {
    line.visible = !line.visible;
}

// not in use - probs won't use
function keyPressEvent(event) {
    console.log(event.key);
    if (event.key == "a") {
        //console.log(currentx + " " + currentz);
        if (spring[guiControls.building].size[0] % 2 == 1) {
            currentx += 0.5;
        }
        if (spring[guiControls.building].size[1] % 2 == 1) {
            currentz += 0.5;
        }

        addBuilding(0, guiControls.building, guiControls.level, guiControls.age, true, currentx, currentz);
    }
}

// not in use - WIP
function onMouseMove(event) {
    if (!buildingSelected || !isDown) { return; }
    selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);
    //selectionHelper.onSelectMove(event);
    if (isDown) {
        for (var i = 0; i < selectionBox.collection.length; i++) {
            if (selectionBox.collection[i].geometry.type != "TextGeometry" && selectionBox.collection[i].type != "LineSegments" && selectionBox.collection[i].type != "Line") {
                //if(!objects.indexOf(scene.getObjectByProperty('uuid',selectionBox.collection[i].uuid))){
                //console.log(selectionBox.collection[i]);
                selectionBox.collection[i].material.color.set(sets[selectionBox.collection[i].set][selectionBox.collection[i].building].color);
            }
        }

        var allSelected = selectionBox.select();
        for (var i = 0; i < allSelected.length; i++) {

            if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line") {
                //if(!objects.indexOf(scene.getObjectByProperty('uuid',allSelected[i].uuid))){
                allSelected[i].material.color.set(0xff33ff);
            }
        }

    }
}

// not in use - WIP
function onMouseUp(event) {
    //if (guiControls.curSet != null) { return }
    if (!buildingSelected || isDown) { return }
    selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);
    //selectionHelper.onSelectOver(event);
    //selectionBox.updateFrustum();

    //console.log("selected");

    var allSelected = selectionBox.select();
    for (var i = 0; i < allSelected.length; i++) {

        if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line") {
            //if(!objects.indexOf(scene.getObjectByProperty('uuid',allSelected[i].uuid))){
            allSelected[i].material.color.set(0xff33ff);
        }
    }

    isDown = false;

    //selectionBox = new SelectionBox(camera,scene);
    //selectionHelper = new SelectionHelper(selectionBox,renderer,'selectBox')


}

// The almighty on click event! 
function onDocumentClick(event) {
    // Get the intersection of the mouse and the scene
    var mouse = new THREE.Vector2(0, 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Get intersection with the helper grid
    var gridIntersect = raycaster.intersectObject(grid);
    // Get the clicked position in the scene
    currentx = Math.round(gridIntersect[0].point.x);
    currentz = Math.round(gridIntersect[0].point.z);

    // Check if the click intersects with one of the buildings
    var intersects = raycaster.intersectObjects(objects);

    // Reset all building highlighting
    for (var i = 0; i < objects.length; i++) {
        objects[i].material.emissiveIntensity = 0;
    }

    // Is a building intersected? 
    if (intersects[0] != null) {

        //Update gui to show currently selected building
        guiControls.uuid = intersects[0].object.uuid;
        intersects[0].object.material.emissiveIntensity = 2;
        guiControls.curSet = setNames[intersects[0].object.set];
        guiControls.cBuilding = intersects[0].object.name;
        guiControls.cLevel = intersects[0].object.level;
        guiControls.cAge = intersects[0].object.age;
        guiControls.cConnected = intersects[0].object.connected;
        if (intersects[0].object.road) {
            gui.__folders["Current Building"].name = intersects[0].object.name + " - Road Required";
        } else {
            gui.__folders["Current Building"].name = intersects[0].object.name + " - No Road Required";
        }

        // Update the production stats of the currently selected building
        updateRewards(true, intersects[0].object);

        // Blocks other stuff from running when a building is selected
        buildingSelected = true;

        // Open GUI folder
        //folder2.open();

    } else {
        // Reset gui when no building selected
        gui.__folders["Current Building"].name = "Current Building";

        //Close folder
        //folder2.close();

        while (gui.__folders["Current Building"].__controllers.length > 0) {
            gui.__folders["Current Building"].__controllers[gui.__folders["Current Building"].__controllers.length - 1].remove();
        }

        buildingSelected = false;
        guiControls.cBuilding = null;
        guiControls.cLevel = null;
        guiControls.cAge = null;
        guiControls.cConnected = null;
        guiControls.curSet = null;



        // TO be implemented
        /*
        isDown = true;

        selBox.geometry = new THREE.PlaneGeometry(Math.random()*20+1,Math.random()*20+1,1);

        selBox.position.set(currentx-selBox.geometry.parameters.width/2,1,currentz-selBox.geometry.parameters.height/2);

        selectionBox.startPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        selectionBox.endPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        //selectionHelper.onSelectStart(event);

        for (var i = 0; i < selectionBox.collection.length; i++) {
            if (selectionBox.collection[i].geometry.type != "TextGeometry" && selectionBox.collection[i].type != "LineSegments" && selectionBox.collection[i].type != "Line") {
                //if(!objects.indexOf(scene.getObjectByProperty('uuid',selectionBox.collection[i].uuid))){
                //console.log(selectionBox.collection[i]);
                selectionBox.collection[i].material.color.set(sets[selectionBox.collection[i].set][selectionBox.collection[i].building].color);
            }
        }
        */

    }

    // Update the production overview
    updateConnections();
}

// Drag control start! Store starting position
function dragStart(event) {
    dragging = true;
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);
}

// Function runs whenever a dragged building's position changes
function drag(event) {
    // Round the position of the object to always align with the grid
    if (event.object.geometry.parameters.depth % 2 == 1) {
        event.object.position.z = Math.round(event.object.position.z) - 0.5;
    }
    if (event.object.geometry.parameters.depth % 2 == 0) {
        event.object.position.z = Math.round(event.object.position.z);
    }
    if (event.object.geometry.parameters.width % 2 == 0) {
        event.object.position.x = Math.round(event.object.position.x);
    }
    if (event.object.geometry.parameters.width % 2 == 1) {
        event.object.position.x = Math.round(event.object.position.x) - 0.5;
    }

    // If the new position overlaps with an existing building, reset it to the previous location
    for (var i = 0; i < objects.length; i++) {
        if (!(event.object.uuid == objects[i].uuid)) {
            if (overlaps(objects[i], event.object)) {
                event.object.position.x = startPosition.x;
                event.object.position.z = startPosition.z;
                return;
            }
        }
    }


    // Move the text with the object, I feel like there should be a way to link it to the object, probably is, but this works fine :)
    texts[objects.indexOf(scene.getObjectByProperty('uuid', event.object.uuid))].position.set(event.object.position.x - event.object.textSize / 2, 2, event.object.position.z + event.object.textSize / 2);

    // Update start position
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);

}

// Recalculate production overview
function dragEnd(event) {
    draggin = false;
    updateConnections();
}

// Probably not the best name tbh, this calculates all the stats of the current setup
function updateConnections() {
    var population = 0;
    var happiness = 0;
    var fps = 0;
    var goods = 0;
    var medals = 0;
    var coins = 0;
    var supplies = 0;
    var attackingAttack = 0;
    var attackingDefense = 0;
    var defendingAttack = 0;
    var defendingDefense = 0;
    var coinsBoost = 0;
    var supplyBoost = 0;
    var names = ["population", "happiness", "fps", "goods", "medals", "coins", "supplies", "attackingAttack", "attackingDefense", "defendingAttack", "defendingDefense", "coinsBoost", "supplyBoost"];
    var stats = [population, happiness, fps, goods, medals, coins, supplies, attackingAttack, attackingDefense, defendingAttack, defendingDefense, coinsBoost, supplyBoost];
    var tiles = 0;

    var spopulation = 0;
    var shappiness = 0;
    var sfps = 0;
    var sgoods = 0;
    var smedals = 0;
    var scoins = 0;
    var ssupplies = 0;
    var sattackingAttack = 0;
    var sattackingDefense = 0;
    var sdefendingAttack = 0;
    var sdefendingDefense = 0;
    var scoinsBoost = 0;
    var ssupplyBoost = 0;
    var sstats = [spopulation, shappiness, sfps, sgoods, smedals, scoins, ssupplies, sattackingAttack, sattackingDefense, sdefendingAttack, sdefendingDefense, scoinsBoost, ssupplyBoost];
    var stiles = 0;

    var set = guiControls.cset;

    for (var i = 0; i < objects.length; i++) {
        tiles += objects[i].geometry.parameters.width * objects[i].geometry.parameters.depth;
        var objSet = objects[i].set;
        if (set == objSet) {
            stiles += objects[i].geometry.parameters.width * objects[i].geometry.parameters.depth;
        }
        if (objects[i].connected == true || objects[i].road == false) {
            var neighbours = getNeighbours(i, objects[i].name);
            var unique = [...new Set(neighbours)];



            var rewardNum = sets[objSet][objects[i].building].level[objects[i].level].rewards.length;
            for (var r = 0; r < rewardNum; r++) {
                for (var l = 0; l < stats.length; l++) {
                    if (sets[objSet][objects[i].building].level[objects[i].level].rewards[r].type == names[l]) {
                        stats[l] += sets[objSet][objects[i].building].level[objects[i].level].rewards[r].values[objects[i].age];
                        if (set == objSet) {
                            sstats[l] += sets[objSet][objects[i].building].level[objects[i].level].rewards[r].values[objects[i].age];
                        }
                        break;
                    }
                }

            }

            for (var j = 0; j < unique.length; j++) {
                if (sets[objSet][objects[i].building].level[objects[i].level].bonuses.length <= j) {
                    break;
                }
                for (var l = 0; l < stats.length; l++) {
                    if (sets[objSet][objects[i].building].level[objects[i].level].bonuses[j].type == names[l]) {
                        stats[l] += sets[objSet][objects[i].building].level[objects[i].level].bonuses[j].values[objects[i].age];
                        if (set == objSet) {
                            sstats[l] += sets[objSet][objects[i].building].level[objects[i].level].bonuses[j].values[objects[i].age];
                        }
                        break;
                    }
                }
            }
        }

        guiControls.population = stats[0];
        guiControls.happiness = stats[1];
        guiControls.fps = stats[2];
        guiControls.goods = stats[3];
        guiControls.medals = stats[4];
        guiControls.coins = stats[5];
        guiControls.supplies = stats[6];
        guiControls.attackingAttack = stats[7];
        guiControls.attackingDefense = stats[8];
        guiControls.defendingAttack = stats[9];
        guiControls.defendingDefense = stats[10];
        guiControls.coinsBoost = stats[11];
        guiControls.supplyBoost = stats[12];

        guiControls.tpopulation = (parseFloat(stats[0]) / parseFloat(tiles)).toFixed(2);
        guiControls.thappiness = (parseFloat(stats[1]) / parseFloat(tiles)).toFixed(2);
        guiControls.tfps = (parseFloat(stats[2]) / parseFloat(tiles)).toFixed(2);
        guiControls.tgoods = (parseFloat(stats[3]) / parseFloat(tiles)).toFixed(2);
        guiControls.tmedals = (parseFloat(stats[4]) / parseFloat(tiles)).toFixed(2);
        guiControls.tcoins = (parseFloat(stats[5]) / parseFloat(tiles)).toFixed(2);
        guiControls.tsupplies = (parseFloat(stats[6]) / parseFloat(tiles)).toFixed(2);
        guiControls.tattackingAttack = (parseFloat(stats[7]) / parseFloat(tiles)).toFixed(2);
        guiControls.tattackingDefense = (parseFloat(stats[8]) / parseFloat(tiles)).toFixed(2);
        guiControls.tdefendingAttack = (parseFloat(stats[9]) / parseFloat(tiles)).toFixed(2);
        guiControls.tdefendingDefense = (parseFloat(stats[10]) / parseFloat(tiles)).toFixed(2);
        guiControls.tcoinsBoost = (parseFloat(stats[11]) / parseFloat(tiles)).toFixed(2);
        guiControls.tsupplyBoost = (parseFloat(stats[12]) / parseFloat(tiles)).toFixed(2);

        guiControls.spopulation = sstats[0];
        guiControls.shappiness = sstats[1];
        guiControls.sfps = sstats[2];
        guiControls.sgoods = sstats[3];
        guiControls.smedals = sstats[4];
        guiControls.scoins = sstats[5];
        guiControls.ssupplies = sstats[6];
        guiControls.sattackingAttack = sstats[7];
        guiControls.sattackingDefense = sstats[8];
        guiControls.sdefendingAttack = sstats[9];
        guiControls.sdefendingDefense = sstats[10];
        guiControls.scoinsBoost = sstats[11];
        guiControls.ssupplyBoost = sstats[12];

        guiControls.stpopulation = (parseFloat(sstats[0]) / parseFloat(stiles)).toFixed(2);
        guiControls.sthappiness = (parseFloat(sstats[1]) / parseFloat(stiles)).toFixed(2);
        guiControls.stfps = (parseFloat(sstats[2]) / parseFloat(stiles)).toFixed(2);
        guiControls.stgoods = (parseFloat(sstats[3]) / parseFloat(stiles)).toFixed(2);
        guiControls.stmedals = (parseFloat(sstats[4]) / parseFloat(stiles)).toFixed(2);
        guiControls.stcoins = (parseFloat(sstats[5]) / parseFloat(stiles)).toFixed(2);
        guiControls.stsupplies = (parseFloat(sstats[6]) / parseFloat(stiles)).toFixed(2);
        guiControls.stattackingAttack = (parseFloat(sstats[7]) / parseFloat(stiles)).toFixed(2);
        guiControls.stattackingDefense = (parseFloat(sstats[8]) / parseFloat(stiles)).toFixed(2);
        guiControls.stdefendingAttack = (parseFloat(sstats[9]) / parseFloat(stiles)).toFixed(2);
        guiControls.stdefendingDefense = (parseFloat(sstats[10]) / parseFloat(stiles)).toFixed(2);
        guiControls.stcoinsBoost = (parseFloat(sstats[11]) / parseFloat(stiles)).toFixed(2);
        guiControls.stsupplyBoost = (parseFloat(sstats[12]) / parseFloat(stiles)).toFixed(2);
    }
}

// Gets all the neighbours of a building
function getNeighbours(j, name) {
    var neighbours = [];
    for (var i = 0; i < objects.length; i++) {
        if (!(i == j)) {
            if (isNeighbour(objects[j], objects[i]) && !(objects[i].name == name) && objects[j].set == objects[i].set) {
                neighbours.push(objects[i].name);
            }
        }
    }
    return neighbours;
}

// Checks if two buildings are neighbours
function isNeighbour(ob1, ob2) {

    var pos1 = new THREE.Vector3(0, 0, 0);
    var pos2 = new THREE.Vector3(0, 0, 0);
    ob1.getWorldPosition(pos1);
    ob2.getWorldPosition(pos2);
    var dist = pos1.distanceTo(pos2);

    var n1 = ob1.geometry.parameters.depth;
    var m1 = ob1.geometry.parameters.width;
    var n2 = ob2.geometry.parameters.depth;
    var m2 = ob2.geometry.parameters.width;

    return ((Math.abs(pos1.z - pos2.z) <= (n1 / 2 + n2 / 2)) && (Math.abs(pos1.x - pos2.x) <= (m1 / 2 + m2 / 2)) && (dist < Math.sqrt(Math.pow(n1 / 2 + n2 / 2, 2) + Math.pow(m1 / 2 + m2 / 2, 2))));
}

// Check if two buildings overlap
function overlaps(ob1, ob2) {
    var pos1 = new THREE.Vector3(0, 0, 0);
    var pos2 = new THREE.Vector3(0, 0, 0);

    ob1.getWorldPosition(pos1);
    ob2.getWorldPosition(pos2);

    var top1 = {
        x: pos1.x + (ob1.geometry.parameters.width / 2) - 0.5,
        z: pos1.z + (ob1.geometry.parameters.depth / 2) - 0.5
    };
    var bot1 = {
        x: pos1.x - (ob1.geometry.parameters.width / 2) + 0.5,
        z: pos1.z - (ob1.geometry.parameters.depth / 2) + 0.5
    };
    var top2 = {
        x: pos2.x + ob2.geometry.parameters.width / 2,
        z: pos2.z + ob2.geometry.parameters.depth / 2
    };
    var bot2 = {
        x: pos2.x - ob2.geometry.parameters.width / 2,
        z: pos2.z - ob2.geometry.parameters.depth / 2
    };


    if (top1.x < bot2.x || top2.x < bot1.x) {
        return false;
    }
    if (top1.z < bot2.z || top2.z < bot1.z) {
        return false;
    }

    return true;
}

// Update the current building when the user changes it in the controls
function updateCurrentBuilding() {
    if (buildingSelected && guiControls.cLevel != null && guiControls.cAge != null && guiControls.cConnected != null) {
        var id = objects.indexOf(scene.getObjectByProperty('uuid', guiControls.uuid));
        objects[id].level = guiControls.cLevel;
        objects[id].age = guiControls.cAge;
        objects[id].connected = guiControls.cConnected;
        updateRewards(true, objects[id]);
        updateConnections();
    }
}

// Everything to do with the controls
function addGuiControls() {

    this.showHelp = function(){
        console.log("help");
        helpElement.style.display = "block";
    }

    this.set = 0;
    this.building = 0;
    this.level = 1;
    this.age = 17;
    this.addBuilding1 = function () {
        var newBuilding = sets[this.set][this.building];
        var n = newBuilding.size[0];
        var m = newBuilding.size[1];
        var x = -topx + n;
        var z = topz + m;
        addBuilding(this.set, this.building, this.level, this.age, true, x, z);
    }

    this.road1 = "Not Required";
    this.base1 = "6140 Happiness";
    this.base2 = "";
    this.bonus1 = "7370 Happiness";
    this.bonus2 = "4 Atk Atk (%)";
    this.bonus3 = "6 Atk Atk (%)";
    this.bonus4 = "";


    this.curSet = "";
    this.cBuilding = "";
    this.cLevel = null;
    this.cAge = null;
    this.cConnected = false;
    this.cNeighbours = 0;
    this.uuid = null;

    this.updateBuilding = function () {
        if (this.uuid != null) {
            var id = objects.indexOf(scene.getObjectByProperty('uuid', this.uuid));

            objects[id].level = this.cLevel;
            objects[id].age = this.cAge;
            objects[id].connected = this.cConnected;
            updateConnections();
        }
    }

    this.removeBuilding = function () {
        if (!buildingSelected) {
            return;
        }
        var ob = scene.getObjectByProperty('uuid', this.uuid);
        var text = texts[objects.indexOf(ob)];
        scene.remove(text);
        scene.remove(ob);
        objects.splice(objects.indexOf(ob), 1);
        texts.splice(texts.indexOf(text), 1);
        buildingSelected = false;
        this.cBuilding = "";
        this.cLevel = null;
        this.cAge = null;
        this.cConnected = null;
        updateConnections();

        while (gui.__folders["Current Building"].__controllers.length > 0) {
            gui.__folders["Current Building"].__controllers[gui.__folders["Current Building"].__controllers.length - 1].remove();
        }
        return;
    }

    this.population = 0;
    this.happiness = 0;
    this.fps = 0;
    this.goods = 0;
    this.medals = 0;
    this.coins = 0;
    this.supplies = 0;
    this.attackingAttack = 0;
    this.attackingDefense = 0;
    this.defendingAttack = 0;
    this.defendingDefense = 0;
    this.coinsBoost = 0;
    this.supplyBoost = 0;

    this.tpopulation = "0";
    this.thappiness = "0";
    this.tfps = "0";
    this.tgoods = "0";
    this.tmedals = "0";
    this.tcoins = "0";
    this.tsupplies = "0";
    this.tattackingAttack = "0";
    this.tattackingDefense = "0";
    this.tdefendingAttack = "0";
    this.tdefendingDefense = "0";
    this.tcoinsBoost = "0";
    this.tsupplyBoost = "0";

    this.cset = 0;

    this.spopulation = 0;
    this.shappiness = 0;
    this.sfps = 0;
    this.sgoods = 0;
    this.smedals = 0;
    this.scoins = 0;
    this.ssupplies = 0;
    this.sattackingAttack = 0;
    this.sattackingDefense = 0;
    this.sdefendingAttack = 0;
    this.sdefendingDefense = 0;
    this.scoinsBoost = 0;
    this.ssupplyBoost = 0;

    this.stpopulation = "0";
    this.sthappiness = "0";
    this.stfps = "0";
    this.stgoods = "0";
    this.stmedals = "0";
    this.stcoins = "0";
    this.stsupplies = "0";
    this.stattackingAttack = "0";
    this.stattackingDefense = "0";
    this.stdefendingAttack = "0";
    this.stdefendingDefense = "0";
    this.stcoinsBoost = "0";
    this.stsupplyBoost = "0";

    this.save = function () {
        if (objects.length == 0) {
            this.saveString = "No Buildings";
        } else {
            this.saveString = saveScene();
        }
    }
    this.saveString = "";
    this.load = function () {
        loadScene(this.loadString);
    }
    this.loadString = "";

    this.texts = true;
    this.line = true;
    this.highlightRoads = false;
}

// Save the current scene to a string. Tried making it as small as possible, but I would love to have some sort of online storing in the future. 
// I have no idea how that works though, so yeah ... this works for now :(
function saveScene() {
    var string = "";
    /* Old version
    for (var i = 0; i < objects.length; i++) {
        var ob = objects[i];
        string += i == 0 ? "" : "x";
        string += ob.set < 10 ? "0" + ob.set : ob.set;
        string += ob.building < 10 ? "0" + ob.building : ob.building;
        string += ob.level < 10 ? "0" + ob.level : ob.level;
        string += ob.age < 10 ? "0" + ob.age : ob.age;
        string += ob.connected ? "1" : "0";
        string += "I" + ob.position.x.toString() + "I" + ob.position.z.toString();
    }*/
    for (var i = 0; i < objects.length; i++) {
        var ob = objects[i];
        var base = 32;
        string += i == 0 ? "" : "z";
        string += ob.set.toString(base);
        string += ob.building.toString(base);
        string += ob.level.toString(base);
        string += ob.age.toString(base);
        string += ob.connected ? "1" : "0";
        string += "u" + ob.position.x.toString(base).replace("-", "y").replace(".", "w") + "u" + ob.position.z.toString(base).replace("-", "y").replace(".", "w");
    }
    //console.log(string);
    return string;
}

// Clear scene, parse the save string and add buildings
function loadScene(string) {
    clearScene();
    if (string.length < 5) {
        updateConnections();
        return;
    }
    // For old version
    if (string.includes("x")) {
        var buildings = string.split("x");
        for (var i = 0; i < buildings.length; i++) {
            var bld = buildings[i].split("I");
            var set = parseInt(bld[0].substring(0, 2));
            var building = parseInt(bld[0].substring(2, 4));
            var level = parseInt(bld[0].substring(4, 6));
            var age = parseInt(bld[0].substring(6, 8));
            var connected = bld[0].substring(8, 9) == "1" ? true : false;
            var x = parseFloat(bld[1]);
            var z = parseFloat(bld[2]);
            addBuilding(set, building, level, age, connected, x, z);
        }
    } else {
        var buildings = string.split("z");
        for (var i = 0; i < buildings.length; i++) {
            var bld = buildings[i].split("u");
            var base = 32;
            var set = toDec(bld[0].substring(0, 1), base);
            var building = toDec(bld[0].substring(1, 2), base);
            var level = toDec(bld[0].substring(2, 3), base);
            var age = toDec(bld[0].substring(3, 4), base);
            var connected = bld[0].substring(4, 5) == "1" ? true : false;
            var x = toDec(bld[1], base);
            var z = toDec(bld[2], base);
            addBuilding(set, building, level, age, connected, x, z);
        }
    }


    dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', dragStart);
    dragControls.addEventListener('dragend', dragEnd);
    dragControls.addEventListener('drag', drag);

    //updateConnections(); 
}

// Convert from given base to decimal
function toDec(numString, base) {
    var parts = numString.replace("y", "-").replace("w", ".").split(".");
    if (parts.length > 1) {
        var sign = Math.sign(parseInt(parts[0], base));
        if (Object.is(sign, -0)) { sign = -1; } //Sign of "-0" is "-0" 
        if (Object.is(sign, 0)) { sign = 1; } //Sign of "0" is "0"               <-- don't ask me why
        return parseInt(parts[0], base) + sign * parseInt(parts[1], base) / Math.pow(base, parts[1].length);
    }
    return parseInt(parts[0], base);
}


// Add a new building!
function addBuilding(set, building, level, age, connected, x, z) {
    // Add building
    var newBuilding = sets[set][building];
    var n = newBuilding.size[0];
    var m = newBuilding.size[1];
    var geometry = new THREE.BoxGeometry(n, 1, m);
    var img = "/assets/" + n + "x" + m + ".png";
    var tx = new THREE.TextureLoader().load(img);
    tx.minFilter = THREE.LinearFilter;
    var material = new THREE.MeshPhongMaterial({ color: newBuilding.color, map: tx });
    material.emissive.setHex(0x111111);
    material.emissiveIntensity = 0;
    var bld = new THREE.Mesh(geometry, material);
    bld.position.set(x, 1, z);
    bld.set = set;
    bld.building = building;
    bld.level = level;
    bld.age = age;
    bld.name = newBuilding.name;
    bld.connected = connected;
    bld.road = newBuilding.road;


    // Add text
    var loader = new THREE.FontLoader();
    loader.load('assets/Arial_Regular.json', function (font) {
        var offset = 0.5;
        var size = n > m ? m - m * offset : n - n * offset;
        var textGeometry = new THREE.TextGeometry(newBuilding.text, {
            font: font, size: size, height: 5, curveSegments: 12, bevelThickness: 1, bevelSize: 1, bevelEnabled: false
        });

        var textMaterial = new THREE.MeshPhongMaterial(
            { color: 0x111111 }
        );

        textGeometry.rotateX(-1.57);
        var mesh = new THREE.Mesh(textGeometry, textMaterial);
        mesh.position.set(x - size / 2, 2, z + size / 2);
        mesh.visible = guiControls.texts;
        bld.textSize = size;
        scene.add(bld);
        objects.push(bld);
        scene.add(mesh);
        texts.push(mesh);

    });

    scene.updateMatrixWorld();
}

// Remove everything
function clearScene() {
    for (var i = 0; i < objects.length; i++) {
        scene.remove(objects[i]);
    }
    objects = [];
    for (var i = 0; i < texts.length; i++) {
        scene.remove(texts[i]);
    }
    texts = [];
}

// Let there be life!
function animate() {
    requestAnimationFrame(animate);
    updateTopLeft();
    if (guiControls.cset != prevSet) {
        updateConnections();
        prevSet = guiControls.cset;
    }

    if (pset != guiControls.set || pbuilding != guiControls.building || plevel != guiControls.level || page != guiControls.age) {
        updateRewards(false, null);
        pset = guiControls.set;
        pbuilding = guiControls.building;
        plevel = guiControls.level;
        page = guiControls.age;
    }

    renderer.render(scene, camera)
    if (!initDone) {
        updateConnections();
    }


}

// Get the current top-left position based on window size, used for adding new buildings
function updateTopLeft() {
    var mouse = new THREE.Vector2(1, 1);
    raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(grid);

    topx = intersects[0].point.x;
    topz = intersects[0].point.z;
}

init();

// Easier testing
//loadScene("020001171I4I-2.5x020101170I1.5I0.5x020201171I5I0.5x020301171I1.5I-1.5x020401171I1.5I-3x020001171I4I3.5x020001171I-1I-2.5x020001171I-1I3.5x020201171I-2I0.5x020301171I1.5I2.5x020401171I1.5I4x020301171I3.5I-0.5x020301171I3.5I1.5x020301171I-0.5I-0.5x020301171I-0.5I1.5x020301171I3.5I0.5x020301171I-0.5I0.5");

animate();