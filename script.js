const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "black";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const blackBtn = document.getElementById("blackBtn");
const colorBtn = document.getElementById("colorBtn");
const grayscaleBtn = document.getElementById("grayscaleBtn");
const resetBtn = document.getElementById("resetBtn");
const rangeValue = document.getElementById("grid-value");
const rangeSlider = document.getElementById("grid-size");
const grid = document.getElementById("grid");

blackBtn.onclick = () => setCurrentMode("black");
colorBtn.onclick = () => setCurrentMode("color");
grayscaleBtn.onclick = () => setCurrentMode("grayscale");
resetBtn.onclick = () => reloadGrid();
rangeSlider.onmousemove = (e) => updateRangeValue(e.target.value);
rangeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
  setCurrentSize(value);
  updateRangeValue(value);
  reloadGrid();
}

function updateRangeValue(value) {
  rangeValue.innerHTML = `${value} x ${value}`;
}

function reloadGrid() {
  resetGrid();
  setupGrid(currentSize);
}

function resetGrid() {
  grid.innerHTML = "";
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "color") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "black") {
    e.target.style.backgroundColor = currentColor;
  }
}

function activateButton(newMode) {
  if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "black") {
    blackBtn.classList.remove("active");
  }

  if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "black") {
    blackBtn.classList.add("active");
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
