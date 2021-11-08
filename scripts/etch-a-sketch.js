const grid = document.querySelector('#grid-container'),
      squares = [];
while(grid.children.length < 256) {
    const square = document.createElement('div');
    square.classList.add('square');
    squares.push(square);
    grid.appendChild(square);
}

squares.forEach(square => square.addEventListener('mouseover', changeColor));

function changeColor(e) {
    e.target.style.backgroundColor = 'purple';
}