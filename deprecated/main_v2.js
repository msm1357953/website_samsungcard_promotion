/**
 * 삼성카드 프로모션 V2 - Coverflow 3D + Glow + Float
 * 430x932 모바일 최적화
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

    // ===== Swiper.js V2: Coverflow 3D Effect =====
    const cardSwiper = new Swiper('#cardSwiper', {
        // ★ Coverflow 3D 효과
        effect: 'coverflow',

        // 핵심 설정 (안정화됨)
        initialSlide: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,          // ★ 슬라이드 간격 추가 (겹침 방지)

        // 루프 설정
        loop: true,
        loopedSlides: 4,

        // 부드러운 전환
        speed: 400,
        grabCursor: true,

        // ★ Coverflow 효과 파라미터 (겹침 방지 조정)
        coverflowEffect: {
            rotate: 0,           // 회전 없음 (안정성)
            stretch: 0,          // 간격 조정 없음
            depth: 60,           // ★ 3D 깊이감 (120→60 겹침 감소)
            modifier: 1,         // 효과 강도 (1 = 기본)
            scale: 0.9,          // ★ 양옴 카드 축소 비율
            slideShadows: false  // 그림자 끔 (성능)
        },

        // 네비게이션 버튼
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 슬라이드 진행 상태 감시
        watchSlidesProgress: true,

        // 반응형 설정
        breakpoints: {
            320: {
                spaceBetween: 24,
                coverflowEffect: {
                    depth: 50,
                    scale: 0.88
                }
            },
            430: {
                spaceBetween: 30,
                coverflowEffect: {
                    depth: 60,
                    scale: 0.9
                }
            },
            768: {
                spaceBetween: 40,
                coverflowEffect: {
                    depth: 80,
                    scale: 0.92
                }
            }
        }
    });

    // ===== 플로팅 UI =====
    function onScroll() {
        const scrollY = window.scrollY;

        // 상단 플로팅 탭: 300px 이상 스크롤 시 표시
        if (scrollY > TAB_SHOW_THRESHOLD) {
            floatingTab.classList.add('visible');
            document.body.classList.add('tab-visible');
        } else {
            floatingTab.classList.remove('visible');
            document.body.classList.remove('tab-visible');
        }

        // ★ 하단 플로팅 CTA: 500px 이상 스크롤 시 표시 (간단화)
        if (floatingCta) {
            if (scrollY > 500) {
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

    // ★ 페이지 로드 시 초기 상태 설정
    onScroll();
});
