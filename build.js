#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 記事データの読み込み
function loadArticleData() {
    try {
        const dataPath = path.join(__dirname, 'data', 'articles.json');
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('記事データの読み込みに失敗しました:', error);
        process.exit(1);
    }
}

// テンプレートの読み込み
function loadTemplate() {
    try {
        const templatePath = path.join(__dirname, 'templates', 'article-template.html');
        return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
        console.error('テンプレートの読み込みに失敗しました:', error);
        process.exit(1);
    }
}

// 既存記事ファイルからコンテンツを抽出
function extractContentFromExistingFile(articleId) {
    try {
        const filePath = path.join(__dirname, `${articleId}.html`);
        if (!fs.existsSync(filePath)) {
            return '<p>記事コンテンツが見つかりません。</p>';
        }

        const content = fs.readFileSync(filePath, 'utf8');

        // 記事コンテンツ部分を抽出（既存のHTMLから）
        const contentMatch = content.match(/<div class="article-content"[^>]*>([\s\S]*?)<\/div>/);
        if (contentMatch) {
            return contentMatch[1].trim();
        }

        // フォールバック: body内のコンテンツを抽出
        const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
        if (bodyMatch) {
            return bodyMatch[1].trim();
        }

        return '<p>記事コンテンツを抽出できませんでした。</p>';
    } catch (error) {
        console.error(`記事 ${articleId} のコンテンツ抽出に失敗:`, error);
        return '<p>記事コンテンツの読み込みエラー。</p>';
    }
}

// テンプレート変数の置換
function replaceTemplateVariables(template, article, content) {
    const publishDate = new Date(article.publishedDate).toLocaleDateString('ja-JP');
    const shortDescription = article.description.length > 100
        ? article.description.substring(0, 97) + '...'
        : article.description;

    // codocコンテンツプレビューの生成
    const codocContentPreview = article.codocContent ?
        article.codocContent.map(item => `<br>${item}`).join('') : '';

    return template
        .replace(/\{\{title\}\}/g, article.title)
        .replace(/\{\{description\}\}/g, article.description)
        .replace(/\{\{shortDescription\}\}/g, shortDescription)
        .replace(/\{\{keywords\}\}/g, article.keywords)
        .replace(/\{\{id\}\}/g, article.id)
        .replace(/\{\{area\}\}/g, article.area)
        .replace(/\{\{publishedDate\}\}/g, article.publishedDate)
        .replace(/\{\{modifiedDate\}\}/g, article.modifiedDate)
        .replace(/\{\{publishDate\}\}/g, publishDate)
        .replace(/\{\{category\}\}/g, article.category)
        .replace(/\{\{codocId\}\}/g, article.codocId)
        .replace(/\{\{codocContentPreview\}\}/g, codocContentPreview)
        .replace(/\{\{wakustUrl\}\}/g, article.wakustUrl || '')
        .replace(/\{\{wakustPrice\}\}/g, article.wakustPrice || '')
        .replace(/\{\{codocPrice\}\}/g, article.codocPrice || '')
        .replace(/\{\{content\}\}/g, content);
}

// 記事ファイルの生成
function generateArticleFile(article, template) {
    try {
        // 既存ファイルからコンテンツを抽出
        const content = extractContentFromExistingFile(article.id);

        // テンプレートに値を埋め込み
        const html = replaceTemplateVariables(template, article, content);

        // ファイルに書き込み
        const outputPath = path.join(__dirname, `${article.id}.html`);
        fs.writeFileSync(outputPath, html, 'utf8');

        console.log(`✓ ${article.id}.html を生成しました`);
        return true;
    } catch (error) {
        console.error(`記事 ${article.id} の生成に失敗:`, error);
        return false;
    }
}

// メイン処理
function main() {
    console.log('🚀 記事ページの最適化を開始します...\n');

    // データとテンプレートの読み込み
    const articleData = loadArticleData();
    const template = loadTemplate();

    console.log(`📝 ${articleData.articles.length} 件の記事を処理します\n`);

    let successCount = 0;
    let failCount = 0;

    // 各記事を処理
    for (const article of articleData.articles) {
        if (generateArticleFile(article, template)) {
            successCount++;
        } else {
            failCount++;
        }
    }

    console.log('\n📊 処理結果:');
    console.log(`✅ 成功: ${successCount} 件`);
    console.log(`❌ 失敗: ${failCount} 件`);

    if (failCount === 0) {
        console.log('\n🎉 すべての記事ページの最適化が完了しました！');
    } else {
        console.log('\n⚠️  一部の記事で問題が発生しました。');
        process.exit(1);
    }
}

// 実行
if (require.main === module) {
    main();
}

module.exports = {
    loadArticleData,
    loadTemplate,
    generateArticleFile,
    replaceTemplateVariables
};