# 開発フロー自動化 セットアップガイド

## 概要

このリポジトリでは、spec-kitを使用した自動化開発フローを実装しています。

```
バックログIssue → 仕様検討 → 実装計画 → 実装 → 完了
```

各フェーズは前フェーズのPRマージをトリガーに自動開始されます。

## セットアップ手順

### 1. GitHub Secrets の設定

リポジトリの Settings > Secrets and variables > Actions で以下を設定:

| Secret名 | 説明 |
|----------|------|
| `ANTHROPIC_API_KEY` | Claude API キー |

### 2. GitHub Labels の作成

以下のラベルを作成してください:

#### フェーズラベル
| ラベル名 | 色 | 説明 |
|----------|-----|------|
| `phase:backlog` | `#0E8A16` | バックログ（開始トリガー） |
| `phase:spec` | `#1D76DB` | 仕様検討フェーズ |
| `phase:plan` | `#5319E7` | 実装計画フェーズ |
| `phase:impl` | `#D93F0B` | 実装フェーズ |

#### ステータスラベル
| ラベル名 | 色 | 説明 |
|----------|-----|------|
| `status:in-progress` | `#FBCA04` | 処理中 |
| `status:spec-review` | `#BFD4F2` | 仕様レビュー待ち |
| `status:plan-review` | `#BFD4F2` | 計画レビュー待ち |
| `status:impl-review` | `#BFD4F2` | 実装レビュー待ち |
| `status:blocked` | `#B60205` | ブロック中 |
| `status:done` | `#0E8A16` | 完了 |

### 3. ラベル作成コマンド（gh CLI使用時）

```bash
# フェーズラベル
gh label create "phase:backlog" --color "0E8A16" --description "バックログ"
gh label create "phase:spec" --color "1D76DB" --description "仕様検討フェーズ"
gh label create "phase:plan" --color "5319E7" --description "実装計画フェーズ"
gh label create "phase:impl" --color "D93F0B" --description "実装フェーズ"

# ステータスラベル
gh label create "status:in-progress" --color "FBCA04" --description "処理中"
gh label create "status:spec-review" --color "BFD4F2" --description "仕様レビュー待ち"
gh label create "status:plan-review" --color "BFD4F2" --description "計画レビュー待ち"
gh label create "status:impl-review" --color "BFD4F2" --description "実装レビュー待ち"
gh label create "status:blocked" --color "B60205" --description "ブロック中"
gh label create "status:done" --color "0E8A16" --description "完了"
```

## ワークフロー

### フロー図

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [人間] バックログIssue作成                                       │
│         ↓                                                       │
│         ↓ (phase:backlog ラベル付与)                            │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 【自動】仕様検討フェーズ (spec-phase.yml)                   │  │
│  │  1. Sub-issue作成 [Spec]                                  │  │
│  │  2. ブランチ作成 (###-feature/spec)                        │  │
│  │  3. Claude Code: /clarify, /specify 実行                  │  │
│  │  4. PR作成                                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                                                       │
│  [人間] 仕様PRレビュー・マージ                                    │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 【自動】実装計画フェーズ (plan-phase.yml)                   │  │
│  │  1. Sub-issue作成 [Plan]                                  │  │
│  │  2. ブランチ作成 (###-feature/plan)                        │  │
│  │  3. Claude Code: /plan, /task, /analyze 実行              │  │
│  │  4. PR作成                                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                                                       │
│  [人間] 計画PRレビュー・マージ                                    │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 【自動】実装フェーズ (impl-phase.yml)                       │  │
│  │  1. Sub-issue作成 [Impl]                                  │  │
│  │  2. ブランチ作成 (###-feature/impl)                        │  │
│  │  3. Claude Code: /implement 実行                          │  │
│  │  4. 単体テスト・E2Eテスト実行                               │  │
│  │  5. テストパス時: PR作成                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                                                       │
│  [人間] 実装PRレビュー・マージ                                    │
│         ↓                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 【自動】完了処理 (complete-phase.yml)                       │  │
│  │  1. 関連Sub-issue クローズ                                 │  │
│  │  2. 親Issue クローズ                                       │  │
│  │  3. 完了コメント追加                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 各Workflowファイル

| ファイル | トリガー | 処理内容 |
|----------|----------|----------|
| `spec-phase.yml` | Issue に `phase:backlog` ラベル付与 | 仕様検討の自動実行 |
| `plan-phase.yml` | `*/spec` ブランチのPRマージ | 実装計画の自動実行 |
| `impl-phase.yml` | `*/plan` ブランチのPRマージ | 実装の自動実行 |
| `complete-phase.yml` | `*/impl` ブランチのPRマージ | 完了処理 |

## 使い方

### 1. 新機能の開始

1. GitHub で「New Issue」をクリック
2. 「バックログ（機能要望）」テンプレートを選択
3. 必要事項を記入して作成
4. `phase:backlog` ラベルを付与

### 2. 自動フローの監視

- Actions タブでワークフローの実行状況を確認
- 各フェーズのSub-issueでステータスを確認
- PRが作成されたらレビュー・マージ

### 3. エラー時の対応

テスト失敗などでワークフローが停止した場合:
1. Sub-issueに `status:blocked` ラベルが付与される
2. Actions の実行ログを確認
3. 手動で修正してプッシュ
4. 必要に応じてワークフローを再実行

## トラブルシューティング

### ワークフローが開始されない

- `phase:backlog` ラベルが正しく付与されているか確認
- Secrets が正しく設定されているか確認
- Actions が有効になっているか確認

### Claude Code の実行エラー

- `ANTHROPIC_API_KEY` が有効か確認
- API の利用制限に達していないか確認

### テスト失敗

- Actions のログで詳細を確認
- ローカルで同じテストを実行して再現確認
