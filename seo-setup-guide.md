# Google Search Console と GA4 設定ガイド

## 設定が必要な箇所

### 1. Google Analytics (GA4) 設定

以下のファイルで `GA_MEASUREMENT_ID` を実際のIDに置き換えてください：

- `index.html` (行29, 34)
- `Nu5wKI0rCA.html` (行31, 36)
- その他17個の記事ファイル

**置き換え箇所:**
```html
<!-- 変更前 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- 変更後（例：G-XXXXXXXXXX） -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Google Search Console 検証

`index.html` の行38で検証コードを置き換えてください：

```html
<!-- 変更前 -->
<meta name="google-site-verification" content="GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE">

<!-- 変更後 -->
<meta name="google-site-verification" content="実際の検証コード">
```

## 設定手順

### Google Analytics (GA4)

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. 新しいプロパティを作成
3. 測定IDをコピー（G-XXXXXXXXXX形式）
4. ファイル内の `GA_MEASUREMENT_ID` を置き換え

### Google Search Console

1. [Google Search Console](https://search.google.com/search-console/) にアクセス
2. プロパティを追加：`https://486b9aca.mlob.pages.dev`
3. HTMLタグ方式を選択
4. `content` 属性の値をコピー
5. `index.html` の検証メタタグに貼り付け
6. サイトマップを送信：`https://486b9aca.mlob.pages.dev/sitemap.xml`

## 実装済み機能

✅ **SEO基本設定**
- メタタグ（title, description, keywords）
- Open Graph（Facebook/SNS共有）
- Twitter Card
- 正規URL（canonical）

✅ **構造化データ（JSON-LD）**
- WebSite（トップページ）
- Article（記事ページ）
- 検索機能対応

✅ **サイトマップ・robots.txt**
- 全18記事のURLを含むサイトマップ
- 検索エンジン向けクロール設定

✅ **GA4・GSC準備**
- トラッキングコード配置済み
- 検証メタタグ配置済み
- IDを実際のものに置き換えるだけで動作

## 今後の最適化

- 記事ごとの個別キーワード調整
- 画像のalt属性最適化
- 内部リンクの強化
- ページ表示速度の改善