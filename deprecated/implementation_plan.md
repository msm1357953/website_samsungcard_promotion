# 이벤트 2 (LINK 혜택) UI 개편 계획

## Goal Description
`section03` (이벤트 2) 영역을 사용자가 제공한 디자인 시안에 맞춰 전면 수정합니다.
기존의 복잡한 카드 형태를 제거하고, "키비주얼 이미지 + 혜택 리스트 박스 + 자세히 보기 버튼" 구조로 변경합니다.

## User Review Required
> [!IMPORTANT]
> 로고 이미지 파일명이 한글(`assets/로고/쿠팡.png` 등)로 되어 있습니다. 웹에서 한글 파일명이 문제가 될 수 있으므로, 우선은 경로를 그대로 사용하되 문제 발생 시 파일명 변경을 제안할 수 있습니다.

## Proposed Changes

### HTML (`index_v2.html`)
#### [MODIFY] `section03` 내부 구조
- 기존 `.event_card` 등 모든 내부 요소 제거.
- **Header**: "LINK하고 최대 6.8만원 혜택 받기!" 텍스트 + `assets/이벤트2 키비주얼.png`
- **Body**: 흰색 라운드 박스 (`.benefit-box`)
    - `<ul>` 리스트로 제휴사 목록 구현.
    - 각 `<li>`: 로고 이미지 + 텍스트(이름) + 혜택 텍스트(파란색 강조).
- **Footer**: "혜택 자세히보기" 버튼 (`.btn-more-benefit`).

### CSS (`style_v2.css`)
#### [NEW] 이벤트 2 전용 스타일
- `.section03`: 배경색 조정 (디자인 시안에 맞춰 연한 블루그레이 톤 적용, `#f8f9fc` 예상).
- `.key-visual`: 중앙 정렬, 이미지 크기 조정.
- `.benefit-box`: 흰색 배경, `border-radius: 16px`, `box-shadow`, 패딩.
- `.benefit-list`: flex layout, 아이템 간 간격 조정.
- `.benefit-item`: 로고(40x40px 예상) + 텍스트 정렬.
- `.benefit-highlight`: 파란색 텍스트 (`color: #0068ff`).
- `.btn-more-benefit`: 전체 너비, 연한 파란색 배경 (`#e8f0fe`), 파란색 텍스트.

## Verification Plan

### Manual Verification
1. `index_v2.html`을 브라우저(모바일 뷰)에서 엽니다.
2. 스크롤하여 이벤트 2 섹션으로 이동합니다.
3. 키비주얼 이미지가 깨지지 않고 잘 나오는지 확인합니다.
4. 6개의 제휴사 리스트가 로고와 함께 올바른 순서로 나오는지 확인합니다.
5. "혜택 자세히보기" 버튼 스타일을 확인합니다.
