/**
 * 삼성카드 프로모션 모바일 UI 개선 스크립트
 */

document.addEventListener('DOMContentLoaded', function () {
    const floatingTab = document.getElementById('floatingTab');
    const floatingCta = document.getElementById('floatingCta');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = {
        'section01': document.getElementById('section01'),
        'section03': document.getElementById('section03'),
        'section04': document.getElementById('section04')
    };

    // 캐러셀 요소
    const cardCarousel = document.getElementById('cardCarousel');
    const indicators = document.querySelectorAll('.indicator');
    const cardSlides = document.querySelectorAll('.card-slide');

    // 스크롤 임계값
    const TAB_SHOW_THRESHOLD = 300;
    const CTA_SHOW_THRESHOLD = 500;

    // ===== 탭 클릭 이벤트 =====
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const targetSection = sections[targetId];

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 캐러셀 스크롤 감지 =====
    if (cardCarousel) {
        cardCarousel.addEventListener('scroll', function () {
            updateCarouselIndicator();
        });
    }

    function updateCarouselIndicator() {
        if (!cardCarousel || !cardSlides.length) return;

        const scrollLeft = cardCarousel.scrollLeft;
        const slideWidth = cardSlides[0].offsetWidth + 16; // gap 포함
        const currentIndex = Math.round(scrollLeft / slideWidth);

        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // ===== 인디케이터 클릭 =====
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            const slideWidth = cardSlides[0].offsetWidth + 16;

            cardCarousel.scrollTo({
                left: index * slideWidth,
                behavior: 'smooth'
            });
        });
    });

    // ===== 스크롤 이벤트 =====
    let ticking = false;

    function onScroll() {
        const scrollY = window.scrollY;

        // 상단 탭 표시/숨김
        if (scrollY > TAB_SHOW_THRESHOLD) {
            floatingTab.classList.add('visible');
            document.body.classList.add('tab-visible');
        } else {
            floatingTab.classList.remove('visible');
            document.body.classList.remove('tab-visible');
        }

        // 하단 CTA 표시/숨김
        if (scrollY > CTA_SHOW_THRESHOLD) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }

        // 현재 섹션 감지 → 탭 활성화
        updateActiveTab();
    }

    function updateActiveTab() {
        const scrollY = window.scrollY + 100;
        let activeSection = null;

        for (const [id, section] of Object.entries(sections)) {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    activeSection = id;
                    break;
                }
            }
        }

        tabBtns.forEach(btn => {
            if (btn.dataset.target === activeSection) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 초기 상태 설정
    onScroll();
    updateCarouselIndicator();
});
