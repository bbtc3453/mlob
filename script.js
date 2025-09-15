// モバイルメニュー機能
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';

            // ハンバーガーアイコンのアニメーション
            this.classList.toggle('active');
        });
    }

    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 検索機能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                // 検索処理（実装に応じてカスタマイズ）
                console.log('検索クエリ:', query);
                // 実際の検索処理をここに実装
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    console.log('検索クエリ:', query);
                    // 実際の検索処理をここに実装
                }
            }
        });
    }

    // 記事カードのフェードインアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 記事カードを監視対象に追加
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ウィジェットのフェードインアニメーション
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        widget.style.transition = `opacity 0.6s ease ${index * 0.2 + 0.3}s, transform 0.6s ease ${index * 0.2 + 0.3}s`;
        observer.observe(widget);
    });
});

// ドロップダウンメニューの制御（タッチデバイス対応）
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.has-dropdown');

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');

        if (link && menu) {
            // タッチデバイスでのクリック処理
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
});

// スクロール時のヘッダーアニメーション
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
        header.style.transform = 'translateY(-5px)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// 記事ID管理オブジェクト（codoc用）
// ファイル名とcodoc記事IDの対応表
const articleIds = {
    // 元記事（6個）
    'Nu5wKI0rCA': 'Nu5wKI0rCA', // 【9/16,9/19,9/20出勤】20代新宿のキレカワ細身美女にマッサージで搾り取られた
    'OnXStSLqyg': 'OnXStSLqyg', // 3部【9/15,9/18】力強い超王道マッサージの美少女セラピスト
    'HR0Nj7m07w': 'HR0Nj7m07w', // 【9/15,9/17,9/18,9/19出勤】恵比寿・渋谷の老舗店に在籍する美人セラピストの"ゾクゾク系"体験記
    'yoH20I3XjA': 'yoH20I3XjA', // 【9/16,9/18出勤】通いたくなるってこういうこと。恵比寿・清楚系セラ体験記
    'mH7VtutiKw': 'mH7VtutiKw', // 3部【9/15,9/17,9/18出勤】小柄で清楚系な坂道系美少女と
    'qI279OHeSw': 'qI279OHeSw', // [9/18,9/20]清楚で華奢な彼女が鼠径部で…擦れて…密着して…えっ、これって…？

    // ページ2の記事（6個）
    'EZJw0r8p0Q': 'EZJw0r8p0Q', // 3部【土日もデリ】東京の高級デリヘルおすすめ店舗 part1
    'xeo6N95siA': 'xeo6N95siA', // 【田園都市線限定】Dカップ21歳・スケベJDセラピストのオフパコなみマッサージ
    'pqxRcg45Tg': 'pqxRcg45Tg', // 【9/13,9/14,9/15出勤】スレンダーな高身長美人がセラピストという奇跡
    'ZFMTy8mUJQ': 'ZFMTy8mUJQ', // 【9/13,9/14出勤】二十歳の新人学生と蒸し暑い夏の夕方に
    'XV5s1Ov0Aw': 'XV5s1Ov0Aw', // 【9/13,9/14,9/15出勤】みんなの人気ランクイン女子大生は長時間コースに特別料金なし
    'VQ2Ss81DXQ': 'VQ2Ss81DXQ', // 【9/13,9/14出勤】アパレル系20代美少女OLのマッサージに骨抜きにされた話

    // ページ3の記事（6個）
    'glG9bmw9yA': 'glG9bmw9yA', // 【月間利用頻度高】東京の高級デリヘルおすすめ店舗 part2
    'g1ftQtS8Xw': 'g1ftQtS8Xw', // 【9/10,9/11,9/12出勤】これまでHPB掲載のメンエス隠れ家で一番抜けた話。
    '1sLj5IH1Nw': '1sLj5IH1Nw', // 【今月はデリ】東京の高級デリヘルおすすめ店舗 part3
    'j0vDfSZpfg': 'j0vDfSZpfg', // 9/9,9/11,9/12,9/13,9/14【ドS清楚】スレンダーJDの本性は…実はドM？ギャップに萌える貧乳セラピストが降臨。
    'zOfx1Nkd7A': 'zOfx1Nkd7A', // 【9/17,9/18出勤】😊 ニコニコ笑顔×ポーカーフェイス施術に沼る…"普通のJD"が、実は一番アツい
    'za0fm2KBPA': 'za0fm2KBPA'  // 9/15,9/16,9/17,9/18,9/19,9/20【奇跡の妹系セラピスト】柔らかさと癒しのダブルパンチ
};

// codoc初期化（実装例）
function initializeCodoc() {
    // 実際の運用時のcodoc初期化コード例
    console.log('codoc initialization placeholder');
}