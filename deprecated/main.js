/**
 * 삼성카드 프로모션 모바일 UI 개선 스크립트
 * Swiper.js Carousel (430x932 모바일 최적화)
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

    const TAB_SHOW_THRESHOLD = 300;

    // ===== 탭 클릭 이벤트 =====
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const targetSection = sections[targetId];
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Swiper.js Carousel (안정화 버전) =====
    const cardSwiper = new Swiper('#cardSwiper', {
        // 기본 슬라이드 효과 (coverflow 대신 안정적인 slide)
        effect: 'slide',

        // 핵심 설정
        initialSlide: 0,          // ★ 첫 번째 슬라이드(taptap O)부터 시작
        centeredSlides: true,     // 활성 슬라이드 중앙 배치
        slidesPerView: 'auto',    // CSS에서 너비 지정
        spaceBetween: 16,         // 슬라이드 간격

        // 루프 설정 (4개 슬라이드에 최적화)
        loop: true,
        loopedSlides: 4,          // ★ 실제 슬라이드 수와 동일하게 설정

        // 부드러운 전환
        speed: 350,
        grabCursor: true,

        // 네비게이션 버튼
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 슬라이드 변경 시 안정화
        watchSlidesProgress: true,

        // 반응형 설정
        breakpoints: {
            320: {
                spaceBetween: 12
            },
            430: {
                spaceBetween: 16
            },
            768: {
                spaceBetween: 24
            }
        }
    });

    // ===== 플로팅 UI =====
    function onScroll() {
        const scrollY = window.scrollY;
        if (scrollY > TAB_SHOW_THRESHOLD) {
            floatingTab.classList.add('visible');
            document.body.classList.add('tab-visible');
        } else {
            floatingTab.classList.remove('visible');
            document.body.classList.remove('tab-visible');
        }

        const section03El = document.getElementById('section03');
        if (section03El) {
            const ctaShowPoint = section03El.offsetTop - 1000;
            if (scrollY > ctaShowPoint) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        }
    }

    let isWindowScrolling = false;
    window.addEventListener('scroll', function () {
        if (!isWindowScrolling) {
            requestAnimationFrame(function () {
                onScroll();
                isWindowScrolling = false;
            });
            isWindowScrolling = true;
        }
    });
});
