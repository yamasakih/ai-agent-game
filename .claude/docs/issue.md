# Issue Tracker

## Improvements

### Improvement #1: parseDuration をユーティリティとして切り出す (PR #2 レビュー指摘)

**対象ファイル**:
- `src/pages/GamePage.tsx`

**現状**:
`parseDuration` が `GamePage.tsx` 内のローカル関数として定義されており、テストが書けない。

**改善案**:
`src/utils/parseDuration.ts` として切り出し、ユニットテストを追加する。

**優先度**: 低

---
