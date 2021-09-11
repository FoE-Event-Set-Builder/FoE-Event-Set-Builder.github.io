// As you can see this is just me fooling around testing a bunch of stuff, this is a hobby project, proper coding styles be damned :P
let renderer, controls, scene, camera, frustumSize = 48, line, objects = [], copyObjects = [], texts = [], startPosition, groupStart, dragMesh, guiControls, grid, raycaster, gui, selectionBox, selectionHelper, buttonPressed = false;
let texture = new THREE.TextureLoader().load(document.location.pathname + 'assets/texture.png');

// Selection
let selectMode = false, multipleBuildingsSelected = false, buildingsPasted = false, buildingSelected = false, selBox;

// Mouse position
let mousex, mousez, currentx = 0, currentz = 0;;

// Dragging
let dragControls, preventDragging = false, startDrag = true;

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
let winterBakery = getBakery();
let circusSet = getCircus();

// Array used for easy access of information, DO NOT change order, it'll break everything. Probs a better way to do this, but meh :)
let sets = [cherry, piazza, celtic, indianPalace, indianFountain, classicalGarden, royalGarden, winterVillage, harvestBarn, winterBakery, circusSet];

// Display information for the dat.gui controls. Again do not change order...
let setBuildings = [{ SakuraRock: 0, EmperorsEntrance: 1, ZenZone: 2, NishikigoiPond: 3, GongOfWisdom: 4 },
{ Homes: 0, Cafe: 1, ClockTower: 2, Fountain: 3, MaskVendor: 4 },
{ MoonGate: 0, FaeryRings: 1, DruidWillow: 2, MajesticFawn: 3, StandingStone: 4 },
{ Palace: 0, WesternTower: 1, EasternTower: 2, BandarPlayground: 3, JunglePond: 4 },
{ ElephantFountain: 0, FountainGate: 1, ChhatriGarden: 2, TitanArum: 3, MemorialChhatri: 4 },
{ GardenPool: 0, GardenPatio: 1, GardenStatues: 2 },
{ KingStatue: 0, QueenStatue: 1, GardenRuins: 2 },
{ Toymaker: 0, MooseMeadow: 1, SugerBaker: 2, Smörgåsbord: 3, Candlemaker: 4, Tinkerer: 5, Halmbock: 6, StrawStar: 7, MadameFortuna: 8 },
{ Barn: 0, Sunflower: 1, Wheat: 2, Begonia: 3, Autumn: 4, Ochre: 5, Primrose: 6},
{ Gingerbread: 0, Marzipan: 1, Macaron: 2, Lussebullar: 3},
{ TerrorTeacups: 0, MysticalOrgan: 1, WheelOfDeath: 2, HelterSkelter: 3, ClownTown: 4}];
let setNames = ["Cherry Garden", "Piazza", "Celtic Forest", "Indian Palace", "Indian Fountain", "Classical Garden", "Royal Garden", "Winter Village", "Harvest Barn", "Winter Bakery", "Horror Circus"];

document.getElementById("pertile").checked = true

let helpElement = document.getElementById("info");
helpElement.style.display = "none";
let closeHelp = document.getElementsByClassName("close")[0];

let importElement = document.getElementById("import");
importElement.style.display = "none";
let importHelp = document.getElementsByClassName("close")[1];

let fallDoc = document.getElementById("fall");
fallDoc.style.display = "none"
let closeFall = document.getElementsByClassName("close")[2];

let mobDoc = document.getElementById("mobile");
mobDoc.style.display = "none"
let closeMob = document.getElementsByClassName("close")[3];

closeHelp.onclick = function () {
    helpElement.style.display = "none";
}
importHelp.onclick = function() {
    importElement.style.display = "none";
}
closeFall.onclick = function () {
    fallDoc.style.display = "none";
}
closeMob.onclick = function () {
    mobDoc.style.display = "none";
}

document.querySelector("#canvas").addEventListener('mousedown', onDocumentClick, false);

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);
window.addEventListener('keydown', keyPressEvent, true);

let mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

if(mobile){mobDoc.style.display = "block"}

window.onclick = function (event) {
    if (event.target == helpElement) {
        helpElement.style.display = "none";
    }
    if(event.target == importElement){
        importElement.style.display = "none";
    }
    if(event.target == fallDoc){
        fallDoc.style.display = "none";
    }
    if(event.target == mobDoc){
        mobDoc.style.display = "none";
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

$.notify("Tip: Right click and drag to select buildings of interest, only the \n selected buildings will be displayed in production overview! (x)",{position: "top left", gap: 50,  autoHideDelay:60000});

function init() {
    // Basic threejs stuff
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 100);

    camera.position.set(0, 20, 0);
    scene.add(camera);

    window.addEventListener('resize', onWindowResize, false);

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

    // Selection box
    var boxGeo = new THREE.BoxGeometry(1, 1, 1);
    var boxMat = new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 });
    selBox = new THREE.Mesh(boxGeo, boxMat);
    selBox.position.set(-100, 3, -100);
    selBox.visible = false;
    scene.add(selBox);

    selectionBox = new SelectionBox(camera, scene);
    selectionHelper = new SelectionHelper(selectionBox, renderer, 'selectBox');

    // GUI controls
    addControls();
}

function addControls() {
    // Controls! What do you mean the naming scheme makes no sense? 
    guiControls = new addGuiControls();
    gui = new dat.GUI({ width: 300});
    gui.domElement.id = "gui";
    // Add Building
    gui.add(guiControls, 'showHelp').name("How To Use")
    gui.add(guiControls, 'fallSet').name("Fall Event Designs")
    gui.add(guiControls, 'supportMe').name("Support The Builder!")
    var folder1 = gui.addFolder('Add Building');
    folder1.add(guiControls, 'addBuilding1').name("✔️ Add");;
    folder1.add(guiControls, 'set', { "Cherry Garden": 0, "Piazza": 1, "Celtic Forest": 2, "Indian Palace": 3, "Indian Fountain": 4, "Classical Garden": 5, "Royal Garden": 6, "Winter Village": 7, "Harvest Barn": 8, "Winter Bakery": 9, "Horror Circus": 10}).name("Set").onChange(updateSetBuildings);
    folder1.add(guiControls, 'building', setBuildings[guiControls.set]).name("Building").listen().onChange(updateAddStats);
    folder1.add(guiControls, 'level', { 1: 0, 2: 1 }).name("Level").listen().onChange(updateLevelStats);;
    folder1.add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);
    folder1.add(guiControls, 'bsize').name("Size");
    folder1.add(guiControls, 'road1').name("Road");
    folder1.add(guiControls, 'base1').name("Base");
    folder1.add(guiControls, 'bonus1').name("Set Bonus 1");
    folder1.add(guiControls, 'bonus2').name("Set Bonus 2");
    folder1.add(guiControls, 'bonus3').name("Set Bonus 3");
    folder1.open();

    // Current Building
    var folder2 = gui.addFolder("Current Building");
    folder2.open();

    // Production overview
    var folder21 = gui.addFolder("Full Production Overview");

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
    folder6.add(guiControls, 'attackingAttack').listen().name("Attacking Atk %");
    folder6.add(guiControls, 'attackingDefense').listen().name("Attacking Def %");
    folder6.add(guiControls, 'defendingAttack').listen().name("City Def Atk %");
    folder6.add(guiControls, 'defendingDefense').listen().name("City Def Def %");
    folder6.add(guiControls, 'coinsBoost').listen().name("Coins Boost %");
    folder6.add(guiControls, 'supplyBoost').listen().name("Supply Boost %");
    folder6.open();

    // Per Tile
    var folder8 = folder22.addFolder("Per Tile");
    folder8.add(guiControls, 'tempty').name("Empty Tiles:").onChange(calculateStats);
    folder8.add(guiControls, 'troads').name("Road Tiles:").onChange(calculateStats);
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
    folder11.add(guiControls, 'tattackingAttack').listen().name("Attacking Atk %");
    folder11.add(guiControls, 'tattackingDefense').listen().name("Attacking Def %");
    folder11.add(guiControls, 'tdefendingAttack').listen().name("City Def Atk %");
    folder11.add(guiControls, 'tdefendingDefense').listen().name("City Def Def %");
    folder11.add(guiControls, 'tcoinsBoost').listen().name("Coins Boost %");
    folder11.add(guiControls, 'tsupplyBoost').listen().name("Supply Boost %");
    folder11.open();

    // Per Set Productions
    var folder322 = folder21.addFolder("Per Set");
    folder322.add(guiControls, 'cset', { "Cherry Garden": 0, "Piazza": 1, "Celtic Forest": 2, "Indian Palace": 3, "Indian Fountain": 4, "Classical Garden": 5, "Royal Garden": 6, "Winter Village": 7, "Harvest Barn": 8, "Winter Bakery": 9, "Horror Circus": 10}).listen().name("Set").onChange(calculateStats);
    
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
    folder36.add(guiControls, 'sattackingAttack').listen().name("Attacking Atk %");
    folder36.add(guiControls, 'sattackingDefense').listen().name("Attacking Def %");
    folder36.add(guiControls, 'sdefendingAttack').listen().name("City Def Atk %");
    folder36.add(guiControls, 'sdefendingDefense').listen().name("City Def Def %");
    folder36.add(guiControls, 'scoinsBoost').listen().name("Coins Boost %");
    folder36.add(guiControls, 'ssupplyBoost').listen().name("Supply Boost %");
    folder36.open();

    // Per Tile
    var folder38 = folder322.addFolder("Per Tile");
    folder38.add(guiControls, 'stempty').name("Empty Tiles:").onChange(calculateStats);
    folder38.add(guiControls, 'stroads').name("Road Tiles:").onChange(calculateStats);
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
    folder311.add(guiControls, 'stattackingAttack').listen().name("Attacking Atk %");
    folder311.add(guiControls, 'stattackingDefense').listen().name("Attacking Def %");
    folder311.add(guiControls, 'stdefendingAttack').listen().name("City Def Atk %");
    folder311.add(guiControls, 'stdefendingDefense').listen().name("City Def Def %");
    folder311.add(guiControls, 'stcoinsBoost').listen().name("Coins Boost %");
    folder311.add(guiControls, 'stsupplyBoost').listen().name("Supply Boost %");
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
    folder77.add(guiControls, 'importHelp').name("How To Import");
    folder7.open();

    // Toggles
    var folder41 = gui.addFolder("Settings / Toggles");
    folder41.add(guiControls, 'texts').name("Show Building Initials").onChange(updateTextVisibilities);
    folder41.add(guiControls, 'line').name("Show City Outline").onChange(updateLineVisibilities);
    folder41.add(guiControls, 'highlightRoads').name("Show Buildings Requiring Roads").listen().onChange(updateRoadHighlight);
    folder41.add(guiControls, 'numConnectionsHighlight').listen().name("Show # Neighbours").onChange(updateNumConnectionHighlight);
    folder41.open();
}

function updateAddStats() {
    updateRewards(false, null, false);
}

function updateLevelStats(){
    updateRewards(false, null, true);
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

    var levels = sets[guiControls.set][0].level.length == 1 ? { 1: 0 } : sets[guiControls.set][0].level.length == 4 ?  {1: 0, 2: 1, 3: 2, 4: 3} : { 1: 0, 2: 1 };
    var setLevel = levels[Object.keys(levels).length];
    //if(guiControls.set == 9){console.log("hey"); levels = {6: 0}; setLevel = 0;}
    gui.__folders["Add Building"].add(guiControls, 'addBuilding1').name("✔️ Add");;
    gui.__folders["Add Building"].add(guiControls, 'set', { "Cherry Garden": 0, "Piazza": 1, "Celtic Forest": 2, "Indian Palace": 3, "Indian Fountain": 4, "Classical Garden": 5, "Royal Garden": 6, "Winter Village": 7, "Harvest Barn": 8, "Winter Bakery": 9, "Horror Circus": 10}).name("Set").onChange(updateSetBuildings);
    gui.__folders["Add Building"].add(guiControls, 'building', setBuildings[guiControls.set]).listen().name("Building").setValue(0).onChange(updateAddStats);
    gui.__folders["Add Building"].add(guiControls, 'level', levels).name("Level").listen().setValue(setLevel).onChange(updateLevelStats);
    gui.__folders["Add Building"].add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);

    updateRewards(false, null, false);
}

// Update the gui display of building productions
function updateRewards(current, ob, level) {
    var folder = current ? "Current Building" : "Add Building";
    var len = gui.__folders[folder].__controllers.length;

    var stop = current ? 0 : 3;

    if (gui.__folders[folder].__controllers.length < stop) { return; }

    var set = current ? ob.set : guiControls.set;
    var building = current ? ob.building : guiControls.building;
    var age = current ? ob.age : guiControls.age;

    age = parseInt(age)
    //console.log(age);

    for (var x = 0; x < len; x++) {
        if (gui.__folders[folder].__controllers.length <= stop) { break; }
        gui.__folders[folder].__controllers[gui.__folders[folder].__controllers.length - 1].remove();
    }

    if(!current){
        var levels = sets[set][building].level.length == 1 ? { 1: 0 } : sets[set][building].level.length == 4 ?  {1: 0, 2: 1, 3: 2, 4: 3} : { 1: 0, 2: 1 };
        var setLevel = level ? guiControls.level :  levels[Object.keys(levels).length];
        gui.__folders[folder].add(guiControls, 'level', levels).name("Level").listen().setValue(setLevel).onChange(updateLevelStats);
        gui.__folders[folder].add(guiControls, 'age', { BA: 0, IA: 1, EMA: 2, HMA: 3, LMA: 4, CA: 5, INA: 6, PE: 7, ME: 8, PME: 9, CE: 10, TE: 11, FE: 12, AF: 13, OF: 14, VF: 15, SAM: 16, SAAB: 17 }).listen().name("Age").onChange(updateAddStats);
    }

    var level = current ? ob.level : guiControls.level;
    //console.log("lvl " + level);
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
            var op = { Diconnected: false, Connected: true };
            gui.__folders[folder].add(guiControls, 'cConnected', op).listen().setValue(ob.connected).name("Road Connection").onChange(updateCurrentBuilding);
            gui.__folders[folder].__controllers[5].__li.className = "cr number";
        }
    } else {
        var bsize = sets[set][building].size[0] + " x " + sets[set][building].size[1];
        gui.__folders[folder].add(guiControls, "bsize").setValue(bsize).name("Size")
        var road = sets[set][building].road ? "Required" : "Not Required";
        gui.__folders[folder].add(guiControls, "road1").setValue(road).name("Road");
    }

    var codes = ["population", "happiness", "fps", "goods", "medals", "coins", "supplies", "attackingAttack", "attackingDefense", "defendingAttack", "defendingDefense", "coinsBoost", "supplyBoost"];
    var displayNames = ["Population", "Happiness", "FPs", "Goods", "Medals", "Coins", "Supplies", "Attacking Atk (%)", "Attacking Def (%)", "City Def Atk (%)", "City Def Def (%)", "Coin Boost (%)", "Supply Boost (%)"]
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
    // Prevent backspace from going to previous page
    if (event.which === 8 && !$(event.target).is("input, textarea")) {
        event.preventDefault();
    }

    // Delete selected building
    if ((event.key == "Backspace" || event.key == "Delete") && !$(event.target).is("input, textarea")) {
        if (multipleBuildingsSelected) {
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
            multipleBuildingsSelected = false;
            resetSelectedStatus();
        } else {
            removeBuilding1();
        }
    }

    // Copy
    if (event.key == "c" && event.ctrlKey){ 
        copyObjects = [];
        for(var i = 0; i<objects.length; i++){
            if(objects[i].selected){
                copyObjects.push(objects[i]);
            }
        }
        if(buildingSelected && !multipleBuildingsSelected){
            copyObjects.push(scene.getObjectByProperty('uuid', guiControls.uuid));
        }
    }

    // Paste
    if(event.key == "v" && event.ctrlKey){
        if(copyObjects.length == 0){return;}
        resetSelectedStatus();
        var b = copyObjects[0];
        var x, z;
        if (b.geometry.parameters.depth % 2 == 1) {
            z = Math.round(mousez) - 0.5;
        } else {
            z = Math.round(mousez);
        }
        if (b.geometry.parameters.width % 2 == 0) {
            x = Math.round(mousex);
        } else {
            x = Math.round(mousex) - 0.5;
        }

        var currentIds = "";
        for(var i = 0; i<scene.children.length; i++){
            currentIds += "-" + scene.children[i].uuid;
        }

        //var num = 1;
        addBuilding(b.set, b.building, b.level, b.age, b.connected, x, z,true);
        for(var i = 1; i<copyObjects.length; i++){
            var xdiff = copyObjects[0].position.x-copyObjects[i].position.x;
            var zdiff = copyObjects[0].position.z-copyObjects[i].position.z;
            b = copyObjects[i];
            addBuilding(b.set, b.building, b.level, b.age, b.connected, x-xdiff, z-zdiff,true);
            //num++;
        }

        /*
        //console.log(ids);
        for(var i = 0; i<scene.children.length; i++){
            continue;
            if(!scene.children[i].pasted){continue;}
            var ob = scene.children[i];
            ob.visible = false; 
            ob.selected = true;
        }
        //var ob1 = scene.getObjectByProperty('uuid', id);
        buildingsPasted = true;
        //setupDragMesh(scene.children[scene.children.length-1]);
        */
    }
    
}

//let pasteMeshCreated = false;

function onMouseMove(event) {
    if (buttonPressed) { requestAnimationFrame(animate); }

    var mouse = new THREE.Vector2(0, 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    selectionBox.endPoint.set(
        mouse.x,
        mouse.y,
        0.5);

    raycaster.setFromCamera(mouse, camera);

    var gridIntersect = raycaster.intersectObject(grid);

    mousex = gridIntersect[0].point.x;
    mousez = gridIntersect[0].point.z;

    /*
    if(buildingsPasted){
        if(pasteMeshCreated){
            dragMesh.position.x = mousex;
            dragMesh.position.z = mousez;
            requestAnimationFrame(animate);
        }else{
            console.log("setup");
            var objs = [];
            for(var i = 0; i<objects.length;i++){
                if(objects[i].selected){
                    objs.push(objects[i]);
                }
            }
            setupDragMesh(objs[0]);
            pasteMeshCreated = true;
        }
    }
    */

    if (!selectMode) { return; }

    var n = (currentx - (gridIntersect[0].point.x));
    var m = (currentz - (gridIntersect[0].point.z));

    selBox.visible = true;
    selBox.geometry = new THREE.BoxGeometry(n, 1, m);
    selBox.position.set(currentx - n / 2, 2, currentz - m / 2);

    var allSelected = selectionBox.select();

    if(!multipleBuildingsSelected){
        for(var i = 0; i < allSelected.length; i++){
            if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line" && allSelected[i].uuid != selBox.uuid) {
                multipleBuildingsSelected = true;
            }
        }
    }else{
        var selString = undefined;
        for(var i = 0; i < allSelected.length; i++){
            if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line" && allSelected[i].uuid != selBox.uuid) {
               selString += "-" + allSelected[i].uuid;
            }
        }
        if(typeof selString === "undefined"){
            for(var i = 0; i < objects.length; i++){
                objects[i].material.transparent = false;
                objects[i].material.opacity = 1;
                texts[i].material.transparent = false;
                texts[i].material.opacity = 1;
            }
            multipleBuildingsSelected = false;
            return;
        }
        for(var i = 0; i < objects.length; i++){
            if(!selString.includes(objects[i].uuid)){
                objects[i].material.transparent = true;
                objects[i].material.opacity = 0.3;
                texts[i].material.transparent = true;
                texts[i].material.opacity = 0.3;
            }else{
                objects[i].material.transparent = false;
                objects[i].material.opacity = 1;
                texts[i].material.transparent = false;
                texts[i].material.opacity = 1;
            }
        }
    }
}

function onMouseUp(event) {
    requestAnimationFrame(animate);
    buttonPressed = false;
    if (!selectMode) { return }
    selectionBox.endPoint.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5);

    selBox.visible = false;

    var allSelected = selectionBox.select();
    for (var i = 0; i < allSelected.length; i++) {
        if (allSelected[i].geometry.type != "TextGeometry" && allSelected[i].type != "LineSegments" && allSelected[i].type != "Line" && allSelected[i].uuid != selBox.uuid) {
            allSelected[i].selected = true;
            multipleBuildingsSelected = true;
        }
    }
    for(var i = 0; i < objects.length; i++){
        if(!multipleBuildingsSelected){break;}
        if(!objects[i].selected){
            objects[i].material.transparent = true;
            objects[i].material.opacity = 0.3;
            texts[i].material.transparent = true;
            texts[i].material.opacity = 0.3;
        }
    }
    if(multipleBuildingsSelected){calculateStats();}
    selBox.material.color.set(0x0000ff);

    selectMode = false;
    preventDragging = false;
    dragControls.enabled = true;
}

// The almighty on click event! 
function onDocumentClick(event) {
    // clear inputs when main body clicked
    var inputs = document.getElementsByTagName("INPUT");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].blur();
    }

    if(buildingsPasted){
        for(var i = 0; i<objects.length; i++){
            if(objects[i].selected){
                objects.visible = true;

            }
        }
    }

    buttonPressed = true;

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

    // Right-click
    if (event.button === 2) {
        if (multipleBuildingsSelected) {
            resetSelectedStatus();
            multipleBuildingsSelected = false;
        }
        selectionBox.startPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        selectionBox.endPoint.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
            0.5);
        selectMode = true;
        preventDragging = true;
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
        guiControls.cAge = parseInt(intersects[0].object.age);
        guiControls.cConnected = intersects[0].object.connected;
        if (intersects[0].object.road) {
            gui.__folders["Current Building"].name = intersects[0].object.name + " - Road Required";
        } else {
            gui.__folders["Current Building"].name = intersects[0].object.name + " - No Road Required";
        }

        // Update the production stats of the currently selected building
        updateRewards(true, intersects[0].object, false);

        buildingSelected = true;

    } else {
        if (multipleBuildingsSelected) {
            resetSelectedStatus();
            multipleBuildingsSelected = false;
        }
        if (guiControls.numConnectionsHighlight){
            updateNumConnectionHighlight();
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
    calculateStats();
}

function resetSelectedStatus(){
    for (var i = 0; i < objects.length; i++) {
        var mode = guiControls.highlightRoads ? 2 : guiControls.numConnectionsHighlight ? 1 : 0;
        if(mode == 0){
            objects[i].material.color.set(sets[objects[i].set][objects[i].building].color);
        }
        objects[i].selected = false;
        objects[i].material.transparent = false;
        objects[i].material.opacity = 1;
        texts[i].material.transparent = false;
        texts[i].material.opacity = 1;
    }
}

// Drag control start! Store starting position
function dragStart(event) {
    requestAnimationFrame(animate);
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);
    groupStart = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);
    return;
}

// Sets up a mash of all dragged buildings, for performance reasons as moving many buildings is laggy
function setupDragMesh(selectedBuilding){
    var mergeGeometry = new THREE.Geometry();
    var mats = [];

    var material = new THREE.MeshPhongMaterial({ color: 0x666666, transparent: true, opacity: 0.5 });
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].selected && objects[i].uuid != selectedBuilding.uuid) {
            mergeGeometry.merge(objects[i].geometry, objects[i].matrix);
            mats.push(material);
            objects[i].visible = false;
            texts[i].visible = false;
        }
    }
    while (mats.length < 3) {
        mergeGeometry.merge(selectedBuilding.geometry, selectedBuilding.matrix);
        mats.push(material);
    }
    dragMesh = new THREE.Mesh(mergeGeometry, mats)
    scene.add(dragMesh);
    dragMesh.visible = true;
}

// Function runs whenever a dragged building's position changes
function drag(event) {
    if(preventDragging){
        event.object.position.x = startPosition.x;
        event.object.position.z = startPosition.z;
        return;
    }
    // dragStart would run before onDocumentClick, which would mess up selection logic, so this is a workaround for that
    if(startDrag){
        startDrag = false;
        if (multipleBuildingsSelected) {
            setupDragMesh(event.object);
        }
        return;
    }

    requestAnimationFrame(animate);

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

    // Move drag mesh if multiple buildings are selected
    if (multipleBuildingsSelected) {
        var diffx = event.object.position.x - startPosition.x;
        var diffz = event.object.position.z - startPosition.z;

        dragMesh.position.set(dragMesh.position.x + diffx, dragMesh.position.y, dragMesh.position.z + diffz);
    }

    // Move the text with the object, I feel like there should be a way to link it to the object, probably is, but this works fine :)
    texts[objects.indexOf(scene.getObjectByProperty('uuid', event.object.uuid))].position.set(event.object.position.x - event.object.textSize / 2, 2, event.object.position.z + event.object.textSize / 2);

    // Update start position
    startPosition = new THREE.Vector3(event.object.position.x, event.object.position.y, event.object.position.z);
}

// Recalculate production overview
function dragEnd(event) {
    startDrag = true;
    if(preventDragging){
        event.object.position.x = startPosition.x;
        event.object.position.z = startPosition.z;
        return;
    }

    requestAnimationFrame(animate);

    if (multipleBuildingsSelected) {
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
    calculateStats();
    if (guiControls.numConnectionsHighlight) { updateNumConnectionHighlight() }
}

// Calculates all the stats of the current setup
function calculateStats() {
    var numBuildings = 0;
    var numKits = 0;
    var names = ["population", "happiness", "fps", "goods", "medals", "coins", "supplies", "attackingAttack", "attackingDefense", "defendingAttack", "defendingDefense", "coinsBoost", "supplyBoost"];
    
    // Total stats
    var population = 0, happiness = 0, fps = 0, goods = 0, medals = 0, coins = 0, supplies = 0, attackingAttack = 0, attackingDefense = 0, defendingAttack = 0, defendingDefense = 0, coinsBoost = 0, supplyBoost = 0;
    var stats = [population, happiness, fps, goods, medals, coins, supplies, attackingAttack, attackingDefense, defendingAttack, defendingDefense, coinsBoost, supplyBoost];
    var tiles = guiControls.tempty + guiControls.troads;

    // Per set stats
    var spopulation = 0, shappiness = 0, sfps = 0, sgoods = 0, smedals = 0, scoins = 0, ssupplies = 0, sattackingAttack = 0, sattackingDefense = 0, sdefendingAttack = 0, sdefendingDefense = 0, scoinsBoost = 0, ssupplyBoost = 0;
    var sstats = [spopulation, shappiness, sfps, sgoods, smedals, scoins, ssupplies, sattackingAttack, sattackingDefense, sdefendingAttack, sdefendingDefense, scoinsBoost, ssupplyBoost];
    var stiles = guiControls.stempty + guiControls.stroads;
    var set = guiControls.cset;

    for (var i = 0; i < objects.length; i++) {
        // If buildings are selected, only count the selected buildings
        if(multipleBuildingsSelected && !objects[i].selected){continue;}

        numBuildings++;
        numKits += parseInt(objects[i].level) + 1; // 0 - Indexed
        if(objects[i].set == 9){numKits += 5}
        tiles += objects[i].geometry.parameters.width * objects[i].geometry.parameters.depth;

        var objSet = objects[i].set;
        if (set == objSet) {
            stiles += objects[i].geometry.parameters.width * objects[i].geometry.parameters.depth;
        }

        // Do not count disconnected buildings
        if (objects[i].connected == true || objects[i].road == false) {
            var neighbours = getNeighbours(i, objects[i].name);
            var unique = [...new Set(neighbours)];
            var rewardNum = sets[objSet][objects[i].building].level[objects[i].level].rewards.length;

            // Base productions
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

            // Bonus productions
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

        // Count boosts of disconnected buildings
        if (objects[i].connected == false && objects[i].road == true) {
            var neighbours = getNeighbours(i, objects[i].name);
            var unique = [...new Set(neighbours)];
            var rewardNum = sets[objSet][objects[i].building].level[objects[i].level].rewards.length;

            // Base productions
            for (var r = 0; r < rewardNum; r++) {
                for (var l = 7; l < stats.length; l++) {
                    if (sets[objSet][objects[i].building].level[objects[i].level].rewards[r].type == names[l]) {
                        stats[l] += sets[objSet][objects[i].building].level[objects[i].level].rewards[r].values[objects[i].age];
                        if (set == objSet) {
                            sstats[l] += sets[objSet][objects[i].building].level[objects[i].level].rewards[r].values[objects[i].age];
                        }
                        break;
                    }
                }
            }

            // Bonus productions
            for (var j = 0; j < unique.length; j++) {
                if (sets[objSet][objects[i].building].level[objects[i].level].bonuses.length <= j) {
                    break;
                }
                for (var l = 7; l < stats.length; l++) {
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
    }

    // Update GUI Controls
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

    // Update quick stats bar
    
    //var perTile = document.getElementById("pertile").checked;
    //console.log(numKits);
    //document.getElementById("tblds").innerHTML = numBuildings + " (" + numKits + ")";
    //document.getElementById("ttile").innerHTML = tiles;
    //document.getElementById("tpop").innerHTML = perTile ? guiControls.tpopulation : guiControls.population;
    //document.getElementById("thap").innerHTML = perTile ? guiControls.thappiness : guiControls.happiness;
    //document.getElementById("tfp").innerHTML = perTile ? guiControls.tfps : guiControls.fps;
    //document.getElementById("tgood").innerHTML = perTile ? guiControls.tgoods : guiControls.goods;
    //document.getElementById("taa").innerHTML = perTile ? guiControls.tattackingAttack : guiControls.attackingAttack;
    //document.getElementById("tad").innerHTML = perTile ? guiControls.tattackingDefense : guiControls.attackingDefense


    if(document.getElementById("pertile").checked){
        document.getElementById("tblds").innerHTML = numBuildings + "&nbsp;(" + numKits + ")";
        document.getElementById("ttile").innerHTML = tiles;
        document.getElementById("tfp").innerHTML = isNaN(guiControls.tfps) ? guiControls.fps +  "&nbsp;(0.0)" : guiControls.fps +  "&nbsp;(" + guiControls.tfps + ")";
        document.getElementById("tgood").innerHTML = isNaN(guiControls.tgoods) ? guiControls.goods +  "&nbsp;(0.0)" : guiControls.goods +  "&nbsp;(" + guiControls.tgoods + ")";
        document.getElementById("taa").innerHTML = isNaN(guiControls.tattackingAttack) ? guiControls.attackingAttack +  "&nbsp;(0.0)" : guiControls.attackingAttack +  "&nbsp;(" + guiControls.tattackingAttack + ")";
        document.getElementById("tad").innerHTML = isNaN(guiControls.tattackingDefense) ? "+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + guiControls.attackingDefense +  "&nbsp;(0.0)" : "+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + guiControls.attackingDefense +  "&nbsp;(" + guiControls.tattackingDefense + ")";
        document.getElementById("tac").innerHTML = isNaN(parseFloat(guiControls.tattackingAttack)+parseFloat(guiControls.tattackingDefense)) ? "=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (guiControls.attackingAttack+guiControls.attackingDefense) +  "&nbsp;(0.0)" : "=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (guiControls.attackingAttack+guiControls.attackingDefense) +  "&nbsp;(" + Math.round((parseFloat(guiControls.tattackingAttack)+parseFloat(guiControls.tattackingDefense))*100)/100 + ")";
    } else {
        document.getElementById("tblds").innerHTML = numBuildings + " (" + numKits + ")";
        document.getElementById("ttile").innerHTML = tiles
        document.getElementById("tfp").innerHTML = guiControls.fps
        document.getElementById("tgood").innerHTML = guiControls.goods
        document.getElementById("taa").innerHTML = guiControls.attackingAttack
        document.getElementById("tad").innerHTML = guiControls.attackingDefense
        document.getElementById("tac").innerHTML = guiControls.attackingAttack + guiControls.attackingDefense
        
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
        objects[id].age = parseInt(guiControls.cAge);
        objects[id].connected = JSON.parse(guiControls.cConnected);
        updateRewards(true, objects[id], false);
        calculateStats();
    }
}

// Position where new building is added
function getAddPosition(){
    var newBuilding = sets[guiControls.set][guiControls.building];
    var n = newBuilding.size[0];
    var m = newBuilding.size[1];

    var top_left = new THREE.Vector3().set(-1,1,-1).unproject(camera);
    var top_right = new THREE.Vector3().set(1,1,-1).unproject(camera);
    var bottom = new THREE.Vector3().set(-1,-1,-1).unproject(camera);

    var width = top_right.x - top_left.x;
    var height = bottom.z - top_left.z;

    //console.log("W: " + width + " H: " + height)


    var top = new THREE.Vector3();
    top.set(1, 1, -1).unproject(camera);
    //console.log(top)
    top.x = top.x - n - 20;
    top.z = top.z + m;

    box = gui.domElement.getBoundingClientRect();

    pos = new THREE.Vector3((box.x / window.innerWidth)*2-1, - (box.y / window.innerHeight)*2+1, -1).unproject(camera);
    pos.x = Math.round(pos.x - n - 1);
    pos.z = Math.round(pos.z + m + 1);
    pos.x = n % 2 == 0 ? pos.x : pos.x+0.5;
    pos.z = m % 2 == 0 ? pos.z : pos.z-0.5;
    pos.x = n > 3 ? pos.x + 1 : pos.x;
    pos.z = m > 3 ? pos.z - 1 : pos.z;
    //console.log(pos)
    return pos;
}

// Everything to do with the controls
function addGuiControls() {
    this.showHelp = function () {
        helpElement.style.display = "block";
    }
    this.fallSet = function () {
        fallDoc.style.display = "block";
    }
    this.supportMe = function () {
        window.open("https://bit.ly/MooingCat-Patreon")
    }

    this.set = 0;
    this.building = 0;
    this.level = 1;
    this.age = 17;
    this.addBuilding1 = function () {
        var pos = getAddPosition();
        addBuilding(this.set, this.building, this.level, this.age, true, pos.x, pos.z,false);
        requestAnimationFrame(animate);
    }

    this.bsize = "2 x 3";
    this.road1 = "Not Required";
    this.base1 = "6140 Happiness";
    this.base2 = "";
    this.base3 = "";
    this.base4 = "";
    this.base5 = "";
    this.base6 = "";
    this.base7 = "";
    this.bonus1 = "7370 Happiness";
    this.bonus2 = "4 Attacking Atk (%)";
    this.bonus3 = "6 Attacking Atk (%)";
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
            objects[id].age = parseInt(this.cAge);
            objects[id].connected = this.cConnected;
            calculateStats();
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
            var string = "64c" + LZString.compressToBase64(saveScene());
            this.saveString = string;
            var sStr = "https://foe-event-set-builder.github.io/?" + string;
            if(sStr.length > 2000){
                this.shareString = "Link too long (use save string)"
                this.bitlyString = "Link too long (use save string)"
            }else{
                this.shareString = sStr;
                ShortLinkBitly(this.shareString);
            }
        }
    }
    this.saveString = "";
    this.shareString = "";
    this.bitlyString = "";
    this.load = function () {
        loadScene(this.loadString);
        calculateStats();
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

function removeBuilding1() {
    requestAnimationFrame(animate);
    if (!buildingSelected && !multipleBuildingsSelected) {
        return;
    }
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
    calculateStats();

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
        guiControls.bitlyString = "Link too long for bit.ly (use full link or save string)";
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
        string += parseInt(ob.set).toString(base);
        string += ob.building.toString(base);
        string += ob.level.toString(base);
        string += ob.age.toString(base);
        string += ob.connected ? "1" : "0";
        string += "ö" + ob.position.x.toString(base).replace("-", "y").replace(".", "w") + "ö" + ob.position.z.toString(base).replace("-", "y").replace(".", "w");
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
        calculateStats();
        dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
        dragControls.addEventListener('dragstart', dragStart);
        dragControls.addEventListener('dragend', dragEnd);
        dragControls.addEventListener('drag', drag);
        return;
    }
    if (string.length < 5) {
        calculateStats();
        dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
        dragControls.addEventListener('dragstart', dragStart);
        dragControls.addEventListener('dragend', dragEnd);
        dragControls.addEventListener('drag', drag);
        return;
    }

    string = string.charAt(0) === "?" ? string.substring(1) : string;
    string = string.substring(0,3) === "64c" ? LZString.decompressFromBase64(string.substring(3)) : string;

    var split = string.includes("ö") ? "ö" : "u"; // To make old saves work
    var strings = string.split("?");
    var bldIndex = 0;

    var buildings = strings[bldIndex].split("z");
    for (var i = 0; i < buildings.length; i++) {
        var bld = buildings[i].split(split);
        var base = 32;
        var set = toDec(bld[0].substring(0, 1), base);
        var building = toDec(bld[0].substring(1, 2), base);
        var level = toDec(bld[0].substring(2, 3), base);
        var age = toDec(bld[0].substring(3, 4), base);
        //console.log(age);
        var connected = bld[0].substring(4, 5) == "1" ? true : false;
        var x = toDec(bld[1], base);
        var z = toDec(bld[2], base);
        addBuilding(set, building, level, age, connected, x, z,false);
    }
    if (strings.length >= 2 && !(strings[0] === "" && strings.length == 2)) {
        var settings = strings[strings.length - 1].split("y");
        guiControls.tempty = toDec(settings[0].split("x")[0]);
        guiControls.troads = toDec(settings[0].split("x")[1]);
        gui.__folders["Full Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[0].setValue(guiControls.tempty);
        gui.__folders["Full Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[1].setValue(guiControls.troads);
        guiControls.stempty = toDec(settings[1].split("x")[0]);
        guiControls.stroads = toDec(settings[1].split("x")[1]);
        gui.__folders["Full Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[0].setValue(guiControls.stempty);
        gui.__folders["Full Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[1].setValue(guiControls.stroads);
    } else {
        guiControls.tempty = 0;
        guiControls.troads = 0;
        gui.__folders["Full Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[0].setValue(guiControls.tempty);
        gui.__folders["Full Production Overview"].__folders["All Sets"].__folders["Per Tile"].__controllers[1].setValue(guiControls.troads);
        guiControls.stempty = 0;
        guiControls.stroads = 0;
        gui.__folders["Full Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[0].setValue(guiControls.stempty);
        gui.__folders["Full Production Overview"].__folders["Per Set"].__folders["Per Tile"].__controllers[1].setValue(guiControls.stroads);
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

// Round to nearest half value https://www.breakingpar.com/bkp/home.nsf/0/87256B280015193F87257124007E0011
function roundToHalf(value) {
    var converted = parseFloat(value); // Make sure we have a number
    var decimal = (converted - parseInt(converted, 10));
    decimal = Math.round(decimal * 10);
    if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
    if ( (decimal < 3) || (decimal > 7) ) {
       return Math.round(converted);
    } else {
       return (parseInt(converted, 10)+0.5);
    }
}


// Add a new building!
function addBuilding(set, building, level, age, connected, x, z,pasted) {
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
    //console.log(x + " " + z)
    x = Math.sign(x)*roundToHalf(Math.abs(x));
    z = Math.sign(z)*roundToHalf(Math.abs(z));
    //console.log(x + " " + z)
    bld.position.set(x, 1, z);
    bld.set = set;
    bld.building = building;
    bld.level = level;
    bld.age = parseInt(age);
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

    return bld.uuid;
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

        var set = sets[setId];
        var age = str.includes("AllAge") ? currentAge : cityBuildings[ids[i]].level-1;
        age = parseInt(age)
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
        //console.log(x,z);
        addBuilding(setId, bld, lvl, age, con, x,z,false)
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
    }else if(str.includes("FallBonus20")){
        return 8;
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
        calculateStats();
    }

    renderer.render(scene, camera)
}

init();

// Easier testing
//loadScene("00191uauy3wgz00191u7uy7wgz041h1u6wguybwgz01120ucwguy2z01120u7wgu3z021g1uewguy5z041h1udwgu4wgz021g0ucwgu3z041h1u6wguy3wgz011g1uewgu6z021g1u5wgu6z00171ufuy2wgz141h1uyiwguyswgz131e1uyguymwgz111e1uygwguypz121h1uy8wguykz101e1uyjuyowgz101e1uybuyowgz141h1uyawguykwgz131e1uy8uymwgz121h1uy8wguypz111e1uyawguymz141h1uy9wguynwgz141h1uyhwguynwgz141h1uyewguynwgz141h1uydwguynwgz141h1uycwguynwgz140h1uyhwguyswgz011e1uewguyaz021e1ucwguydz001e1ucuy4wgz041h1u9wgu1wgz021g1u5wguyaz011g1u5wguy5z001g1ucu5wgz041h1udwguybwgz001g1ufu3wgz001g1u8u5wgz001g1u5u3wgz001g1uau3wgz001g1ueu0wgz121g1uyiwguymz121g1uyiwguyrz201g1uy4uyowgz231h1uy6wguypwgz211g1uy5wguylwgz241g1uy6wguyoz221g1uy3uylwgz040h1u4wguy0wgz041h1udwguy3wgz001g1ucu0wgz041h1u6wgu4wgz040h1u5wguy8wgz001g1uauy0wgz001g1u8u0wgz001g1u6u0wgz001g1u5uy2wgz001g1u8uy4wgz001g1u5uycwgz001g1u8uyawgz041h1uawgu1wgz010g1u7wguydz020g0u7wguy2z040h1uawguy5wgz001h1uauyewgz001h1u4uy7wgz001h1uduy7wgz121h1uydwguypz121h1uydwguymz040h1uawguy9wgz001h1ucuyawgz001h1uauybwgz041h1ufwguy0wgz040h1u8wguyewgz040h1uewguy8wgz001h1ufuycwgz001h1uguy7wgz760h1uy2upwgz750h1u0upwgz750h1u0urwgz780h1uy2wguqwgz780h1u1wguqwgz760h1uy2urwgz760h1u0uqwgz760h1u2urwgz760h1u2upwgz770h1u2wguqwgz770h1uy1wguqwg?0x0y0x0");

//loadScene("850h1ö1ö2z850h1öy8ö3z850h1öybö4z850h1öy8ö5z850h1öybö6z850h1ö0ö7z820h1öyawgö2z820h1öy8wgö7z820h1öy1wgö3z820h1öy1wgö5z820h1ö2wgö4z820h1ö2wgö6z830h1öy9wgö4wgz840h1ö0wgö4wgz830h1ö0wgöy4wgz830h1ö2wgöy4wgz840h1ö1wgöy4wgz810h1ö1wgöy2z820h1ö1wgöy7z850h1ö3ödz850h1öy8öcz850h1öycödz850h1öy8öez850h1öycöfz850h1öy1öez820h1öyawgöbz820h1öy9wgögz820h1öy1wgöcz820h1ö0wgögz820h1ö1wgöbz820h1ö3wgöfz830h1öyawgödwgz840h1ö0wgödwgz830h1ö1wgödwgz840h1öy9wgödwgz830h1ö0wgöy9wgz830h1ö2wgöy9wgz840h1ö1wgöy9wgz810h1ö1wgöycz830h1öybwgöy4wgz830h1öy9wgöy4wgz840h1öyawgöy4wgz810h1öyawgöy2z820h1öyawgöy7z830h1öy6wgöy4wgz830h1öy4wgöy4wgz840h1öy5wgöy4wgz810h1öy5wgöy2z820h1öy3wgöy7z850h1öy6öy7z850h1öy3öy2z840h1öy3wgöy4wgz830h1öy2wgöy4wgz810h1öyawgöycz820h1öy7wgöyhz850h1öy7öycz840h1öybwgöyewgz830h1öy6wgöyewgz803h1öy9öyewgz860h1öyawgöyhz850h1öy4önanz850h1öygöbz850h1öyjöbz850h1öygöfz850h1öyjöfz820h1öyjwgödz820h1öyfwgödz830h1öyhwgöewgz840h1öyhwgöbwgz850h1öbödz850h1ö8ödz820h1ö7wgöbz820h1ö7wgöfz820h1öbwgöbz820h1öbwgöfz840h1ö9wgöbwgz830h1ö9wgöewgz850h1ö3ömz850h1ö0önz850h1ö3ösz850h1ö0örz820h1öy0wgöpz820h1ö3wgöoz830h1ö1wgöqwgz840h1ö1wgönwgz850h1öy8öoz850h1öyböpz820h1öybwgönz820h1öybwgörz820h1öy7wgömz820h1öy7wgösz840h1öy9wgönwgz830h1öy9wgöqwgz850h1öyaölz850h1öyaötz820h1ö0wgölz820h1ö0wgötz850h1öy8öqz820h1ö3wgöq?0x0y0x0");
