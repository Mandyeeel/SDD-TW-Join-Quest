# SDD-TW-Join-Quest
水球軟體學院 - 臺灣規格驅動開發研究組織 (SDD.TW) 入會任務之作答

## 概述
《 臺灣規格驅動開發研究組織 (SDD.TW) 》是一場由《水球軟體學院》發起的技術研究社群，目標是集結全台具備軟體開發能力的工程師，共同推進 AI × SDD/BDD 開發流程的研究與實踐。
「如果大家都關注 AI x SDD/BDD 這件事，台灣軟工進度就有機會超前國外；
當國外 AI 軟工都只會寫 rules 時，我們就已經全部都在寫 spec，產值絕對爆增。」

### 本組織將專注於以下目標
1. 本組織相信 AI x SDD/BDD 的方法，一定能讓 AI 在背景就產出 80%~90% 可靠且正確的程式，而這一定是未來 Vibe Coding 的趨勢，你一定是想要追求最前沿的軟工技術才加入本組織。
2. 組織規劃好了初步研究藍圖，分為底下三大路線
    a. 開發流程全自動化（後端）— Feature file (BDD) 到 API Spec/ERD 到程式
    b. 開發流程全自動化（前端）— 線框 到 User-flow (BDD) 到程式
    c. 回饋流程智能化 (全端) — 前後端整合自動化建立新的驗收測試
這三者只要都研究完成，那 Vibe Coding 才算是成熟，軟體工程師能與與 AI 「平行」合作帶來百倍產出，故稱「AI 百倍軟工研究組織」。

### 歡迎所有人參與
你的參與，不僅代表你願意走在 AI 軟體開發方法論的最前線，更代表你願意投身於一場嚴謹、務實、強調產出價值與技術驗證的研究歷程（所有的研究紀錄都會使用 Github Repository 保存脈絡）。
報名方法：
1. 加入水球軟體學院 Discord：https://discord.gg/uWGTF7RSnW
2. 照著此 Discord 社群內 #加入研究計劃 置頂訊息的指示進行即可成功報名
若你已準備好成為推動 AI × SDD/BDD 開發方法的革新者，誠摯邀請你完成報名，與來自全台的技術夥伴攜手共創。

---

## 專案說明

本專案使用 **BDD (Behavior-Driven Development)** 方法論開發中國象棋遊戲，遵循嚴格的 **Red-Green-Refactor** 循環，採用 **Cucumber** 作為 BDD 測試框架，使用 **Vue 3** 建立互動式遊戲介面。

### 技術棧

- **前端框架**：Vue 3 (Composition API)
- **建置工具**：Vite 6
- **BDD 測試框架**：Cucumber 11
- **斷言庫**：Chai 4
- **開發方法論**：Behavior-Driven Development (BDD)

### 專案結構

```
SDD-TW-Join-Quest/
├── features/                          # BDD 測試特性檔案
│   ├── chinese_chess_rules.feature    # 象棋規則定義（22個場景）
│   └── step_definitions/              # 步驟定義
│       └── chinese_chess_steps.js     # Cucumber 步驟實作
├── src/
│   ├── core/                          # 核心遊戲邏輯
│   │   ├── Game.js                    # 遊戲主類別
│   │   ├── Board.js                   # 棋盤類別
│   │   └── Piece.js                   # 棋子類別（將、士、車、馬、砲、相、兵）
│   ├── components/
│   │   └── ChineseChessBoard.vue      # 棋盤 UI 元件
│   ├── App.vue                        # 主應用程式元件
│   └── main.js                        # 應用程式入口
├── reports/                           # 測試報告輸出目錄
│   ├── cucumber-report.html          # HTML 格式報告
│   └── cucumber-report.json          # JSON 格式報告
├── cucumber.js                        # Cucumber 配置檔
├── package.json                       # 專案相依套件
├── TESTING.md                         # 測試指南文件
└── README.md                          # 本文件
```

---

## 快速開始

### 環境需求

- Node.js 16 或以上版本
- npm 或 yarn

### 安裝步驟

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd SDD-TW-Join-Quest
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

### 使用方式

#### 1. 執行開發伺服器（玩遊戲）

```bash
npm run dev
```

執行後會在終端顯示本地伺服器網址（通常是 `http://localhost:5173`），在瀏覽器中開啟即可開始遊戲。

**遊戲操作說明**：
- 點擊棋子選擇要移動的棋子（會顯示金色高亮）
- 綠色圓點表示該棋子可移動的有效位置
- 點擊有效位置移動棋子
- 遊戲會自動切換玩家（紅方 ⇄ 黑方）
- 吃掉對方將軍即獲勝
- 遊戲結束後可點擊「重新開始」按鈕重置遊戲

#### 2. 執行 BDD 測試

```bash
npm test
```

這會執行所有 22 個 Cucumber BDD 測試場景，並在終端顯示測試結果。

**測試涵蓋範圍**：
- ✅ 將軍（帥）移動規則與九宮限制
- ✅ 王不見王規則（飛將）
- ✅ 士的移動規則與九宮限制
- ✅ 車的直線移動規則
- ✅ 馬的日字移動與蹩馬腿規則
- ✅ 砲的移動與吃子規則（需跳板）
- ✅ 相/象的田字移動、過河限制與塞象眼規則
- ✅ 兵/卒的移動規則（過河前後不同）
- ✅ 遊戲勝利條件判定

#### 3. 產生測試報告

```bash
npm run test:report
```

此命令會：
- 執行所有測試
- 產生 HTML 格式報告：`reports/cucumber-report.html`
- 產生 JSON 格式報告：`reports/cucumber-report.json`

**查看報告**：
```bash
# macOS
open reports/cucumber-report.html

# Windows
start reports/cucumber-report.html

# Linux
xdg-open reports/cucumber-report.html
```

或直接在瀏覽器中開啟 `reports/cucumber-report.html` 檔案。

#### 4. 建置生產版本

```bash
npm run build
```

建置完成後的檔案會輸出到 `dist/` 目錄。

#### 5. 預覽生產版本

```bash
npm run preview
```

---

## 授權

本專案為 SDD.TW 入會任務作答，僅供學習與研究使用。
