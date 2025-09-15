// モーダル表示
function showPurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    modal.style.display = 'block';
    
    // 実際の運用時はここでcodocの埋め込みコードを動的に読み込む
    // 例: loadCodocEmbed();
}

// モーダル非表示
function closePurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    modal.style.display = 'none';
}

// モーダル外クリックで閉じる
window.onclick = function(event) {
    const modal = document.getElementById('purchaseModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ページトップボタン（オプション）
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const topButton = document.getElementById('topButton');
    
    if (topButton) {
        if (scrollTop > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    }
});

// 記事カードのアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 記事カードにアニメーションを適用
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // codoc埋め込みの初期化（実装例）
    initializeCodoc();
});

// codoc初期化（実装例）
function initializeCodoc() {
    // 実際の運用時のcodoc初期化コード例
    // このコードは実際のcodocのドキュメントに従って実装する必要があります
    
    /* 例：
    if (typeof codoc !== 'undefined') {
        codoc.init({
            // codoc設定
        });
    }
    */
    
    console.log('codoc initialization placeholder');
}

// 記事購入処理（実装例）
function purchaseArticle(articleId, price) {
    // 実際の運用時の購入処理
    console.log(`Article ${articleId} purchase initiated. Price: ${price}`);
    
    // codocの購入処理を呼び出す
    /* 例：
    codoc.purchase({
        articleId: articleId,
        price: price,
        onSuccess: function(result) {
            // 購入成功時の処理
            window.location.href = result.articleUrl;
        },
        onError: function(error) {
            // エラー処理
            alert('購入処理中にエラーが発生しました。');
        }
    });
    */
}