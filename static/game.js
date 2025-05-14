const rows = 10;
const cols = 10;
const mines = 10;
let board = [];
let mineSet = new Set();

function initBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.style.gridTemplateColumns = `repeat(${cols}, 30px)`;
    board = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", onClick);
            boardDiv.appendChild(cell);
            row.push(cell);
        }
        board.push(row);
    }

    placeMines();
}

function placeMines() {
    mineSet.clear();
    while (mineSet.size < mines) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        mineSet.add(`${r},${c}`);
    }
}

function onClick(e) {
    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);
    const key = `${r},${c}`;

    if (mineSet.has(key)) {
        e.target.style.backgroundColor = "red";
        alert("Бум! Ты проиграл.");
        revealAll();
    } else {
        revealCell(r, c);
    }
}

function revealCell(r, c) {
    const cell = board[r][c];
    if (cell.classList.contains("revealed")) return;
    cell.classList.add("revealed");

    let count = 0;
    for (let i = r - 1; i <= r + 1; i++) {
        for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
                if (mineSet.has(`${i},${j}`)) {
                    count++;
                }
            }
        }
    }

    if (count > 0) {
        cell.textContent = count;
    } else {
        for (let i = r - 1; i <= r + 1; i++) {
            for (let j = c - 1; j <= c + 1; j++) {
                if (i >= 0 && i < rows && j >= 0 && j < cols) {
                    revealCell(i, j);
                }
            }
        }
    }
}

function revealAll() {
    for (let cell of document.querySelectorAll(".cell")) {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        const key = `${r},${c}`;
        if (mineSet.has(key)) {
            cell.style.backgroundColor = "red";
        }
    }
}

initBoard();
