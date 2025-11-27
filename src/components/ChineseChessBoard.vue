<template>
  <div class="chess-board">
    <div class="game-status">
      <div class="current-player">
        <span class="label">當前玩家:</span>
        <span :class="['player-indicator', props.game.currentPlayer.toLowerCase()]">
          {{ props.game.currentPlayer === 'Red' ? '紅方' : '黑方' }}
        </span>
      </div>
      <div v-if="props.game.isGameOver()" class="game-over">
        <span class="winner">🎉 {{ props.game.getWinner() === 'Red' ? '紅方' : '黑方' }} 勝利!</span>
      </div>
      <button v-if="props.game.isGameOver()" @click="resetGame" class="reset-btn">重新開始</button>
    </div>

    <div class="board-container">
      <div v-for="row in 10" :key="row" class="board-row">
        <div
          v-for="col in 9"
          :key="col"
          class="board-cell"
          :class="{
            'palace': isPalace(row, col),
            'river': isRiver(row),
            'selected': isSelected(row, col),
            'valid-move': isValidMove(row, col)
          }"
          @click="handleCellClick(row, col)"
        >
          <div v-if="getPieceAt(row, col)" class="piece" :class="getPieceClass(row, col)">
            {{ getPieceSymbol(row, col) }}
          </div>
          <div v-if="isValidMove(row, col)" class="move-indicator"></div>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const selectedPiece = ref(null)
const validMoves = ref([])
const errorMessage = ref('')

const isPalace = (row, col) => {
  return (row >= 1 && row <= 3 && col >= 4 && col <= 6) ||
         (row >= 8 && row <= 10 && col >= 4 && col <= 6)
}

const isRiver = (row) => {
  return row === 5 || row === 6
}

const getPieceAt = (row, col) => {
  return props.game.board.getPieceAt(row, col)
}

const getPieceClass = (row, col) => {
  const piece = getPieceAt(row, col)
  return piece ? piece.color.toLowerCase() : ''
}

const getPieceSymbol = (row, col) => {
  const piece = getPieceAt(row, col)
  return piece ? piece.getSymbol() : ''
}

const isSelected = (row, col) => {
  return selectedPiece.value &&
         selectedPiece.value.row === row &&
         selectedPiece.value.col === col
}

const isValidMove = (row, col) => {
  return validMoves.value.some(move => move.row === row && move.col === col)
}

const calculateValidMoves = (piece, fromRow, fromCol) => {
  const moves = []
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 9; col++) {
      if (piece.canMove(row, col, props.game.board)) {
        const targetPiece = props.game.board.getPieceAt(row, col)
        if (!targetPiece || targetPiece.color !== piece.color) {
          moves.push({ row, col })
        }
      }
    }
  }
  return moves
}

const handleCellClick = (row, col) => {
  if (props.game.isGameOver()) {
    return
  }

  errorMessage.value = ''

  const clickedPiece = getPieceAt(row, col)

  // If no piece is selected
  if (!selectedPiece.value) {
    if (clickedPiece && clickedPiece.color === props.game.currentPlayer) {
      selectedPiece.value = { row, col, piece: clickedPiece }
      validMoves.value = calculateValidMoves(clickedPiece, row, col)
    } else if (clickedPiece) {
      errorMessage.value = `現在是${props.game.currentPlayer === 'Red' ? '紅' : '黑'}方回合！`
      setTimeout(() => errorMessage.value = '', 2000)
    }
    return
  }

  // If clicking the same piece again, deselect
  if (selectedPiece.value.row === row && selectedPiece.value.col === col) {
    selectedPiece.value = null
    validMoves.value = []
    return
  }

  // If clicking another piece of the same color, select that instead
  if (clickedPiece && clickedPiece.color === props.game.currentPlayer) {
    selectedPiece.value = { row, col, piece: clickedPiece }
    validMoves.value = calculateValidMoves(clickedPiece, row, col)
    return
  }

  // Try to move the selected piece
  const moveResult = props.game.move(
    selectedPiece.value.row,
    selectedPiece.value.col,
    row,
    col
  )

  if (moveResult) {
    // Move successful
    selectedPiece.value = null
    validMoves.value = []

    // Switch player
    props.game.currentPlayer = props.game.currentPlayer === 'Red' ? 'Black' : 'Red'
  } else {
    errorMessage.value = '無效的移動！'
    setTimeout(() => errorMessage.value = '', 2000)
  }
}

const resetGame = () => {
  // Clear the board and reinitialize
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 9; col++) {
      props.game.board.removePieceAt(row, col)
    }
  }
  props.game.initializeBoard()
  props.game.currentPlayer = 'Red'
  props.game.gameOver = false
  props.game.winner = null
  selectedPiece.value = null
  validMoves.value = []
  errorMessage.value = ''
}
</script>

<style scoped>
.chess-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.game-status {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(145deg, #1a1f3a, #0f1220);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.current-player {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.label {
  color: rgba(255, 255, 255, 0.7);
}

.player-indicator {
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
}

.player-indicator.red {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.player-indicator.black {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #0a0e27;
}

.game-over {
  font-size: 1.2rem;
  font-weight: 700;
}

.winner {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.reset-btn {
  padding: 0.5rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.board-container {
  background: linear-gradient(145deg, #1a1f3a, #0f1220);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.board-row {
  display: flex;
}

.board-cell {
  width: 50px;
  height: 50px;
  border: 1px solid rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
}

.board-cell:hover {
  background-color: rgba(102, 126, 234, 0.1);
}

.board-cell.palace {
  background-color: rgba(118, 75, 162, 0.05);
}

.board-cell.river {
  background-color: rgba(66, 153, 225, 0.05);
}

.board-cell.selected {
  background-color: rgba(255, 215, 0, 0.2);
  box-shadow: inset 0 0 10px rgba(255, 215, 0, 0.5);
}

.board-cell.valid-move {
  background-color: rgba(76, 175, 80, 0.15);
}

.move-indicator {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.6);
  pointer-events: none;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.piece {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s;
  z-index: 1;
}

.piece:hover {
  transform: scale(1.1);
}

.piece.red {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.piece.black {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #0a0e27;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.error-message {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
