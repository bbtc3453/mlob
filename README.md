# メンエス美少女だけ - 記事販売サイトモックアップ

## 概要
wakust で公開している記事を自サイトでも販売するためのモックアップサイトです。
参考サイト（menesthe-viking.blog.jp）のデザインをベースに、codoc の課金システムを組み込む設計になっています。

## ファイル構成
```
mlob/
├── index.html      # メインページ
├── styles.css      # スタイルシート
├── script.js       # JavaScript
└── README.md       # このファイル
```

## 主な機能
- 記事一覧表示
- 価格表示とセール価格対応
- サイドバー（人気記事、カテゴリー、タグ、アーカイブ）
- レスポンシブデザイン
- codoc 課金システム対応準備

## codoc 実装ガイド

### 1. codoc アカウント作成
1. [codoc.jp](https://codoc.jp) でアカウントを作成
2. 販売者登録を完了

### 2. 記事の作成と設定
1. codoc ダッシュボードで新規記事を作成
2. 各記事に価格を設定
3. 記事IDを取得

### 3. HTMLへの実装（実装済み）

#### 現在の実装方法
HTMLファイルには既にcodocタグが実装されています：

**ヘッダー部分（実装済み）**:
```html
<!-- index.html の <head> 内 -->
<script src="https://codoc.jp/js/paywall.js" defer></script>
```

**各記事カード（実装済み）**:
```html
<!-- 各記事カードのcodoc-area -->
<div class="codoc-area">
    <div class="codoc-entries" data-id="記事ID_1">
        <!-- codocの課金コンテンツがここに表示されます -->
    </div>
    <p class="purchase-note">※codocで安全に購入できます</p>
</div>
```

### 4. 記事IDの設定方法

1. **codocで記事を作成**:
   - codoc.jp にログイン
   - 「記事を作成」をクリック
   - タイトルと本文を入力
   - 価格を設定（例: 3,000円）

2. **記事IDの取得**:
   - 作成した記事の管理画面を開く
   - 「埋め込みコード」をクリック
   - `data-id="xxxxx"` の xxxxx 部分が記事ID

3. **HTMLファイルの更新**:
   ```html
   <!-- 記事ID_1 を実際のIDに置き換え -->
   <div class="codoc-entries" data-id="実際の記事ID">
   ```

#### 方法2: JavaScript で動的に読み込み
```javascript
// script.js の initializeCodoc() 関数を以下のように実装
function initializeCodoc() {
    // codocスクリプトを読み込み
    const script = document.createElement('script');
    script.src = 'https://codoc.jp/js/cms.js';
    document.head.appendChild(script);
    
    // 各記事にcodoc埋め込みを追加
    script.onload = function() {
        // 記事ごとの処理
        document.querySelectorAll('.codoc-area').forEach((area, index) => {
            const articleId = getArticleId(index); // 記事IDを取得する関数
            area.innerHTML = `<div class="codoc-entries" data-id="${articleId}"></div>`;
        });
    };
}
```

### 4. 記事IDの管理
記事IDは以下のような配列で管理することを推奨：

```javascript
const articleIds = {
    'article1': 'CODOC_ARTICLE_ID_1',
    'article2': 'CODOC_ARTICLE_ID_2',
    'article3': 'CODOC_ARTICLE_ID_3',
    // ...
};
```

## カスタマイズポイント

### デザインの調整
- `styles.css` の色設定を変更してブランドカラーに合わせる
- `.purchase-btn` のスタイルを調整して購入ボタンをカスタマイズ

### 記事の追加
1. `index.html` に新しい記事カードを追加
2. codoc で記事を作成して ID を取得
3. 記事カードに codoc 埋め込みコードを配置

### レイアウトの変更
- グリッドレイアウトを調整したい場合は `.content-wrapper` の `grid-template-columns` を変更
- サイドバーを左側に配置したい場合は `grid-template-columns: 320px 1fr;` に変更

## 注意事項
- codoc の埋め込みコードは実際の記事 ID に置き換える必要があります
- SSL 対応のホスティングサービスを使用してください（codoc は https が必須）
- 記事の価格変更は codoc ダッシュボードから行います

## ローカルテスト
```bash
# Python を使用する場合
python -m http.server 8000

# Node.js を使用する場合
npx http-server

# ブラウザでアクセス
http://localhost:8000
```

## デプロイ推奨サービス
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## サポート
- codoc の詳細な使い方: [codoc ヘルプセンター](https://help.codoc.jp)
- codoc API ドキュメント: [codoc 開発者向けドキュメント](https://codoc.jp/docs)