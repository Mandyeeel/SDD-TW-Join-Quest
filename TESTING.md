# 測試指南 (Testing Guide)

## 如何執行測試 (How to Run Tests)

### 執行測試 (Run Tests)

```bash
npm test
```

這會執行所有 Cucumber BDD 測試場景，並在終端顯示結果。

### 產生測試報告 (Generate Test Reports)

```bash
npm run test:report
```

這會執行測試並產生兩種格式的報告：
- HTML 報告：`reports/cucumber-report.html`
- JSON 報告：`reports/cucumber-report.json`

## 如何查看 Cucumber 報告 (How to View Cucumber Reports)

### 方法一：使用瀏覽器直接開啟 HTML 報告

1. 執行測試並產生報告：
   ```bash
   npm run test:report
   ```

2. 在瀏覽器中開啟 HTML 報告：
   - **macOS**:
     ```bash
     open reports/cucumber-report.html
     ```
   - **Windows**:
     ```bash
     start reports/cucumber-report.html
     ```
   - **Linux**:
     ```bash
     xdg-open reports/cucumber-report.html
     ```

3. 或者直接在 Finder/檔案總管中找到 `reports/cucumber-report.html` 並雙擊開啟

### 方法二：在 VS Code 中查看

1. 在 VS Code 的檔案瀏覽器中找到 `reports/cucumber-report.html`
2. 右鍵點擊檔案
3. 選擇 "Open with Live Server" 或使用其他預覽擴充功能

### 報告內容說明

HTML 報告會顯示：
- ✅ 通過的場景數量 (Passed scenarios)
- ❌ 失敗的場景數量 (Failed scenarios，如果有)
- 每個場景的詳細步驟 (Given/When/Then)
- 執行時間統計
- 各個 feature 的執行狀態

## 測試架構 (Test Structure)

```
SDD-TW-Join-Quest/
├── features/                          # BDD 測試特性檔案
│   ├── chinese_chess_rules.feature    # 象棋規則定義（22個場景）
│   └── step_definitions/              # 步驟定義
│       └── chinese_chess_steps.js     # Cucumber 步驟實作
├── src/
│   └── core/                          # 核心遊戲邏輯
│       ├── Game.js                    # 遊戲主類別
│       ├── Board.js                   # 棋盤類別
│       └── Piece.js                   # 棋子類別
├── reports/                           # 測試報告輸出目錄
│   ├── cucumber-report.html          # HTML 格式報告
│   └── cucumber-report.json          # JSON 格式報告
└── cucumber.js                        # Cucumber 配置檔
```

## 測試涵蓋範圍 (Test Coverage)

目前所有 22 個 BDD 場景已全部通過：

1. ✅ 將軍（帥）移動規則
2. ✅ 將軍（帥）只能在九宮內移動
3. ✅ 將軍（帥）王不見王規則
4. ✅ 士移動規則
5. ✅ 士只能在九宮內移動
6. ✅ 車移動規則
7. ✅ 車移動路徑上不能有棋子
8. ✅ 馬移動規則
9. ✅ 馬移動蹩馬腿規則
10. ✅ 砲移動規則（不吃子）
11. ✅ 砲移動路徑上不能有棋子
12. ✅ 砲吃子規則
13. ✅ 砲吃子需要恰好一個跳板
14. ✅ 相/象移動規則
15. ✅ 相/象不過河規則
16. ✅ 相/象塞象眼規則
17. ✅ 兵/卒未過河只能向前移動
18. ✅ 兵/卒過河後可以橫向移動
19. ✅ 兵/卒不能向後移動
20. ✅ 棋子不能移動到己方棋子所在位置
21. ✅ 吃掉對方將軍獲勝
22. ✅ 一方獲勝後遊戲結束

## BDD 開發流程 (BDD Development Process)

本專案遵循嚴格的 BDD Red-Green-Refactor 循環：

1. **Red（紅燈）**：先寫測試，看到測試失敗
2. **Green（綠燈）**：寫最少的程式碼讓測試通過
3. **Refactor（重構）**：在不改變行為的前提下優化程式碼

每個功能都經過完整的 BDD 循環開發，確保程式碼的正確性和可維護性。
