# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

メンエス美少女だけ - wakust の記事を自サイトで販売するためのモックアップサイト。参考サイト（menesthe-viking.blog.jp）のデザインをベースに、codoc 課金システムを組み込んだ記事販売サイトです。

## Project Structure

```
mlob/
├── index.html              # メインページ（記事一覧）
├── article-example.html    # 個別記事ページのサンプル
├── styles.css             # 全体のスタイルシート
├── script.js              # JavaScript（モーダル、アニメーション等）
├── README.md              # プロジェクト説明とcodoc実装ガイド
└── CLAUDE.md             # このファイル
```

## Development Commands

### ローカルサーバー起動
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Live Server（VS Code拡張機能）推奨
```

### ファイル監視と自動リロード
```bash
# Live Server 使用（推奨）
# またはブラウザの開発者ツールでキャッシュを無効化
```

## Architecture Overview

### デザインシステム
- **カラーパレット**: `#667eea` (メインカラー), `#ff4757` (アクセント), `#f8f9fa` (背景)
- **フォント**: Noto Sans JP（Google Fonts）
- **レイアウト**: CSS Grid（メイン2カラム、レスポンシブ）
- **コンポーネント**: 記事カード、サイドバーウィジェット、モーダル

### JavaScript 機能
- **モーダル管理**: 購入画面表示/非表示
- **スムーススクロール**: アンカーリンク対応
- **アニメーション**: Intersection Observer による記事カードフェードイン
- **codoc 初期化**: 課金システム埋め込み準備

## codoc Integration

### 実装手順
1. codoc.jp でアカウント作成・販売者登録
2. 記事作成・価格設定・記事ID取得
3. HTMLに埋め込みコード配置

### 埋め込み方法
```html
<!-- 方法1: 直接埋め込み -->
<div class="codoc-entries" data-id="YOUR_ARTICLE_ID"></div>
<script src="https://codoc.jp/js/cms.js"></script>

<!-- 方法2: iframe埋め込み -->
<iframe src="https://codoc.jp/shares/YOUR_ARTICLE_ID/embed"></iframe>
```

### 記事ID管理
`script.js` の `articleIds` オブジェクトで一元管理推奨

## Content Management

### 新規記事追加手順
1. `index.html` に記事カード追加
2. codoc で記事作成・ID取得
3. 記事カードの codoc-area に埋め込みコード配置
4. 必要に応じて個別記事ページ作成（`article-example.html` を参考）

### 価格・セール設定
- 通常価格: `.price-tag` で表示
- セール価格: `<s>` タグで取り消し線 + 新価格
- セールバッジ: `.discount-badge` クラス使用

## Responsive Design

### ブレークポイント
- デスクトップ: 1024px以上（2カラムレイアウト）
- タブレット: 768px-1023px（1カラム、サイドバーは2列グリッド）
- モバイル: 767px以下（完全1カラム）

### 最適化ポイント
- 記事カードは縦積みレイアウトに変更
- ナビゲーションは縦並び
- フォントサイズとスペーシング調整

## Deployment

### 推奨ホスティングサービス
- **Netlify** (推奨): 自動デプロイ、SSL対応
- **Vercel**: 高速、自動最適化
- **GitHub Pages**: 無料、シンプル
- **Firebase Hosting**: Google統合

### SSL必須
codoc は HTTPS が必須のため、SSL対応サービスを使用

## File Editing Guidelines

### styles.css
- CSS Grid と Flexbox を併用
- BEM命名規則部分採用
- レスポンシブファーストで記述

### script.js  
- ES6+ 記法使用
- モジュール化は現在未実装（必要に応じて追加）
- codoc 初期化関数は実装準備済み

### HTML
- セマンティックHTML5使用
- アクセシビリティ配慮（alt、role等）
- Open Graph メタタグは未実装（SEO強化時に追加）