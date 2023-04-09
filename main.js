
let grid = document.getElementById('main-grid');
let rows;
let colls;
let isDragging = false;
grid.style.margin = '0px';

for(let i = 0; i < 16; i++){

  rows = document.createElement('div');
  
  for(let j = 0; j < 16; j++){

    colls = document.createElement('div');
    colls.classList.add('cell');
    colls.style.height = '50px';
    colls.style.width = '50px';
    colls.style.margin = '0px';
    colls.style.backgroundColor = 'white';
    colls.classList.add('eachCell');

    colls.addEventListener('mousedown', handleMouseDown);
    colls.addEventListener('mousemove', setColor);

    rows.append(colls);
  }

  rows.style.display = 'flex';
  grid.append(rows);
}

let allCells = document.querySelectorAll('.eachCell');

function setColor(event) {
  if(isDragging) {
    event.target.style.backgroundColor = 'red';
  }
}

function handleMouseDown(event) {
  event.target.style.backgroundColor = 'red';
  isDragging = true;
  document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseUp(event) {
  isDragging = false;
  document.removeEventListener('mouseup', handleMouseUp);
}

//creating buttons
let clear = document.createElement('button');
let buttons = document.getElementById('buttons');
clear.style.scale = 3;
clear.textContent = 'Clear';
clear.addEventListener('click', reset);

function reset(){
  
    allCells.forEach((e) => {e.style.backgroundColor = 'white'});
    
}

let eraser = document.createElement('button');
eraser.style.scale = 3;
eraser.textContent = 'Eraser';

let rainbow = document.createElement('button');
rainbow.style.scale = 3;
rainbow.textContent = 'Rainbow';


buttons.append(clear);
buttons.append(eraser);
buttons.append(rainbow);
buttons.style.display = 'flex';
buttons.style.justifyContent = 'center';
buttons.style.height = '85vh';
buttons.style.alignItems = 'flex-end';