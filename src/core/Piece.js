export class Piece {
  constructor(color, row, col) {
    this.color = color // 'Red' or 'Black'
    this.row = row
    this.col = col
  }

  getSymbol() {
    return '?'
  }

  canMove(toRow, toCol, board) {
    return false
  }
}

export class General extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '帥' : '將'
  }

  isInPalace(row, col) {
    const isRedPalace = row >= 1 && row <= 3 && col >= 4 && col <= 6
    const isBlackPalace = row >= 8 && row <= 10 && col >= 4 && col <= 6
    return this.color === 'Red' ? isRedPalace : isBlackPalace
  }

  wouldFaceOpponentGeneral(toRow, toCol, board) {
    // Find opponent's general on the same column
    for (let row = 1; row <= 10; row++) {
      const piece = board.getPieceAt(row, toCol)
      if (piece && piece.constructor.name === 'General' && piece.color !== this.color) {
        // Check if there are any pieces between this position and opponent's general
        const minRow = Math.min(toRow, row)
        const maxRow = Math.max(toRow, row)

        for (let r = minRow + 1; r < maxRow; r++) {
          if (board.getPieceAt(r, toCol)) {
            return false // Has piece between, won't face each other
          }
        }

        return true // Would face each other
      }
    }
    return false
  }

  canMove(toRow, toCol, board) {
    // Check if within palace boundaries
    if (!this.isInPalace(toRow, toCol)) {
      return false
    }

    // Check if moving exactly one step (orthogonal only)
    const rowDiff = Math.abs(toRow - this.row)
    const colDiff = Math.abs(toCol - this.col)

    if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
      return false
    }

    // Check "flying generals" rule - generals cannot face each other
    const targetPiece = board.getPieceAt(toRow, toCol)
    if (targetPiece && targetPiece.constructor.name === 'General') {
      return false
    }

    // Check if moving to same column would cause generals to face each other
    if (this.wouldFaceOpponentGeneral(toRow, toCol, board)) {
      return false
    }

    return true
  }
}

export class Guard extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '仕' : '士'
  }

  isInPalace(row, col) {
    const isRedPalace = row >= 1 && row <= 3 && col >= 4 && col <= 6
    const isBlackPalace = row >= 8 && row <= 10 && col >= 4 && col <= 6
    return this.color === 'Red' ? isRedPalace : isBlackPalace
  }

  canMove(toRow, toCol, board) {
    // Check if within palace boundaries
    if (!this.isInPalace(toRow, toCol)) {
      return false
    }

    // Check if moving exactly one step diagonally
    const rowDiff = Math.abs(toRow - this.row)
    const colDiff = Math.abs(toCol - this.col)

    if (rowDiff !== 1 || colDiff !== 1) {
      return false
    }

    return true
  }
}

export class Rook extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '俥' : '車'
  }

  canMove(toRow, toCol, board) {
    // Must move in straight line (same row OR same column)
    if (this.row !== toRow && this.col !== toCol) {
      return false
    }

    // Check if path is clear (no jumping over pieces)
    if (this.row === toRow) {
      // Moving horizontally
      const minCol = Math.min(this.col, toCol)
      const maxCol = Math.max(this.col, toCol)

      for (let col = minCol + 1; col < maxCol; col++) {
        if (board.getPieceAt(toRow, col)) {
          return false
        }
      }
    } else {
      // Moving vertically
      const minRow = Math.min(this.row, toRow)
      const maxRow = Math.max(this.row, toRow)

      for (let row = minRow + 1; row < maxRow; row++) {
        if (board.getPieceAt(row, toCol)) {
          return false
        }
      }
    }

    return true
  }
}

export class Horse extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '傌' : '馬'
  }

  canMove(toRow, toCol, board) {
    const rowDiff = Math.abs(toRow - this.row)
    const colDiff = Math.abs(toCol - this.col)

    // Must move in "L" shape: 2 steps in one direction, 1 step perpendicular
    const isLShape = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)

    if (!isLShape) {
      return false
    }

    // Check if "leg" is blocked (the first step in the longer direction)
    let blockRow, blockCol

    if (rowDiff === 2) {
      // Moving 2 rows, 1 col - check the adjacent row
      blockRow = this.row + (toRow > this.row ? 1 : -1)
      blockCol = this.col
    } else {
      // Moving 1 row, 2 cols - check the adjacent col
      blockRow = this.row
      blockCol = this.col + (toCol > this.col ? 1 : -1)
    }

    if (board.getPieceAt(blockRow, blockCol)) {
      return false // Leg is blocked
    }

    return true
  }
}

export class Cannon extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '炮' : '砲'
  }

  canMove(toRow, toCol, board) {
    // Must move in straight line (same row OR same column)
    if (this.row !== toRow && this.col !== toCol) {
      return false
    }

    // Count pieces between current position and target
    let piecesBetween = 0

    if (this.row === toRow) {
      // Moving horizontally
      const minCol = Math.min(this.col, toCol)
      const maxCol = Math.max(this.col, toCol)

      for (let col = minCol + 1; col < maxCol; col++) {
        if (board.getPieceAt(toRow, col)) {
          piecesBetween++
        }
      }
    } else {
      // Moving vertically
      const minRow = Math.min(this.row, toRow)
      const maxRow = Math.max(this.row, toRow)

      for (let row = minRow + 1; row < maxRow; row++) {
        if (board.getPieceAt(row, toCol)) {
          piecesBetween++
        }
      }
    }

    const targetPiece = board.getPieceAt(toRow, toCol)

    if (targetPiece) {
      // To capture, must jump exactly one piece (screen)
      return piecesBetween === 1
    } else {
      // To move without capturing, path must be clear
      return piecesBetween === 0
    }
  }
}

export class Elephant extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '相' : '象'
  }

  canMove(toRow, toCol, board) {
    // Must move exactly 2 steps diagonally
    const rowDiff = Math.abs(toRow - this.row)
    const colDiff = Math.abs(toCol - this.col)

    if (rowDiff !== 2 || colDiff !== 2) {
      return false
    }

    // Check if crosses the river
    // Red pieces: row 1-5, Black pieces: row 6-10
    if (this.color === 'Red' && toRow > 5) {
      return false
    }
    if (this.color === 'Black' && toRow < 6) {
      return false
    }

    // Check if midpoint is blocked
    const midRow = (this.row + toRow) / 2
    const midCol = (this.col + toCol) / 2

    if (board.getPieceAt(midRow, midCol)) {
      return false
    }

    return true
  }
}

export class Soldier extends Piece {
  getSymbol() {
    return this.color === 'Red' ? '兵' : '卒'
  }

  hasCrossedRiver() {
    // Red soldiers cross river at row 6+, Black soldiers at row 5-
    return this.color === 'Red' ? this.row >= 6 : this.row <= 5
  }

  canMove(toRow, toCol, board) {
    const rowDiff = toRow - this.row
    const colDiff = toCol - this.col

    // Must move exactly one step
    if (Math.abs(rowDiff) + Math.abs(colDiff) !== 1) {
      return false
    }

    // Cannot move backward
    if (this.color === 'Red' && rowDiff < 0) {
      return false
    }
    if (this.color === 'Black' && rowDiff > 0) {
      return false
    }

    // Before crossing river, can only move forward
    if (!this.hasCrossedRiver() && colDiff !== 0) {
      return false
    }

    return true
  }
}
