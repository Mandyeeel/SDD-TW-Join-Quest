import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { Game } from '../../src/core/Game.js'
import { General, Guard, Rook, Horse, Cannon, Elephant, Soldier } from '../../src/core/Piece.js'

let game
let moveResult

// Given steps
Given('the board is empty except for a Red General at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const general = new General('Red', row, col)
  game.board.setPieceAt(row, col, general)
})

Given('the board is empty except for a Red Guard at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const guard = new Guard('Red', row, col)
  game.board.setPieceAt(row, col, guard)
})

Given('the board is empty except for a Red Rook at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const rook = new Rook('Red', row, col)
  game.board.setPieceAt(row, col, rook)
})

Given('the board is empty except for a Red Horse at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const horse = new Horse('Red', row, col)
  game.board.setPieceAt(row, col, horse)
})

Given('the board is empty except for a Red Cannon at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const cannon = new Cannon('Red', row, col)
  game.board.setPieceAt(row, col, cannon)
})

Given('the board is empty except for a Red Elephant at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const elephant = new Elephant('Red', row, col)
  game.board.setPieceAt(row, col, elephant)
})

Given('the board is empty except for a Red Soldier at \\({int}, {int}\\)', function (row, col) {
  game = new Game(false)
  const soldier = new Soldier('Red', row, col)
  game.board.setPieceAt(row, col, soldier)
})

Given('the board has:', function (dataTable) {
  game = new Game(false)
  const rows = dataTable.rawTable.slice(1) // Skip header row

  rows.forEach(([pieceStr, positionStr]) => {
    const [color, pieceType] = pieceStr.trim().split(' ')
    const match = positionStr.match(/\((\d+),\s*(\d+)\)/)
    const row = parseInt(match[1])
    const col = parseInt(match[2])

    let piece
    switch (pieceType) {
      case 'General':
        piece = new General(color, row, col)
        break
      case 'Guard':
        piece = new Guard(color, row, col)
        break
      case 'Rook':
        piece = new Rook(color, row, col)
        break
      case 'Horse':
        piece = new Horse(color, row, col)
        break
      case 'Cannon':
        piece = new Cannon(color, row, col)
        break
      case 'Elephant':
        piece = new Elephant(color, row, col)
        break
      case 'Soldier':
        piece = new Soldier(color, row, col)
        break
    }

    if (piece) {
      game.board.setPieceAt(row, col, piece)
    }
  })
})

// When steps
When('Red moves the {word} from \\({int}, {int}\\) to \\({int}, {int}\\)', function (pieceType, fromRow, fromCol, toRow, toCol) {
  moveResult = game.move(fromRow, fromCol, toRow, toCol)
})

// Then steps
Then('the move is legal', function () {
  expect(moveResult).to.equal(true)
})

Then('the move is illegal', function () {
  expect(moveResult).to.equal(false)
})

Then('Red wins immediately', function () {
  expect(moveResult).to.equal(true)
  expect(game.isGameOver()).to.equal(true)
  expect(game.getWinner()).to.equal('Red')
})

Then('the game is not over just from that capture', function () {
  expect(moveResult).to.equal(true)
  expect(game.isGameOver()).to.equal(false)
})
