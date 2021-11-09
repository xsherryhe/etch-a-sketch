function initializeListeners() {
    document.querySelector('#clear-grid').addEventListener('click', clearGrid);
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
setGrid(51);

function clearGrid() {
    document.querySelectorAll('.square')
            .forEach(square => square.style.backgroundColor = 'white');
}

function changeGrid() {
    const numOfSquares = 101 - document.querySelector('#pen-size').value,
          errorMessage = document.querySelector('#pen-size-error-message'),
          sameNum = numOfSquares * numOfSquares == 
                    document.querySelector('#grid-container').children.length;

    if(!numOfSquares || sameNum) return;
    if(numOfSquares < 1 || numOfSquares > 100) {
        errorMessage.textContent = 'Please select a pen size between 1 and 100.';
        return;
    }

    errorMessage.textContent = '';
    setGrid(numOfSquares);
} 

function changeColor(e) {
    const penColor = document.querySelector('#pen-color').value;
    e.target.style.backgroundColor = 
        penColor == 'rainbow' ? getRandomColor() : penColor;
}

function getRandomColor() {
    const rgb = [];
    for(let i = 0; i < 3; i++)
        rgb.push(Math.floor(Math.random() * 256));
    return `rgb(${rgb.join(',')})`;
}s