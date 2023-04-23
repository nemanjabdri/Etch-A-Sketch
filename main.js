const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color'

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
  activateButton(newMode);
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const rainbow = document.getElementById('rainbow');
const colorPicker = document.getElementById('colorPicker');
const slider = document.getElementById("mySlider");
const grid = document.getElementById('main-grid');

//actions
colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorPicker.onclick = (e) => setCurrentMode('color')
rainbow.onclick = () => setCurrentMode('rainbow')
eraser.onclick = () => setCurrentMode('eraser')
clear.onclick = () => reloadGrid()
slider.onmousemove = (e) => updateSizeValue(e.target.value)
slider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

let rows;
let colls;
let isDragging = false;
let isEraserActive = false;

    function createGrid(size){

        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

          for(let i = 0; i < size * size; i++){
            const gridElement = document.createElement('div')
            gridElement.classList.add('grid-element')
            gridElement.addEventListener('mouseover', changeColor)
            gridElement.addEventListener('mousedown', changeColor)
            grid.appendChild(gridElement)
          }
    }

    function changeColor(e) {
      if (e.type === 'mouseover' && !mouseDown) return
      if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
      } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#ffffff';
      } else if(currentMode === 'color'){ //color mode
        e.target.style.backgroundColor = currentColor
      }
    }

let sliderText = document.getElementById("sizeValue");
let colorPickerText = document.getElementById("colorPickerText");


function updateSizeValue(value) {
  sliderText.textContent = `${slider.value} x ${slider.value}`;
}

function reloadGrid() {
  clearGrid()
  createGrid(currentSize)
}

function clearGrid() {
  grid.innerHTML = ''
}

function activateButton(newMode) {
  if (currentMode === 'rainbow') {
    rainbow.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraser.classList.remove('active')
  }

  if (newMode === 'rainbow') {
    rainbow.classList.add('active')
  } else if (newMode === 'eraser') {
    eraser.classList.add('active')
  }
}

window.onload = () => {
  createGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}