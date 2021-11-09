function initializeButtons() {
    document.querySelector('#reset-grid').addEventListener('click', resetGrid);
}
initializeButtons();

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
setGrid(16);

function resetGrid() {
    document.querySelectorAll('.square')
            .forEach(square => square.style.backgroundColor = 'white');
}

function changeColor(e) {
    e.target.style.backgroundColor = 'purple';
}