function initializeListeners() {
    document.querySelectorAll('.tool')
        .forEach(tool => tool.addEventListener('click', changeTool));
    document.querySelector('#clear-grid').addEventListener('click', clearGrid);
    document.querySelector('#grid-size').addEventListener('input', changeMatchingGridSize);
    document.querySelector('#change-grid').addEventListener('click', changeGrid);
}
initializeListeners();

function initializePenColorOptions() {
    ['Black', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Brown', 'Gray', 'Rainbow']
    .forEach(color => {
        const colorOption = document.createElement('option');
        colorOption.textContent = color;
        colorOption.value = color.toLowerCase();
        document.querySelector('#pen-color').appendChild(colorOption);
    })
}
initializePenColorOptions();

function setGrid(numOfSquares) {
    const grid = document.querySelector('#grid-container'),
          gridSize = `repeat(${numOfSquares}, ${600/numOfSquares}px)`;

    grid.style.gridTemplate = `${gridSize} / ${gridSize}`;

    const squares = [];
    while(squares.length < numOfSquares * numOfSquares) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mouseover', changeColor);
        squares.push(square);
    }
    grid.replaceChildren(...squares);
}
setGrid(50);

function changeTool(e) {
    const selectedTool = e.target.id;
    document.querySelectorAll('.tool')
            .forEach(tool => {
                if(tool.id == selectedTool) tool.classList.add('selected');
                else tool.classList.remove('selected');
            })
    
    adjustPenColorSettings();
}

function adjustPenColorSettings() {
    const penColorSettings = document.querySelector('.pen-color'),
          selectedTool = document.querySelector('.selected.tool').id;
    if (selectedTool == 'pen') penColorSettings.classList.remove('hidden');
    else penColorSettings.classList.add('hidden');
}

function clearGrid() {
    document.querySelectorAll('.square')
        .forEach(square => square.style.backgroundColor = 'white');
}

function changeMatchingGridSize() {
    document.querySelector('#matching-grid-size').textContent = 
    document.querySelector('#grid-size').value;
}

function changeGrid() {
    const numOfSquares = document.querySelector('#grid-size').value,
          errorMessage = document.querySelector('#grid-size-error-message'),
          sameNum = numOfSquares * numOfSquares ==
                    document.querySelector('#grid-container').children.length;

    if(!numOfSquares || sameNum) return;
    if(numOfSquares < 1 || numOfSquares > 100) {
        errorMessage.classList.remove('no-display');
        return;
    }

    errorMessage.classList.add('no-display');
    setGrid(numOfSquares);
} 

function changeColor(e) {
    const selectedTool = document.querySelector('.selected.tool').id,
          toolColor = 
            selectedTool == 'pen' ? document.querySelector('#pen-color').value
          : selectedTool == 'pencil' ? darkenBy10Percent(e.target.style.backgroundColor)
          : selectedTool == 'eraser' ? 'white'
          : 'black';

    e.target.style.backgroundColor = 
        toolColor == 'rainbow' ? getRandomColor() : toolColor;
}

function getRandomColor() {
    const rgb = [];
    for(let i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 256));
    return `rgb(${rgb.join(',')})`;
}

function darkenBy10Percent(color) {
    let rgbNum = color.includes('rgb') ? 
        +color.substring(color.indexOf('(') + 1, color.indexOf(',')) : 255;
    rgbNum -= 25.5;
    const rgb = [...new Array(3)].fill(rgbNum);
    return `rgb(${rgb.join(',')})`;
}