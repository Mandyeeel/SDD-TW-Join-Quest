<template>
  <div class="app">
    <h1>Chinese Chess - 象棋</h1>
    <ChineseChessBoard v-if="game" :game="game" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChineseChessBoard from './components/ChineseChessBoard.vue'
import { Game } from './core/Game'

const game = ref(null)

onMounted(() => {
  game.value = new Game()
})
</script>

<style scoped>
.app {
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
