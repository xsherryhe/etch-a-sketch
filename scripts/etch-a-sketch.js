function initializeListeners() {
    document.querySelector('#clear-grid').addEventListener('click', clearGrid);
    document.querySelector('#change-grid').addEventListener('click', changeGrid);
}
initializeListeners();

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
    e.target.style.backgroundColor = 'purple';
}