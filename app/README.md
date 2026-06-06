# Song's Mobile Invitation — React + Vite

원래의 디자인 핸드오프를 실제 React + Vite
앱으로 재구성한 것입니다. 결혼 안내장(예식 없음 / 혼인신고) — 단일 세로 스크롤,
앱 형태의 모바일 청첩장.

## 실행

```bash
cd app
yarn             # 최초 1회 (yarn install)
yarn dev         # http://localhost:5173 (자동으로 브라우저 오픈)
```

기타 명령:
- `yarn build` — `dist/`로 프로덕션 빌드
- `yarn preview` — 빌드 결과를 로컬에서 미리보기

## 구조

```
app/
├─ index.html              진입점 (Gowun 폰트 로드)
├─ public/florals/         플로럴 PNG (투명, 브랜드 색 사전 적용) → /florals/*
└─ src/
   ├─ main.jsx             React 진입점
   ├─ index.css            디바이스 셸 · 반응형 · 모션 (+ tokens.css import)
   ├─ tokens.css           디자인 토큰 (colors_and_type.css 원본)
   ├─ data.js              ★ 데이터 모델: Petrol 테마 · 콘텐츠 · 프레젠테이션 설정
   └─ components/
      ├─ Florals.jsx       Ornament · LeafDivider · CoverFlorals · CornerSpray
      ├─ ImageSlot.jsx     드래그드롭 사진 슬롯 (localStorage 영속화)
      └─ sections/
         ├─ shared.jsx     폰트 상수 + Eyebrow
         ├─ Cover.jsx · Greeting.jsx · Couple.jsx · Gallery.jsx · Closing.jsx
```

## 내용 수정

문구·이름·날짜는 모두 **`src/data.js`의 `INVITATION` 객체**에서 바꿉니다.
컬러웨이는 **Petrol**(딥 틸 + 골드 라인 플로럴) 한 가지로 고정되어 있습니다
(`THEMES.petrol` / `DEFAULT_COLORWAY`).

## 프로토타입과의 차이

이 앱의 디자인은 CDN React + Babel + 인라인 `<script>` 샌드박스 형태의 프로토타입
에서 출발했습니다(해당 프로토타입은 현재 제거됨). 이 앱으로 옮기면서 달라진 점:

- **Tweaks 패널 제거** — 라이브 편집 패널은 프로토타입 전용이었음. 문구/프레젠테이션
  값(`fontScale`, `spacing`, `floralStyle`, `floralAmount`)을 `data.js`의 고정
  설정으로 전환.
- **컬러웨이 Petrol 고정** — 원본은 Ivory · Petrol · Sage 3종을 스위처로 전환했으나,
  Petrol 한 가지만 남기고 나머지 테마와 스위처 UI를 제거.
- **`<image-slot>` 웹컴포넌트 → React `ImageSlot`** — 드래그드롭 + 클릭 업로드 +
  WebP 다운스케일 + `localStorage` 영속화. **reframe**(채운 사진을 더블클릭 →
  드래그로 위치, 모서리/휠로 크기 조정, Esc·바깥클릭으로 완료)도 포팅했고, 크롭은
  `{u, s, x, y}`로 함께 저장됩니다. 실제 서비스에서는 `id`를 사진 업로드/스토리지에
  연결하세요.
- 테마 기반 인라인 스타일은 픽셀 충실도를 위해 그대로 유지.
