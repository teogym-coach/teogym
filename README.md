# 테오짐 PT 청라점 홈페이지

Next.js App Router, TypeScript, Tailwind CSS 기반 정적 홈페이지입니다. Cloudflare Pages 또는 Vercel 배포가 가능하도록 `next.config.ts`에서 정적 export를 사용합니다.

브랜드 컨셉: **"몸을 기록하고, 관리하는 곳"** — Warm White(#FCFBF8) / Sand Beige(#F4EFE8) / Accent Gold(#C89A5B) 톤의 프리미엄 스튜디오 디자인.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

빌드 결과물은 `out/` 디렉터리에 생성됩니다.

## 구조

- `app/`: 페이지, 공통 컴포넌트(`components.tsx`), 클라이언트 컴포넌트(`ui.tsx` — Reveal/CountUp/모바일 메뉴)
- `app/content.ts`: 상호·주소·영업시간·링크·페이지 메타·FAQ·**사진 매니페스트** — 문구 수정은 대부분 이 파일에서
- `app/seo.ts`: 메타데이터 헬퍼 + 검색엔진 인증 코드
- `app/schema.ts`: FAQ / Breadcrumb / Service 구조화 데이터 헬퍼
- `public/fonts/pretendard/`: 자체 호스팅 Pretendard 다이내믹 서브셋 폰트
- `scripts/generate-assets.mjs`: OG 이미지(PNG)·파비콘 생성 스크립트 (`node scripts/generate-assets.mjs`)

## 사진 교체 방법

1. `app/content.ts`의 `photos` 매니페스트에서 파일명·비율·alt를 확인합니다.
   (예: `/images/teogym-main-hero.jpg`, 비율 16:11 — 메인 히어로는 적용 완료)
2. 같은 파일명으로 `public/images/`에 사진을 넣습니다. 매니페스트의 비율에 맞춰 잘라두면 가장 좋습니다.
3. `npm run build` 후 배포하면 placeholder가 자동으로 실제 사진으로 교체됩니다. 레이아웃 수정이 필요 없습니다.
4. 웹 업로드 전 사진은 가로 1600px 이하, 200~400KB 수준으로 압축하는 것을 권장합니다 (정적 export라 자동 최적화가 없음).

## 아직 남은 TODO (실제 값 발급/확인 후 입력)

- **매장 좌표(geo)**: 네이버지도/구글지도에서 정확한 위도·경도 확인 → `app/layout.tsx`의 `geo` 주석 해제 후 입력
- **실제 사진**: 위 "사진 교체 방법" 참고
