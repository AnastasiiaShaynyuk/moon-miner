let cheese = 0;

let clickUpgrades = [
  {
    name: "knife",
    price: 50,
    quantity: 0,
    multiplier: 1,
  },
  {
    name: "drill",
    price: 250,
    quantity: 0,
    multiplier: 5,
  },
];

let automaticUpgrades = [
  {
    name: "mousetronaut",
    price: 1000,
    quantity: 0,
    multiplier: 10,
  },
  {
    name: "space station",
    price: 50000,
    quantity: 0,
    multiplier: 100,
  },
];

// NOTE adds cheese when clicking on it
function mine() {
  totalClicks();
  update();
}

// NOTE clicked updates here
function addedClickUpgrades() {
  let addClickUpgrade = 1;
  for (let i = 0; i < clickUpgrades.length; i++) {
    let upgrade = clickUpgrades[i];
    addClickUpgrade += upgrade.quantity * upgrade.multiplier;
  }
  cheese += addClickUpgrade;
  update();
  return addClickUpgrade;
}

// NOTE auto updates here
function addedAutoUpgrades() {
  let addAutoUpgrade = 0;
  for (let i = 0; i < automaticUpgrades.length; i++) {
    let upgrade = automaticUpgrades[i];
    addAutoUpgrade += upgrade.quantity * upgrade.multiplier;
  }
  cheese += addAutoUpgrade;
  update();
  return addAutoUpgrade;
}

// NOTE timer
setInterval(function () {
  addedAutoUpgrades();
}, 3000);

// NOTE shows player how much cheese he has
function update() {
  let cheeseAmount = document.getElementById("cheese-amount");
  cheeseAmount.innerText = cheese.toLocaleString();
  drawQuantity();
}

// NOTE clicks per click
function totalClicks() {
  let clickUpgradeClicks = addedClickUpgrades();
  // cheese == clickUpgradeClicks + autoUpgradeClicks;

  let totalClicks = document.getElementById("total-cheese");
  totalClicks.innerText = "" + clickUpgradeClicks;
}

function totalAutoClicks() {
  let autoUpgradeClicks = addedAutoUpgrades();
  // cheese == clickUpgradeClicks + autoUpgradeClicks;

  let totalClicks = document.getElementById("total-cheese-timer");
  totalClicks.innerText = autoUpgradeClicks.toString();
}

// NOTE shows how many of knives and drills you have
function drawQuantity() {
  let knifeStats = document.getElementById("knives");
  knifeStats.innerText = clickUpgrades[0].quantity.toString();

  let drillStats = document.getElementById("drills");
  drillStats.innerText = clickUpgrades[1].quantity.toString();

  let knifeBtn = document.querySelector("#btn-knife");
  let knifePrice = clickUpgrades[0].price;
  knifeBtn.querySelector("span").innerText = knifePrice.toString();

  let drillBtn = document.querySelector("#btn-drill");
  let drillPrice = clickUpgrades[1].price;
  drillBtn.querySelector("span").innerText = drillPrice.toString();

  let totalKnives = document.getElementById("total-knives");
  totalKnives.innerText = (
    clickUpgrades[0].quantity * clickUpgrades[0].multiplier
  ).toString();

  let totalDrills = document.getElementById("total-drills");
  totalDrills.innerText = (
    clickUpgrades[1].quantity * clickUpgrades[1].multiplier
  ).toString();
  drawAutoUpgradesQuantity();
}

// NOTE shows how many of mousetronaut and space stations you have
function drawAutoUpgradesQuantity() {
  let mousetronautStats = document.getElementById("mouse");
  mousetronautStats.innerText = automaticUpgrades[0].quantity.toString();

  let spaceStationStats = document.getElementById("space-station");
  spaceStationStats.innerText = automaticUpgrades[1].quantity.toString();

  let mouseBtn = document.querySelector("#btn-mouse");
  let mousePrice = automaticUpgrades[0].price;
  mouseBtn.querySelector("span").innerText = mousePrice.toLocaleString();

  let spaceStationBtn = document.querySelector("#btn-station");
  let spaceStationPrice = automaticUpgrades[1].price;
  spaceStationBtn.querySelector("span").innerText =
    spaceStationPrice.toLocaleString();

  let totalMice = document.getElementById("total-mice");
  totalMice.innerText = (
    automaticUpgrades[0].quantity * automaticUpgrades[0].multiplier
  ).toString();

  let totalSpaceStations = document.getElementById("total-stations");
  totalSpaceStations.innerText = (
    automaticUpgrades[1].quantity * automaticUpgrades[1].multiplier
  ).toString();
}

// NOTE here you buy knives and drills
function buyUpdates(name) {
  let priceClickUpdates = clickUpgrades.find((buy) => buy.name == name);
  if (cheese >= priceClickUpdates.price) {
    priceClickUpdates.quantity++;
    cheese -= priceClickUpdates.price;
    priceClickUpdates.price = Math.round(priceClickUpdates.price * 2);
    if (name == "knife") {
      priceClickUpdates.multiplier = 1;
    } else if (name == "drill") {
      priceClickUpdates.multiplier = 5;
    }
    drawQuantity();
  } else {
    window.alert("not enough 🧀!");
    return;
  }
  totalClicks();
  update();
}

// NOTE auto upgrades
function buyAutoUpgrades(name) {
  let priceAutoUpgrades = automaticUpgrades.find((p) => p.name == name);
  if (cheese >= priceAutoUpgrades.price) {
    priceAutoUpgrades.quantity++;
    cheese -= priceAutoUpgrades.price;
    priceAutoUpgrades.price = Math.round(priceAutoUpgrades.price * 2);
    if (name == "mousetronaut") {
      priceAutoUpgrades.multiplier = 10;
    } else if (name == "space station") {
      priceAutoUpgrades.multiplier = 100;
    }
    drawAutoUpgradesQuantity();
  } else {
    window.alert("not enough 🧀!");
    return;
  }
  totalAutoClicks();
  update();
}
