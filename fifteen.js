"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const puzzleContainer = document.getElementById("puzzle");
    const shuffleButton = document.getElementById("shuffle-button");
    const gridSize = 4; // Grid size (4x4)
    const tileSize = 100; // Tile size in pixels
    let emptyRow = 3; // Initial position of the empty space
    let emptyCol = 3;

    // Generate tiles and append them to the puzzle container
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (row === gridSize - 1 && col === gridSize - 1) continue; // Skip the last tile (empty space)
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = row * gridSize + col + 1; // Tile number
            tile.style.left = `${col * tileSize}px`;
            tile.style.top = `${row * tileSize}px`;
            tile.id = `tile_${row}_${col}`;
            tile.addEventListener("click", moveTile); // Add click event listener to the tile
            puzzleContainer.appendChild(tile);
        }
    }

    // Function to handle tile movement
    function moveTile() {
        const [row, col] = this.id.split('_').slice(1).map(Number);
        if (isMovable(row, col)) {
            move(row, col);
        }
    }

    // Check if a tile can be moved (is next to the empty space)
    function isMovable(row, col) {
        return (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1);
    }

    // Move the tile to the empty space
    function move(row, col) {
        const tile = document.getElementById(`tile_${row}_${col}`);
        tile.style.left = `${emptyCol * tileSize}px`;
        tile.style.top = `${emptyRow * tileSize}px`;
        tile.id = `tile_${emptyRow}_${emptyCol}`;
        emptyRow = row;
        emptyCol = col;
        updateMovableTiles();
    }

    // Shuffle the tiles by making random valid moves
    function shuffle() {
        for (let i = 0; i < 1000; i++) {
            const neighbors = getMovableNeighbors();
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            move(randomNeighbor[0], randomNeighbor[1]);
        }
    }

    // Get a list of tiles that can be moved
    function getMovableNeighbors() {
        const neighbors = [];
        if (emptyRow > 0) neighbors.push([emptyRow - 1, emptyCol]);
        if (emptyRow < gridSize - 1) neighbors.push([emptyRow + 1, emptyCol]);
        if (emptyCol > 0) neighbors.push([emptyRow, emptyCol - 1]);
        if (emptyCol < gridSize - 1) neighbors.push([emptyRow, emptyCol + 1]);
        return neighbors;
    }

    // Update the appearance of movable tiles
    function updateMovableTiles() {
        document.querySelectorAll(".tile").forEach(tile => {
            const [row, col] = tile.id.split('_').slice(1).map(Number);
            if (isMovable(row, col)) {
                tile.classList.add("movable");
            } else {
                tile.classList.remove("movable");
            }
        });
    }

    // Add event listener to the shuffle button
    shuffleButton.addEventListener("click", shuffle);

    // Initial update to set the movable tiles
    updateMovableTiles();
});

