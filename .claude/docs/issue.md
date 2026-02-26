# Issue Tracker

## Improvements

### Improvement #1: parseDuration をユーティリティとして切り出す (PR #2, #3 レビュー指摘)

**対象ファイル**:
- `src/pages/GamePage.tsx`
- `src/pages/count-up/CountUpGamePage.tsx`

**現状**:
`parseDuration` が `GamePage.tsx` と `CountUpGamePage.tsx` の両方にローカル関数として重複定義されており、テストも書けない。

**改善案**:
`src/utils/parseDuration.ts` として切り出し、両ページから共通利用する。ユニットテストも追加する。

**優先度**: 低

---

### Improvement #2: CountUpResultsPage の Retry ボタンを明示的な遷移に変更 (PR #3 レビュー指摘)

**対象ファイル**:
- `src/pages/count-up/CountUpResultsPage.tsx`

**現状**:
Retry ボタンが `navigate(-1)` を使用しており、ブラウザ履歴の状態によっては意図しないページに戻る可能性がある。

**改善案**:
結果ページにクエリパラメータを state として渡し、Retry 時に `/count-up/game?...` へ明示的に遷移する。

**優先度**: 低

---
