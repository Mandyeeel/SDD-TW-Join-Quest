import { Board } from './Board.js'
import { General, Guard, Rook, Horse, Cannon, Elephant, Soldier } from './Piece.js'

export class Game {
  constructor(initializePieces = true) {
    this.board = new Board()
    this.currentPlayer = 'Red'
    this.gameOver = false
    this.winner = null
    if (initializePieces) {
      this.initializeBoard()
    }
  }

  initializeBoard() {
    // Red pieces (rows 1-3)
    // Row 1: Rook, Horse, Elephant, Guard, General, Guard, Elephant, Horse, Rook
    this.board.setPieceAt(1, 1, new Rook('Red', 1, 1))
    this.board.setPieceAt(1, 2, new Horse('Red', 1, 2))
    this.board.setPieceAt(1, 3, new Elephant('Red', 1, 3))
    this.board.setPieceAt(1, 4, new Guard('Red', 1, 4))
    this.board.setPieceAt(1, 5, new General('Red', 1, 5))
    this.board.setPieceAt(1, 6, new Guard('Red', 1, 6))
    this.board.setPieceAt(1, 7, new Elephant('Red', 1, 7))
    this.board.setPieceAt(1, 8, new Horse('Red', 1, 8))
    this.board.setPieceAt(1, 9, new Rook('Red', 1, 9))

    // Row 3: Cannons
    this.board.setPieceAt(3, 2, new Cannon('Red', 3, 2))
    this.board.setPieceAt(3, 8, new Cannon('Red', 3, 8))

    // Row 4: Soldiers
    this.board.setPieceAt(4, 1, new Soldier('Red', 4, 1))
    this.board.setPieceAt(4, 3, new Soldier('Red', 4, 3))
    this.board.setPieceAt(4, 5, new Soldier('Red', 4, 5))
    this.board.setPieceAt(4, 7, new Soldier('Red', 4, 7))
    this.board.setPieceAt(4, 9, new Soldier('Red', 4, 9))

    // Black pieces (rows 8-10)
    // Row 10: Rook, Horse, Elephant, Guard, General, Guard, Elephant, Horse, Rook
    this.board.setPieceAt(10, 1, new Rook('Black', 10, 1))
    this.board.setPieceAt(10, 2, new Horse('Black', 10, 2))
    this.board.setPieceAt(10, 3, new Elephant('Black', 10, 3))
    this.board.setPieceAt(10, 4, new Guard('Black', 10, 4))
    this.board.setPieceAt(10, 5, new General('Black', 10, 5))
    this.board.setPieceAt(10, 6, new Guard('Black', 10, 6))
    this.board.setPieceAt(10, 7, new Elephant('Black', 10, 7))
    this.board.setPieceAt(10, 8, new Horse('Black', 10, 8))
    this.board.setPieceAt(10, 9, new Rook('Black', 10, 9))

    // Row 8: Cannons
    this.board.setPieceAt(8, 2, new Cannon('Black', 8, 2))
    this.board.setPieceAt(8, 8, new Cannon('Black', 8, 8))

    // Row 7: Soldiers
    this.board.setPieceAt(7, 1, new Soldier('Black', 7, 1))
    this.board.setPieceAt(7, 3, new Soldier('Black', 7, 3))
    this.board.setPieceAt(7, 5, new Soldier('Black', 7, 5))
    this.board.setPieceAt(7, 7, new Soldier('Black', 7, 7))
    this.board.setPieceAt(7, 9, new Soldier('Black', 7, 9))
  }

  move(fromRow, fromCol, toRow, toCol) {
    const piece = this.board.getPieceAt(fromRow, fromCol)

    if (!piece) {
      return false
    }

    // Check if the piece can move to the target position
    if (!piece.canMove(toRow, toCol, this.board)) {
      return false
    }

    // Check if target position has same color piece
    const targetPiece = this.board.getPieceAt(toRow, toCol)
    if (targetPiece && targetPiece.color === piece.color) {
      return false
    }

    // Execute the move
    this.board.removePieceAt(fromRow, fromCol)
    piece.row = toRow
    piece.col = toCol
    this.board.setPieceAt(toRow, toCol, piece)

    // Check if captured opponent's General
    if (targetPiece && targetPiece.constructor.name === 'General') {
      this.gameOver = true
      this.winner = piece.color
    }

    return true
  }

  isGameOver() {
    return this.gameOver
  }

  getWinner() {
    return this.winner
  }
}
