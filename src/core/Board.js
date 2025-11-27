export class Board {
  constructor() {
    this.grid = this.createEmptyGrid()
  }

  createEmptyGrid() {
    const grid = []
    for (let row = 1; row <= 10; row++) {
      grid[row] = []
      for (let col = 1; col <= 9; col++) {
        grid[row][col] = null
      }
    }
    return grid
  }

  getPieceAt(row, col) {
    return this.grid[row] && this.grid[row][col]
  }

  setPieceAt(row, col, piece) {
    if (this.grid[row]) {
      this.grid[row][col] = piece
    }
  }

  removePieceAt(row, col) {
    if (this.grid[row]) {
      this.grid[row][col] = null
    }
  }

  isEmpty() {
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 9; col++) {
        if (this.grid[row][col] !== null) {
          return false
        }
      }
    }
    return true
  }
}
