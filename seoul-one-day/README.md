# 서울의 하루, 나만의 여행 — 사이트 분석 & 로컬 클론

원본: https://seoul-one-day-many-stories.pegeechmco.chatgpt.site/ (2026-11-09 캡처)
클론 경로: `D:\dev\seoul-one-day`
실행: `cd D:\dev\seoul-one-day && python -m http.server 8123` → http://127.0.0.1:8123/
(파일 직접 열기(file://)도 대부분 동작하지만 미디어 자동재생 정책·폰트 로딩 때문에 로컬 서버 권장)

---

## 1. 정체

ChatGPT Sites로 배포된 **정적 8장 인터랙티브 프레젠테이션**(여행 제안서). 서버·DB·API 호출 없음.
- 슬라이드 8장: 표지 → 취향별 경험(차트) → 궁궐·문화 → 동네의 맛 → 한강·야경 → 3일 코스 → 여행의 시작 → 제작 안내
- AI 생성 이미지 13장(PNG, 2.1–3.5MB), 무음 MP4 2편(15.0s / 16.5s), SUIT 가변폰트(624KB)
- 총 59MB, 외부 요청은 폰트·이미지·영상·`app.js`·`style.css` 뿐. 저장소(localStorage/indexedDB/cookie) 사용 0.

## 2. 아키텍처

파일 4종 + 자산:

| 파일 | 크기 | 역할 |
|---|---|---|
| `index.html` | 21.7KB (CF 주입 스크립트 제거 후 17.7KB) | 마크업 8슬라이드 + dialog 2개. 인라인 스타일/스크립트 없음 |
| `style.css` | 50.8KB | 디자인 시스템 전체(202 규칙, @keyframes 5, @media 22, 프린트 스타일 포함) |
| `app.js` | 25.0KB (sha256 `c9b22de5…`, 19,071 UTF-16) | IIFE 하나. 상태·이벤트·데이터 전부 |
| `assets/` | 59MB | 이미지 13 + 로고 1 + MP4 2 + woff2 1 |

DOM 규모(REA 실측): 노드 737, `<button>` 45, `<a>` 8, `<script>` 1, 프레임 1.

**상태 모델** — 전역 `current`(0–7) 하나가 진실원. `go(n)`이
① `.slide` hidden 토글 + `.active` 클래스 ② 레일 `aria-current` ③ 하단 페이지/제목/진행바(폭 %) ④ `prev`/`next` disabled ⑤ 라이브 리전 텍스트 ⑥ `history.replaceState('#n+1')` ⑦ 표지·마지막 영상 재생 동기화 ⑧ 카운터/바 재생 `replay()` ⑨ `window.scrollTo(top)` ⑩ `seoul-slide-change` 커스텀 이벤트를 한 번에 처리.

**라우팅** — `#1`~`#8` 해시. `hashchange` → `go()`. 딥링크·뒤로가기 없이 replaceState만 사용(히스토리 오염 없음).

**데이터 주입** — 서버 없이 JS 상수 배열 5개(`heritage` 3, `culture` 3, `tastes` 4, `night` 3, `days` 3) + `photoPaths` 맵을 `textContent`/`replaceChildren`으로 DOM에 주입. HTML 문자열 조립을 피해 XSS 여지를 줄임(단, `#detailLink.href`만 데이터 유래).

**오버레이** — 네이티브 `<dialog>` 2개(`#overviewDialog` 전체 슬라이드, `#detailDrawer` 상세). `showModal()`+`::backdrop` 블러, `body.detail-open`으로 스크롤 잠금, 좌/우에서 들어오는 방향(`drawer-left/right`)을 트리거 위치로 결정.

**미디어 라이프사이클** — `syncDayCover(show)`/`syncClosingShorts(show)`: 슬라이드 진입 시 `currentTime=0`+`play()`, 이탈 시 `pause()`. `visibilitychange`로 탭 숨김 시 정지·복귀 시 재개. 토글 버튼 라벨/aria-label 동기화.

**숫자 애니메이션** — `data-count`/`data-decimals` 엘리먼트를 `requestAnimationFrame`으로 900ms 감속(1-(1-p)^3) 카운트. `prefers-reduced-motion`이면 즉시 최종값.

**차트** — `.bar-row` 4개에 pointerenter/focus/click(=`activateOnIntent`). 선택 시 `--accent` 상속 → `.focus-ring` 색·라벨·설명·숫자(800ms) 갱신, 나머지 행 `data-chart-active` 해제.

**이미지** — 최초 3장만 마크업에 있고 나머지는 `new Image()` 프리로드(`warmPhotos`, `{once:true}`). `setPhoto()`는 `data-asset` 캐시로 같은 이미지 재요청 회피 후 `photoReveal` 애니메이션 재생.

**접근성** — `aria-current`(레일), `aria-pressed`(그룹 선택), `aria-selected`(일차 탭), `aria-hidden`(비활성 슬라이드), `#live` 라이브 리전, `:focus-visible` 3px 아웃라인, 키보드 ←/→/PageUp/Down/Home/End/Space/F, 탭 ArrowLeft/Right, 터치 스와이프(±75px, 종횡비 1.6 조건), `prefers-reduced-motion` 전역 차단.

**프린트** — `@media print`에서 슬라이드 전부 펼쳐 297×167mm(16:9) 페이지브레이크 → 8장 PDF/배포용 인쇄 최적화. 내비·진행바·dialog는 숨김.

## 3. 디자인 시스템 (style.css에서 추출)

색 (CSS 변수):
```
--red    #d52b48   주 강조(브랜드·현재 페이지·에러)
--yellow #efac19   보조(카운터·브랜드 마크)
--purple #65518d   궁궐/역사
--teal   #159e9e   포커스·안내
--ink    #353f42   본문
--muted  #6e7778   보조 텍스트
--line   #e6e8e7   구분선
--paper  #ffffff   슬라이드 배경(#f4f5f4 페이지 배경)
```
4색 포인트 + 저채도 잉크 조합. 슬라이드마다 `--accent`를 바꿔 같은 컴포넌트(번호 원, 링, 바, 탭)가 섹션 색을 따라감.

타이포: `SUIT Variable`(100–900, woff2 624KB) 단일. h1 `clamp(27px,3.2vw,58px)`/자간 -1.8px, eyebrow 11px·자간 1.8px, 본문 16px/1.7, 소스표기 10px. 1500px↑에서 h1·숫자·링이 한 단계 확대.

레이아웃: `max-width:1920px`, topbar 76px, 좌측 레일 7.6%(번호 01–08), 본문 좌 9.8%/우 4.8%, bottom-bar 74px, 하단 진행바 3px(빨→노→보→청 그라디언트). 12열 그리드가 아니라 섹션별 grid-template(39/56, 48/47, 62/34, 52/43)로 조판.

브레이크포인트: 1500(대형), 1000(중간, 라벨 축소·일부 숨김), 760(모바일: 레일 상단 이동·1열 스택·폰트 재조정), `max-height:740`(노트북 낮은 화면), `orientation:landscape and max-height:600`, print.

모션(전부 CSS, JS 타이머 없음):
- `slideIn` .6s `cubic-bezier(.2,.8,.2,1)` — 슬라이드 진입(투명→14px 상승)
- `drawerFromRight/Left` — 상세 드로어 방향 진입
- `photoReveal` — blur(3px)+opacity .45 → 선명(이미지 교체 시)
- `.day-panel.changing` stagger 0/70/140ms — 3정거장 순차 등장
- `#progress` width .45s — 페이지 이동
- 호버: 버튼 `translateY(-2px)`, 준비목록 `translateX(7px)`+번호 원 채움, `night-orbit` scale(2.2), 문화 선택 원 채움+`translateY(-3px)`
- `prefers-reduced-motion`이면 전부 `animation:none/transition:none`

## 4. 클론 검증 (실측)

REA 증거(로컬 CDP 관찰, Chrome/145.0.7632.6):
- `ev_f72c1389…` list_browser_targets — 대상 1개, origin 일치
- `ev_33c1eca6…` inspect_web_page — DOM 737노드, 스크립트 1개, 스토리지 0, 리소스 9종
- `ev_7f414a6c…` inspect_web_event_listeners — `.rail button` click 핸들러 `app.js:20`, 스크립트 sha256 `c9b22de5200e5013aebc92c7d287121b5028d631837514ed46d6f80d9081064d`

클론 결과:
- 8슬라이드 전환·해시 라우팅·진행바 정상, SUIT 폰트 로드(`document.fonts.check` true)
- 영상 2편 readyState 4(15.0s / 16.5s), 표지 자동재생, 마지막 슬라이드 진입 시 재생
- 차트 클릭 → 링/라벨/숫자 갱신, 상세 드로어 열림(섹션 2개·이미지 교체·body 잠금), 일차 탭 전환(테마/3정거장/조정문구)
- 픽셀 비교 1440×900, 라이브 vs 로컬: 슬라이드 2·3·4·5·6·8 **완전 일치(0.000%)**, 슬라이드 1(2.10%)·7(0.04%)은 **영상 프레임 타이밍 차이만**
- 파일 해시: `app.js` `c9b22de5…`, `style.css` `7e24830a…` 원본과 바이트 동일

## 5. 원본과 다른 점 (의도적, 전부 기록)

1. `index.html`에서 **Cloudflare 봇검사 주입 `<script>` 1개 제거** — 원본은 방문 시 CF가 `cdn-cgi/challenge-platform/...`를 iframe으로 주입. 로컬에선 404만 유발하므로 삭제. 원본 HTML은 `_original/source-with-cloudflare.html`에 그대로 보관.
2. `index.html`의 CRLF → LF 정규화(내용 동일). `app.js`/`style.css`는 **원본 바이트 그대로**(해시 일치).
3. 외부 링크(visitseoul 등 5개)는 그대로 두어 클릭 시 원본 사이트로 이동.

## 6. 재사용할 때 손볼 지점

- **이미지 34MB**: PNG 원본 그대로. 웹 배포 시 webp/avif 1600px로 리사이즈하면 60–80% 절감(코드 변경 없음, 파일만 교체).
- **문구·데이터**: `app.js` 상단 상수 배열 5개가 전부. `window.SEOUL_ASSETS`를 미리 정의하면 경로 규칙도 바꿀 수 있음.
- **섹션 추가**: `<section class="slide" data-title="…">` + 레일 버튼 `data-goto` + `go()`의 `slides.length` 계산이 이미 일반화되어 있어 마크업만 추가하면 9장도 동작.
- **색 교체**: `:root`의 4색만 바꾸면 전체 파생(테두리·링·진행바·선택 상태)이 따라옴.
- **주의**: 폰트는 SUIT(OFL) — 임베드 재배포 가능. 이미지는 "AI 생성" 표기가 본문에 명시되어 있으니 그 표기를 지우지 말 것.
