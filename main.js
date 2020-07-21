// As you can see this is just me fooling around testing a bunch of stuff, this is a hobby project, proper coding styles be damned :P
let renderer, scene, camera, objects = [], texts = [], startPosition, groupStart, dragMesh, guiControls, grid, raycaster, gui, selectionBox, selectionHelper;
let texture = new THREE.TextureLoader().load(document.location.pathname + 'assets/texture.png');
let topx = 0;
let topz = 0;
let currentx = 0;
let currentz = 0;
let controls;
let select = false;
let buildingsSelected = false;
let keyPressed = false;

let initDone = false;
let doUpdateRewards = true;
let line;
let frustumSize = 48;
let dragging = false;
let isDown = false;
let moveCam = false;

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
let harvestBarn = getHarvestBarn();

// Array used for easy access of information, DO NOT change order, it'll break everything. Probs a better way to do this, but meh :)
let sets = [cherry, piazza, celtic, indianPalace, indianFountain, classicalGarden, royalGarden, winterVillage, harvestBarn];

// Display information for the dat.gui controls. Again do not change order...
let setBuildings = [{ SakuraRock: 0, EmperorsEntrance: 1, ZenZone: 2, NishikigoiPond: 3, GongOfWisdom: 4 },
{ Homes: 0, Cafe: 1, ClockTower: 2, Fountain: 3, MaskVendor: 4 },
{ MoonGate: 0, FaeryRings: 1, DruidWillow: 2, MajesticFawn: 3, StandingStone: 4 },
{ Palace: 0, WesternTower: 1, EasternTower: 2, BandarPlayground: 3, JunglePond: 4 },
{ ElephantFountain: 0, FountainGate: 1, ChhatriGarden: 2, TitanArum: 3, MemorialChhatri: 4 },
{ GardenPool: 0, GardenPatio: 1, GardenStatues: 2 },
{ KingStatue: 0, QueenStatue: 1, GardenRuins: 2 },
{ Toymaker: 0, MooseMeadow: 1, SugerBaker: 2, Smörgåsbord: 3, Candlemaker: 4, Tinkerer: 5, Halmbock: 6, StrawStar: 7, MadameFortuna: 8 },
{ Barn: 0, Sunflower: 1, Wheat: 2, Begonia: 3, Autumn: 4, Ochre: 5, Primrose: 6}];
let setNames = ["Cherry Garden", "Piazza", "Celtic Forest", "Indian Palace", "Indian Fountain", "Classical Garden", "Royal Garden", "Winter Village", "Harvest Barn"];


let selBox;

let helpElement = document.getElementById("info");
helpElement.style.display = "none";
let closeHelp = document.getElementsByClassName("close")[0];

let importElement = document.getElementById("import");
importElement.style.display = "none";
let importHelp = document.getElementsByClassName("close")[1];

closeHelp.onclick = function () {
    helpElement.style.display = "none";
}
importHelp.onclick = function() {
    importElement.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == helpElement) {
        helpElement.style.display = "none";
    }
    if(event.target == importElement){
        importElement.style.display = "none";
    }
}

function onWindowResize() {

    var aspect = window.innerWidth / window.innerHeight;

    camera.left = frustumSize * aspect / - 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = - frustumSize / 2;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    requestAnimationFrame(animate);
}

function init() {
    // Basic threejs stuff
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 100);

    camera.position.set(0, 20, 0);
    scene.add(camera);

    window.addEventListener('resize', onWindowResize, false);

    // On click for main canvas
    document.querySelector("#canvas").addEventListener('mousedown', onDocumentClick, false);

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('keydown', keyPressEvent, true);


    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, document.querySelector("#canvas"));
    controls.enableRotate = false;
    controls.mouseButtons = { ORBIT: THREE.MOUSE.RIGHT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.LEFT };
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
    points.push(new THREE.Vector3(4, 0, -36));
    points.push(new THREE.Vector3(4, 0, -28));
    points.push(new THREE.Vector3(24, 0, -28));
    points.push(new THREE.Vector3(24, 0, -20));
    points.push(new THREE.Vector3(28, 0, -20));
    points.push(new THREE.Vector3(28, 0, -4));
    points.push(new THREE.Vector3(32, 0, -4));
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
    points.push(new THREE.Vector3(-32, 0, -20));
    points.push(new THREE.Vector3(-24, 0, -20));
    points.push(new THREE.Vector3(-24, 0, -36));
    points.push(new THREE.Vector3(4, 0, -36));
    var lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    var boxGeo = new THREE.BoxGeometry(1, 1, 1);
    var boxMat = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    selBox = new THREE.Mesh(boxGeo, boxMat);
    selBox.position.set(-100, 3, -100);
    selBox.visible = false;
    scene.add(selBox);


    addControls();

    selectionBox = new SelectionBox(camera, scene);
    selectionHelper = new SelectionHelper(selectionBox, renderer, 'selectBox');



    initDone = true; // Not really used, but why not leave it in??
}

function addControls() {

    // Controls! What do you mean the naming scheme makes no sense? 
    guiControls = new addGuiControls();
    gui = new dat.GUI({ width: 250 });
    gui.domElement.id = "gui";
    // Add Building
    gui.add(guiControls, 'showHelp').name("How To Use")
    var folder1 = gui.addFolder('Add Building');
    folder1.add(guiControls, 'addBuilding1').name("✔️ Add");;
    folder1.add(guiControls, 'set', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7, HarvestBarn: 8}).name("Set").onChange(updateSetBuildings);
    folder1.add(guiControls, 'building', setBuildings[guiControls.set]).name("Building").listen().onChange(updateAddStats);
    folder1.add(guiControls, 'level', { 1: 0, 2: 1 }).name("Level").listen().onChange(updateAddStats);;
    folder1.add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);
    folder1.add(guiControls, 'bsize').name("Size");
    folder1.add(guiControls, 'road1').name("Road");
    folder1.add(guiControls, 'base1').name("Base");
    folder1.add(guiControls, 'bonus1').name("Set Bonus 1");
    folder1.add(guiControls, 'bonus2').name("Set Bonus 2");
    folder1.add(guiControls, 'bonus3').name("Set Bonus 3");
    folder1.open();

    // Current Building
    folder2 = gui.addFolder("Current Building");
    folder2.open();
    /*
    folder2.add(guiControls, 'removeBuilding').name("❌ Remove Building");
    folder2.add(guiControls, 'curSet').listen().name("Set");
    folder2.add(guiControls, 'cBuilding', "").listen().name("Building");
    folder2.add(guiControls, 'cAge', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateCurrentBuilding);
    folder2.add(guiControls, 'cLevel', { 1: 0, 2: 1 }).listen().name("Level").onChange(updateCurrentBuilding);
    folder2.add(guiControls, 'cConnected').listen().name("Building Connected To Road: ").onChange(updateCurrentBuilding);
    */

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
    folder8.add(guiControls, 'tempty').name("Empty Tiles:").onChange(updateConnections);
    folder8.add(guiControls, 'troads').name("Road Tiles:").onChange(updateConnections);
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
    folder322.add(guiControls, 'cset', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7 }).listen().name("Set").onChange(updateConnections);
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
    folder38.add(guiControls, 'stempty').name("Empty Tiles:").onChange(updateConnections);
    folder38.add(guiControls, 'stroads').name("Road Tiles:").onChange(updateConnections);
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
    var folder7 = gui.addFolder("Save Build");
    folder7.add(guiControls, 'save').name("Save Build");
    folder7.add(guiControls, 'saveString').listen().name("String:");
    folder7.add(guiControls, 'shareString').listen().name("Full Link:")
    folder7.add(guiControls, 'bitlyString').listen().name("Bitly Link:")
    var folder77 = gui.addFolder("Load / Import Build");
    folder77.add(guiControls, 'loadString').listen().name("String:");
    folder77.add(guiControls, 'load').name("Load Build");
    //folder77.add(guiControls, 'import').name("Import Build")
    folder77.add(guiControls, 'importHelp').name("How To Import");
    folder7.open();

    // Toggles
    var folder41 = gui.addFolder("Settings / Toggles");
    folder41.add(guiControls, 'texts').name("Show Building Initials").onChange(updateTextVisibilities);
    folder41.add(guiControls, 'line').name("Show City Outline").onChange(updateLineVisibilities);
    folder41.add(guiControls, 'highlightRoads').name("Show Buildings Requiring Roads").listen().onChange(updateRoadHighlight);
    folder41.add(guiControls, 'numConnectionsHighlight').listen().name("Show # Connections").onChange(updateNumConnectionHighlight);
    folder41.open();
}

function updateAddStats() {
    //console.log("update");
    updateRewards(false, null);
}

// Update the highlighting of buildings requiring roads
function updateRoadHighlight() {
    var highlight = guiControls.highlightRoads;
    if (highlight) { guiControls.numConnectionsHighlight = false }
    for (var i = 0; i < objects.length; i++) {
        var color = highlight ? (sets[objects[i].set][objects[i].building].road ? 0xffff33 : 0xcccccc) : sets[objects[i].set][objects[i].building].color;
        objects[i].material.color = new THREE.Color(color);
    }
}

function updateNumConnectionHighlight() {
    //console.log("num");
    if (guiControls.numConnectionsHighlight) {
        guiControls.highlightRoads = false;
        for (var i = 0; i < objects.length; i++) {
            var neighbours = getNeighbours(i, objects[i].name);
            var unique = [...new Set(neighbours)];
            var full = sets[objects[i].set][objects[i].building].level[objects[i].level].bonuses.length;
            var connections = Math.min(unique.length, full);
            var diff = full - connections;
            var color = 0x000000;
            switch (diff) {
                case 0: color = 0x00ff00;
                    break;
                case 1: color = 0xfeff51;
                    break;
                case 2: color = 0xff9e16;
                    break;
                case 3: color = 0xff5050;
                    break;
                case 4: color = 0xcc0000;
                    break;
            }
            objects[i].material.color = new THREE.Color(color);
        }
    } else {
        for (var i = 0; i < objects.length; i++) {
            var color = sets[objects[i].set][objects[i].building].color;
            objects[i].material.color = new THREE.Color(color);
        }
    }
}

// Update the "Add Building" controls based on which set is selected
function updateSetBuildings() {

    while (gui.__folders["Add Building"].__controllers.length > 0) {
        gui.__folders["Add Building"].__controllers[gui.__folders["Add Building"].__controllers.length - 1].remove();
    }

    var levels = sets[guiControls.set][guiControls.building].level.length == 1 ? { 1: 0 } : sets[guiControls.set][guiControls.building].level.length == 4 ?  {1: 0, 2: 1, 3: 2, 4: 3} : { 1: 0, 2: 1 };
    gui.__folders["Add Building"].add(guiControls, 'addBuilding1').name("✔️ Add");;
    gui.__folders["Add Building"].add(guiControls, 'set', { CherryGarden: 0, Piazza: 1, CelticForest: 2, IndianPalace: 3, IndianFountain: 4, ClassicalGarden: 5, RoyalGarden: 6, WinterVillage: 7, HarvestBarn: 8}).name("Set").onChange(updateSetBuildings);
    gui.__folders["Add Building"].add(guiControls, 'building', setBuildings[guiControls.set]).listen().name("Building").setValue(0).onChange(updateAddStats);
    gui.__folders["Add Building"].add(guiControls, 'level', levels).name("Level").listen().setValue(levels[Object.keys(levels).length]).onChange(updateAddStats);
    gui.__folders["Add Building"].add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);

    //if(fromRewards){break;}
    updateRewards(false, null);
}

// Update the gui display of building productions
function updateRewards(current, ob) {
    //if(!current){updateSetBuildings();}
    var folder = current ? "Current Building" : "Add Building";
    var len = gui.__folders[folder].__controllers.length;

    var stop = current ? 0 : 3;

    if (gui.__folders[folder].__controllers.length < stop) { return; }

    var set = current ? ob.set : guiControls.set;
    var building = current ? ob.building : guiControls.building;
    var age = current ? ob.age : guiControls.age;

    for (var x = 0; x < len; x++) {
        if (gui.__folders[folder].__controllers.length <= stop) { break; }
        gui.__folders[folder].__controllers[gui.__folders[folder].__controllers.length - 1].remove();
    }

    if(!current){
        var levels = sets[set][building].level.length == 1 ? { 1: 0 } : sets[set][building].level.length == 4 ?  {1: 0, 2: 1, 3: 2, 4: 3} : { 1: 0, 2: 1 };
        gui.__folders[folder].add(guiControls, 'level', levels).name("Level").listen().setValue(levels[Object.keys(levels).length]).onChange(updateAddStats);
        gui.__folders[folder].add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);
    }

    
    var level = current ? ob.level : guiControls.level;
    

    var rewardNum = sets[set][building].level[level].rewards.length;
    var bonusNum = sets[set][building].level[level].bonuses.length;


    if (current) {

        gui.__folders[folder].add(guiControls, 'removeBuilding').name("❌ Remove Building");
        gui.__folders[folder].add(guiControls, 'curSet').listen().name("Set");
        gui.__folders[folder].add(guiControls, 'cBuilding', "").listen().name("Building");
        gui.__folders[folder].add(guiControls, 'cAge', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateCurrentBuilding);
        var cLevel = sets[set][building].level.length == 1 ? { 1: 0 } : sets[set][building].level.length == 4 ? {1: 0, 2: 1, 3: 2, 4: 3} : { 1: 0, 2: 1 };
        gui.__folders[folder].add(guiControls, 'cLevel', cLevel).listen().name("Level").onChange(updateCurrentBuilding);
        if (sets[set][building].road) {
            //var curVal = ob.connected ? 1 : 0;
            var op = { Diconnected: false, Connected: true };
            gui.__folders[folder].add(guiControls, 'cConnected', op).listen().setValue(ob.connected).name("Building Connected").onChange(updateCurrentBuilding);
            gui.__folders[folder].__controllers[5].__li.className = "cr number";
        }

    } else {
        
        var bsize = sets[set][building].size[0] + " x " + sets[set][building].size[1];
        gui.__folders[folder].add(guiControls, "bsize").setValue(bsize).name("Size")
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
    line.visible = guiControls.line;
}



function keyPressEvent(event) {
    console.log("hey");
    // Prevent backspace from going to previous page
    if (event.which === 8 && !$(event.target).is("input, textarea")) {
        event.preventDefault();
    }

    if ((event.key == "Backspace" || event.key == "Delete") && !$(event.target).is("input, textarea")) {

        if (buildingsSelected) {
            var len = objects.length;
            var ids = [];
            for (var i = 0; i < len; i++) {
                if (objects[i].selected) {
                    ids.push(objects[i].uuid);
                }
            }
            for (var j = 0; j < ids.length; j++) {
                guiControls.uuid = ids[j];
                removeBuilding1();
            }
            buildingsSelected = false;
        } else {
            removeBuilding1();
        }
    }
}

function onMouseMove(event) {


    if (keyPressed) { requestAnimationFrame(animate); }
    if (!select) { return; }

    var mouse = new THREE.Vector2(0, 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    selectionBox.endPoint.set(
        mouse.x,
        mouse.y,
        0.5);


    raycaster.setFromCamera(mouse, camera);

    // Get intersection with the helper grid
    var gridIntersect = raycaster.intersectObject(grid);
    // Get the clicked position in the scene

    var n = (currentx - (gridIntersect[0].point.x));
    var m = (currentz - (gridIntersect[0].point.z));


    selBox.visible = true;
    selBox.geometry = new THREE.BoxGeometry(n, 1, m);
    selBox.position.set(currentx - n / 2, 2, currentz - m / 2);
}

function onMouseUp(event) {
    requestAnimationFrame(animate);
    keyPressed = false;
    moveCam = false;
    if (!select) { return }
    selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);

    selBox.visible = false;

    var allSelected = selectionBox.select();
    for (var i = 0; i < allSelected.length; i++) {

        if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line" && allSelected[i].uuid != selBox.uuid) {
            //console.log(allSelected[i].uuid);
            allSelected[i].material.color.set(0xff33ff);
            allSelected[i].selected = true;
            buildingsSelected = true;

        }
    }

    selBox.material.color.set(0x0000ff);

    isDown = false;
    select = false;


}

// The almighty on click event! 
function onDocumentClick(event) {

    // clear inputs when main body clicked
    var inputs = document.getElementsByTagName("INPUT");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].blur();
    }

    keyPressed = true;
    // Get the intersection of the mouse and the scene
    var mouse = new THREE.Vector2(0, 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // Get intersection with the helper grid
    var gridIntersect = raycaster.intersectObject(grid);
    // Get the clicked position in the scene
    currentx = (gridIntersect[0].point.x);
    currentz = (gridIntersect[0].point.z);

    if (event.button === 2) {
        if (buildingsSelected) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].material.color.set(sets[objects[i].set][objects[i].building].color);
                objects[i].selected = false;
                //console.log("r");
            }
            buildingsSelected = false;
        }
        selectionBox.startPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        selectionBox.endPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        select = true;
        return;
    }

    // Check if the click intersects with one of the buildings
    var intersects = raycaster.intersectObjects(objects);

    // Reset all building highlighting
    for (var i = 0; i < objects.length; i++) {
        objects[i].material.emissiveIntensity = 0;
    }

    // Is a building intersected? 
    if (intersects[0] != null) {
        controls.enablePan = false;
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

        buildingSelected = true;

    } else {
        if (buildingsSelected) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].material.color.set(sets[objects[i].set][objects[i].building].color);
                objects[i].selected = false;
                //console.log("r");
            }
            buildingsSelected = false;
        }
        controls.enablePan = true;
        // Reset gui when no building selected
        gui.__folders["Current Building"].name = "Current Building";

        while (gui.__folders["Current Building"].__controllers.length > 0) {
            gui.__folders["Current Building"].__controllers[gui.__folders["Current Building"].__controllers.length - 1].remove();
        }

        buildingSelected = false;
        guiControls.cBuilding = null;
        guiControls.cLevel = null;
        guiControls.cAge = null;
        guiControls.cConnected = null;
        guiControls.curSet = null;
    }

    // Update the production overview
    updateConnections();
}

// Drag control start! Store starting position
function dragStart(event) {

    requestAnimationFrame(animate);
    dragging = true;
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);
    groupStart = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);

    if (buildingsSelected) {
        var mergeGeometry = new THREE.Geometry();
        var mats = [];

        var material = new THREE.MeshPhongMaterial({ color: 0x666666, transparent: true, opacity: 0.5 });
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].selected && objects[i].uuid != event.object.uuid) {
                mergeGeometry.merge(objects[i].geometry, objects[i].matrix);
                mats.push(material);
                objects[i].visible = false;
                texts[i].visible = false;
                //console.log("start: " + objects[i].uuid);
            }
        }
        while (mats.length < 3) {
            mergeGeometry.merge(event.object.geometry, event.object.matrix);
            mats.push(material);
        }
        dragMesh = new THREE.Mesh(mergeGeometry, mats)
        scene.add(dragMesh);
        dragMesh.visible = true;
    }
}

// Function runs whenever a dragged building's position changes
function drag(event) {

    requestAnimationFrame(animate);
    //console.log(dragMesh);
    // Round the position of the object to always align with the grid
    if (event.object.geometry.parameters.depth % 2 == 1) {
        event.object.position.z = Math.round(event.object.position.z) - 0.5;
    } else {
        event.object.position.z = Math.round(event.object.position.z);
    }
    if (event.object.geometry.parameters.width % 2 == 0) {
        event.object.position.x = Math.round(event.object.position.x);
    } else {
        event.object.position.x = Math.round(event.object.position.x) - 0.5;
    }

    // If the new position overlaps with an existing building, reset it to the previous location
    for (var i = 0; i < objects.length; i++) {
        if (!(event.object.uuid == objects[i].uuid) && !objects[i].selected) {
            if (overlaps(objects[i], event.object)) {
                event.object.position.x = startPosition.x;
                event.object.position.z = startPosition.z;
                return;
            }
        }
    }


    if (buildingsSelected) {
        var diffx = event.object.position.x - startPosition.x;
        var diffz = event.object.position.z - startPosition.z;

        dragMesh.position.set(dragMesh.position.x + diffx, dragMesh.position.y, dragMesh.position.z + diffz);
        //requestAnimationFrame(animate);

    }



    // Move the text with the object, I feel like there should be a way to link it to the object, probably is, but this works fine :)
    texts[objects.indexOf(scene.getObjectByProperty('uuid', event.object.uuid))].position.set(event.object.position.x - event.object.textSize / 2, 2, event.object.position.z + event.object.textSize / 2);

    // Update start position
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);

}

// Recalculate production overview
function dragEnd(event) {

    requestAnimationFrame(animate);
    draggin = false;
    if (buildingsSelected) {
        var diffx = event.object.position.x - groupStart.x;
        var diffz = event.object.position.z - groupStart.z;

        for (var i = 0; i < objects.length; i++) {
            if (objects[i].selected && objects[i].uuid != event.object.uuid) {
                objects[i].position.set(objects[i].position.x + diffx, objects[i].position.y, objects[i].position.z + diffz);
                texts[i].position.set(texts[i].position.x + diffx, texts[i].position.y, texts[i].position.z + diffz);
                objects[i].visible = true;
                texts[i].visible = true;
            }

            requestAnimationFrame(animate);
        }
        dragMesh.visible = false;
        scene.remove(dragMesh);
    }
    updateConnections();
    if (guiControls.numConnectionsHighlight) { updateNumConnectionHighlight() }
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
    var tiles = guiControls.tempty + guiControls.troads;

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
    var stiles = guiControls.stempty + guiControls.stroads;

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


    requestAnimationFrame(animate);
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

    this.showHelp = function () {
        //console.log("help");
        helpElement.style.display = "block";
    }

    this.set = 0;
    this.building = 0;
    this.level = 1;
    this.age = 17;
    this.addBuilding1 = function () {
        requestAnimationFrame(animate);
        var newBuilding = sets[this.set][this.building];
        var n = newBuilding.size[0];
        var m = newBuilding.size[1];

        var top = new THREE.Vector3();
        top.set(-1, 1, -1).unproject(camera);
        var x = top.x + n;
        var z = top.z + m;
        addBuilding(this.set, this.building, this.level, this.age, true, x, z);
        requestAnimationFrame(animate);
    }

    this.bsize = "2 x 3";
    this.road1 = "Not Required";
    this.base1 = "6140 Happiness";
    this.base2 = "";
    this.base3 = "";
    this.bonus1 = "7370 Happiness";
    this.bonus2 = "4 Atk Atk (%)";
    this.bonus3 = "6 Atk Atk (%)";
    this.bonus4 = "";
    this.bonus5 = "";
    this.bonus6 = "";


    this.curSet = "";
    this.cBuilding = "";
    this.cLevel = null;
    this.cAge = null;
    this.cConnected = null;
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
        removeBuilding1();
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

    this.tempty = 0;
    this.troads = 0;
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

    this.stempty = 0;
    this.stroads = 0;
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
            this.shareString = "No Buildings";
            this.bitlyString = "No Buildings";
        } else {
            var string = saveScene();
            this.saveString = string;
            this.shareString = "https://foe-event-set-builder.github.io/?" + string;
            ShortLinkBitly(this.shareString);
        }
    }
    this.saveString = "";
    this.shareString = "";
    this.bitlyString = "";
    this.load = function () {
        loadScene(this.loadString);
        updateConnections();
    }
    this.loadString = "";
    this.import = function(){
        document.querySelector('#importDialog').showModal();
    }
    this.importHelp = function(){
        
        importElement.style.display = "block";
    }
    this.importString = "";

    this.texts = true;
    this.line = true;
    this.highlightRoads = false;
    this.numConnectionsHighlight = false;
}

//dialogPolyfill.registerDialog(document.querySelector('#importDialog'));

function removeBuilding1() {

    requestAnimationFrame(animate);
    if (!buildingSelected && !buildingsSelected) {
        return;
    }
    //console.log("removing: " + guiControls.uuid);
    var ob = scene.getObjectByProperty('uuid', guiControls.uuid);
    var text = texts[objects.indexOf(ob)];
    scene.remove(text);
    scene.remove(ob);
    objects.splice(objects.indexOf(ob), 1);
    texts.splice(texts.indexOf(text), 1);
    buildingSelected = false;
    guiControls.cBuilding = "";
    guiControls.cLevel = null;
    guiControls.cAge = null;
    guiControls.cConnected = null;
    updateConnections();

    while (gui.__folders["Current Building"].__controllers.length > 0) {
        gui.__folders["Current Building"].__controllers[gui.__folders["Current Building"].__controllers.length - 1].remove();
    }
    gui.__folders["Current Building"].name = "Current Building";
    return;
}

function ShortLinkBitly(url) {

    var apiKey = 'aad38d22cab392ecf419e3ecfd811157a5b63a4a';

    var params = {
        "long_url": url
    };

    $.ajax({
        url: "https://api-ssl.bitly.com/v4/shorten",
        cache: false,
        dataType: "json",
        method: "POST",
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + apiKey);
        },
        data: JSON.stringify(params)
    }).done(function (data) {
        guiControls.bitlyString = "" + data.link;

    }).fail(function (data) {
        guiControls.bitlyString = "error";
    });
}

// Save the current scene to a string. Tried making it as small as possible, but I would love to have some sort of online storing in the future. 
// I have no idea how that works though, so yeah ... this works for now :(
function saveScene() {
    var string = "";
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
    string += "?" + guiControls.tempty.toString(base) + "x" + guiControls.troads.toString(base);
    string += "y" + guiControls.stempty.toString(base) + "x" + guiControls.stroads.toString(base);
    return string;
}

// Clear scene, parse the save string and add buildings
function loadScene(string) {
    clearScene();
    if(string.charAt(0) == "{" || string.charAt(0) == "["){
        importCity(string);
        updateConnections();
        dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
        dragControls.addEventListener('dragstart', dragStart);
        dragControls.addEventListener('dragend', dragEnd);
        dragControls.addEventListener('drag', drag);
        return;
    }
    if (string.length < 5) {
        updateConnections();
        dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
        dragControls.addEventListener('dragstart', dragStart);
        dragControls.addEventListener('dragend', dragEnd);
        dragControls.addEventListener('drag', drag);
        return;
    }
    var strings = string.split("?");
    var bldIndex = 0;

    if (strings.length == 3 || strings[0] === "") { bldIndex = 1 }


    var buildings = strings[bldIndex].split("z");
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
    if (strings.length >= 2 && !(strings[0] === "" && strings.length == 2)) {
        var settings = strings[strings.length - 1].split("y");
        guiControls.tempty = toDec(settings[0].split("x")[0]);
        guiControls.troads = toDec(settings[0].split("x")[1]);
        gui.__folders["Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[0].setValue(guiControls.tempty);
        gui.__folders["Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[1].setValue(guiControls.troads);
        guiControls.stempty = toDec(settings[1].split("x")[0]);
        guiControls.stroads = toDec(settings[1].split("x")[1]);
        gui.__folders["Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[0].setValue(guiControls.stempty);
        gui.__folders["Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[1].setValue(guiControls.stroads);
    } else {
        guiControls.tempty = 0;
        guiControls.troads = 0;
        gui.__folders["Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[0].setValue(guiControls.tempty);
        gui.__folders["Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[1].setValue(guiControls.troads);
        guiControls.stempty = 0;
        guiControls.stroads = 0;
        gui.__folders["Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[0].setValue(guiControls.stempty);
        gui.__folders["Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[1].setValue(guiControls.stroads);

    }



    dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', dragStart);
    dragControls.addEventListener('dragend', dragEnd);
    dragControls.addEventListener('drag', drag);

    guiControls.population = "-";


    requestAnimationFrame(animate);
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
    console.log(set);
    var newBuilding = sets[set][building];
    var n = newBuilding.size[0];
    var m = newBuilding.size[1];
    var geometry = new THREE.BoxGeometry(n, 1, m);
    var img = document.location.pathname + "assets/" + n + "x" + m + ".png";
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
    bld.selected = false;


    // Add text
    var loader = new THREE.FontLoader();
    loader.load(document.location.pathname + 'assets/Arial_Regular.json', function (font) {
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
        scene.updateMatrixWorld();
        requestAnimationFrame(animate);

    });
}

function importCity(string) {
    var cityBuildings = JSON.parse(string);
    var currentAge = getImportAge(cityBuildings[1].cityentity_id);

    var ids = [];
    for(var id in cityBuildings){
        ids.push(id);
    }

    for (var i = 0; i<ids.length; i++){
        var str = cityBuildings[ids[i]].cityentity_id; 
        var setId = getImportSet(str);
        if(setId == -1){
            continue;
        }
        //console.log(setId);

        var set = sets[setId];
        var age = str.includes("AllAge") ? currentAge : cityBuildings[ids[i]].level-1;
        var bld = 0; var lvl = 0; var con = 0;
        for(var b = 0; b<set.length; b++){
            for(var l = 0; l<set[b].level.length; l++){
                if(str.includes(set[b].level[l].id)){
                    bld = b;
                    lvl = l;
                    con = set[b].road ? cityBuildings[ids[i]].connected == 1 ? true : false : true;
                    break;
                }
            }
        }
        var x = -cityBuildings[ids[i]].y+32-sets[setId][bld].size[0]/2.0;
        var z = cityBuildings[ids[i]].x-36+sets[setId][bld].size[1]/2.0;
        addBuilding(setId, bld, lvl, age, con, x,z)
    }
    

}

function getImportAge(th){
    switch (th) {
        case "H_BronzeAge_Townhall":
            return 0;
        case "H_IronAge_Townhall":
            return 1;
        case "H_EarlyMiddleAge_Townhall":
            return 2;
        case "H_HighMiddleAge_Townhall":
            return 3;
        case "H_LateMiddleAge_Townhall":
            return 4;
        case "H_ColonialAge_Townhall":
            return 5;
        case "H_IndustrialAge_Townhall":
            return 6;
        case "H_ProgressiveEra_Townhall":
            return 7;
        case "H_ModernEra_Townhall":
            return 8;
        case "H_PostModernEra_Townhall":
            return 9;
        case "H_ContemporaryEra_Townhall":
            return 10;
        case "H_TomorrowEra_Townhall":
            return 11;
        case "H_FutureEra_Townhall":
            return 12;
        case "H_ArcticFuture_Townhall":
            return 13;
        case "H_OceanicFuture_Townhall":
            return 14;
        case "H_VirtualFuture_Townhall":
            return 15;
        case "H_SpaceAgeMars_Townhall":
            return 16;
        case "H_SpaceAgeAsteroidBelt_Townhall":
            return 17;
        default:
            return 0;
    }
}

function getImportSet(str){
    if(str.includes("SpringBonusSet")){
        return 0;
    }else if(str.includes("CarnivalBonus19")){
        return 1;
    }else if(str.includes("PatrickBonusSet20")){
        return 2;
    }else if(str.includes("SummerBonusSetA17")){
        return 3;
    }else if(str.includes("SummerBonusSetB17")){
        return 4;
    }else if(str.includes("SportBonusSet18")){
        return 5;
    }else if(str.includes("RoyalBonusSet17")){
        return 6;
    }else if(str.includes("WinterBonusSet17")){
        return 7;
    }else{
        return -1;
    }
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
    requestAnimationFrame(animate);
}

// Let there be life!
function animate() {
    if (guiControls.population == "-") {
        updateConnections();
    }

    renderer.render(scene, camera)
}

init();

// Easier testing
//loadScene("101h1uyauy6wgz111h1uy7wguy7z121h1uy9wguy4z131h1uy7uy4wgz141h1uy8wguy5wgz001h1uy9u3wgz011h0uy8wgu6z021h1uy6wgu3z041h1uy7wgu4wgz101h1uy2uy6wgz111h1uy1wguy4z121h1uy9wguy9z121h1uy4wguy7z121h1uy4wguy4z141h1uy7wguy8wgz141h1uy4wguy5wgz141h1uy0wguy5wgz141h1uy1wguy2wgz121h1u0wguy7z121h1u0wguy2z131h1u1uy4wgz001h1uy6u5wgz001h1uy7u8wgz001h1uyau8wgz041h1uy8wgu7wgz021h0uy8wgubz001h1uy6ubwgz001h1uy9udwgz011h1uy6wguez041h1uy7wgucwgz041h1uyewgu4wgz041h1uyawguawgz041h1uyewgucwgz041h1uydwgu7wgz041h1uyawgu6wgz001h1uygu5wgz001h1uydu3wgz001h1uybu4wgz001h1uycu8wgz001h1uyfu8wgz001h1uydudwgz011h1uyfwgu3z011h0uydwgubz021h1uyfwguez021h0uydwgu6z001h1uygubwgz001h1uybucwgz001h1uyeugwgz001h1uyhugwgz001h1uy8ugwgz001h1uy5ugwgz001h1uy9ujwgz001h1uy6ulwgz001h1uygulwgz001h1uydujwgz011h1uyfwgujz021h1uy6wgujz021h1uydwgumz011h1uy8wgumz001h1uybukwgz041h1uyfwgufwgz041h1uy6wgufwgz041h1uyewgukwgz041h1uy7wgukwgz041h1uyawgumwgz141h1uy5wguy5wgz141h1uy3wguy5wg");


