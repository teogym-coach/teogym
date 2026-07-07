export const site = {
  name: '테오짐 PT 청라점',
  url: 'https://teogym.pages.dev',
  description: '청라에서 체형교정, 다이어트, 벌크업을 함께 관리하는 1:1 PT 스튜디오. 대표가 직접 수업하고 운동기록과 체중 변화를 끝까지 관리합니다.',
  tagline: '몸을 기록하고, 관리하는 곳',
  telephone: '0507-1373-7578',
  address: '인천 서구 청라커낼로 280 청라골든프라자 5층 505호',
  region: '인천 청라',
  businessType: 'PT샵 / 퍼스널트레이닝 / 헬스장',
  keywords: ['테오짐 PT 청라점', '청라 PT', '청라 퍼스널트레이닝', '청라 헬스장', '청라 체형교정', '청라 다이어트 PT', '청라 벌크업 PT', '인천 청라 PT'],
  openGraphImage: {
    url: '/images/og-teogym.png',
    width: 1200,
    height: 630,
    alt: '테오짐 PT 청라점 - 몸을 기록하고 관리하는 청라 1:1 PT 스튜디오',
  },
  hours: {
    weekday: { label: '평일', open: '10:00', close: '22:00', lastEntry: '21:00' },
    saturday: { label: '토요일', open: '10:00', close: '15:00', lastEntry: '14:00' },
    closed: '일요일 · 공휴일 휴무',
    note: '예약제로 운영합니다. 방문 전 네이버 예약 또는 전화로 시간을 확인해주세요.',
  },
  nav: [
    ['메인', '/'], ['대표 소개', '/about/'], ['체형교정 PT', '/posture/'], ['다이어트 PT', '/diet/'], ['벌크업 PT', '/bulk-up/'], ['운동기록', '/records/'], ['회원 앱', '/app/'], ['가격', '/pricing/'], ['후기/사례', '/cases/'], ['오시는 길', '/location/'],
  ] as const,
  links: {
    phone: 'tel:050713737578',
    reservation: 'https://m.booking.naver.com/booking/6/bizes/1369304',
    talk: 'https://talk.naver.com/profile/w4nrgr3',
    blog: 'https://m.blog.naver.com/teogym',
    instagram: 'https://www.instagram.com/teogym_pt',
    youtube: 'https://youtube.com/@gymteo',
    directions: 'https://naver.me/GlRZUOv8',
    place: 'https://naver.me/GlRZUOv8',
    contact: 'https://talk.naver.com/profile/w4nrgr3',
  },
};

// 푸터 내부링크 컬럼 — 모든 페이지에서 전체 내부 페이지로 이동 가능하게 유지합니다.
export const footerNav = [
  { heading: '프로그램', items: [['체형교정 PT', '/posture/'], ['다이어트 PT', '/diet/'], ['벌크업 PT', '/bulk-up/']] },
  { heading: '관리 시스템', items: [['운동기록 관리', '/records/'], ['회원 전용 앱', '/app/']] },
  { heading: '안내', items: [['대표 소개', '/about/'], ['가격 안내', '/pricing/'], ['후기와 사례', '/cases/'], ['오시는 길', '/location/']] },
] as const;

export const pageMeta = {
  home: {
    title: '테오짐 PT 청라점 | 청라 체형교정 다이어트 벌크업 PT',
    description: site.description,
    path: '/',
  },
  about: {
    title: '대표 소개 | 테오짐 PT 청라점',
    description: '김태오 대표가 직접 상담하고 수업하는 청라 1:1 PT 스튜디오. 실패 원인을 찾고 기록이 남는 PT를 설계합니다.',
    path: '/about/',
  },
  posture: {
    title: '청라 체형교정 PT | 테오짐 PT 청라점',
    description: '청라 체형교정 PT. 자세, 움직임, 근력 불균형을 함께 확인하고 몸 상태에 맞는 운동을 지도합니다. 진행 방식과 자주 묻는 질문을 확인하세요.',
    path: '/posture/',
  },
  diet: {
    title: '청라 다이어트 PT | 테오짐 PT 청라점',
    description: '청라 다이어트 PT. 운동기록, 체중 변화, 생활패턴을 함께 관리하며 요요 없이 지속 가능한 변화를 돕습니다. 진행 방식과 FAQ를 확인하세요.',
    path: '/diet/',
  },
  bulk: {
    title: '청라 벌크업 PT | 테오짐 PT 청라점',
    description: '청라 벌크업 PT. 운동기록, 중량 변화, 체형 변화를 바탕으로 마른 체형의 근육 성장을 관리합니다. 진행 방식과 FAQ를 확인하세요.',
    path: '/bulk-up/',
  },
  records: {
    title: '운동기록 관리 PT | 테오짐 PT 청라점',
    description: '운동 종목, 세트, 횟수, 중량, RPE와 부위별 기록을 남겨 다음 수업 루틴과 변화 추적에 연결하는 기록 중심 PT 시스템입니다.',
    path: '/records/',
  },
  app: {
    title: '회원 전용 앱 | 테오짐 PT 청라점',
    description: '체중 변화, 운동 기록, 건강관리 허브, 루틴 추천, 수업 히스토리를 한 곳에서 관리하는 테오짐 회원 전용 시스템입니다.',
    path: '/app/',
  },
  pricing: {
    title: '가격 안내 | 테오짐 PT 청라점',
    description: '테오짐 PT 청라점 가격 안내. 몸 상태와 목표 상담 후 목적에 맞는 수업 구성과 신규 회원 첫 등록 혜택을 안내드립니다.',
    path: '/pricing/',
  },
  cases: {
    title: '후기와 사례 | 테오짐 PT 청라점',
    description: '다이어트, 체형교정, 벌크업, 운동기록 관리, 회원 전용 앱 활용 사례를 블로그에서 확인하세요. 허위 후기 없이 실제 사례만 연결합니다.',
    path: '/cases/',
  },
  location: {
    title: '오시는 길 | 테오짐 PT 청라점',
    description: '테오짐 PT 청라점 오시는 길. 인천 서구 청라커낼로 280 청라골든프라자 5층 505호. 평일 10:00~22:00, 토요일 10:00~15:00, 예약제 운영.',
    path: '/location/',
  },
};

// ─────────────────────────────────────────────────────────────
// 사진 매니페스트
// public/images/ 아래에 같은 파일명으로 사진을 넣고 다시 빌드하면
// 레이아웃 수정 없이 placeholder가 실제 사진으로 교체됩니다.
// ratio는 CSS aspect-ratio로 고정되어 교체 시 레이아웃이 밀리지 않습니다.
// ─────────────────────────────────────────────────────────────
export const photos = {
  heroStudio: { src: '/images/teogym-hero-04.jpg', alt: '테오짐 PT 청라점 스튜디오 전경 - TEO GYM 로고 거울, 스미스머신과 머신 존, 창밖 청라 도시 전망', ratio: '4/3', label: '스튜디오 대표 사진 (가로)' },
  coachProfile: { src: '/images/coach-profile.jpg', alt: '테오짐 PT 청라점 김태오 대표 프로필 - TEO GYM 로고 앞에서', ratio: '3/4', label: '김태오 대표 프로필 (세로)' },
  coachLesson: { src: '/images/coach-lesson.jpg', alt: '김태오 대표가 상담 데스크에서 회원과 1:1 상담을 진행하는 모습', ratio: '4/3', label: '1:1 상담 장면' },
  appDashboard: { src: '/images/app-dashboard.jpg', alt: '테오짐 회원 전용 앱으로 수업 기록을 함께 확인하는 모습', ratio: '9/19', label: '회원 앱 사용 장면 (세로)' },
  appRecords: { src: '/images/app-records.png', alt: '테오짐 회원 전용 앱 운동기록 화면 - 종목, 세트, 횟수, 중량, RPE 기록', ratio: '9/19', label: '회원 앱 운동기록 화면 (세로 스크린샷)' },
  postureSession: { src: '/images/posture-session.jpg', alt: '테오짐 청라 체형교정 PT - 김태오 대표가 회원의 움직임과 가동 범위를 평가하는 모습', ratio: '4/3', label: '움직임 평가 장면' },
  dietSession: { src: '/images/diet-session.jpg', alt: '테오짐 청라 1:1 PT 수업 - 랫풀다운 자세를 옆에서 직접 지도하는 모습', ratio: '4/3', label: '1:1 수업 지도 장면' },
  bulkSession: { src: '/images/bulk-session.jpg', alt: '테오짐 청라 벌크업 PT - 덤벨 숄더 프레스 중량 운동 장면', ratio: '4/3', label: '중량 운동 장면' },
  recordsSheet: { src: '/images/records-sheet.jpg', alt: '테오짐 운동기록 작성 화면 - 종목, 세트, 중량, RPE, 자극도를 태블릿에 기록', ratio: '4/3', label: '운동기록 작성 화면' },
  postureBeforeAfter: { src: '/images/posture-before-after.jpg', alt: '테오짐 체형교정 전후 비교 - 어깨 가동 범위가 달라진 모습', ratio: '1/1', label: '체형교정 전후 비교' },
  facility1: { src: '/images/facility-1.jpg', alt: '테오짐 PT 청라점 시설 - 머신 존과 헤링본 마루, 통창 전망', ratio: '4/3', label: '시설 전경 1' },
  facility2: { src: '/images/facility-2.jpg', alt: '테오짐 PT 청라점 시설 - TEO GYM 로고 거울과 프리웨이트 존', ratio: '4/3', label: '시설 전경 2' },
  locationMap: { src: '/images/location-map.jpg', alt: '테오짐 PT 청라점 위치 지도 - 인천 서구 청라커낼로 280 청라골든프라자 5층 505호', ratio: '16/9', label: '위치 지도 캡처' },
} as const;

export type PhotoSpec = (typeof photos)[keyof typeof photos];

// ─────────────────────────────────────────────────────────────
// FAQ — 화면 렌더링과 FAQPage JSON-LD(app/schema.ts)에 함께 사용됩니다.
// ─────────────────────────────────────────────────────────────
export const faqs = {
  home: [
    { q: '운동을 처음 하는데 등록해도 되나요?', a: '네, 가능합니다. 첫 상담에서 체형, 운동 경험, 체중 변화, 생활패턴을 확인한 뒤 몸 상태에 맞는 강도로 시작합니다. 처음부터 무리한 운동을 시키지 않습니다.' },
    { q: 'PT 가격은 어떻게 되나요?', a: '필요한 수업 횟수와 관리 범위가 사람마다 달라 상담 후 목적에 맞춰 안내드립니다. 신규 회원 한정 첫 등록 혜택도 상담에서 함께 안내드립니다.' },
    { q: '예약은 어떻게 하나요?', a: '네이버 예약, 네이버 톡톡, 전화(0507-1373-7578)로 예약할 수 있습니다. 예약제로 운영하므로 방문 전 시간을 확인해주세요.' },
  ],
  posture: [
    { q: '병원 치료와 병행해도 되나요?', a: '치료가 필요한 통증은 의료기관 진료가 우선입니다. 상담에서 운동으로 관리할 수 있는 범위를 구분해 안내드리고, 몸 상태에 맞는 운동 방향을 제안합니다.' },
    { q: '어떤 분들이 체형교정 PT를 받나요?', a: '오래 앉아 일하는 직장인, 어깨·허리·무릎 불편감이 반복되는 분, 운동을 하고 싶지만 자세가 걱정되는 분들이 주로 찾습니다.' },
    { q: '효과는 언제쯤 느낄 수 있나요?', a: '몸 상태와 생활패턴에 따라 다릅니다. 수업마다 자세, 움직임, 수행 능력을 기록으로 남기기 때문에 변화 과정을 함께 확인할 수 있습니다.' },
  ],
  diet: [
    { q: '식단을 무조건 줄여야 하나요?', a: '아닙니다. 무작정 굶는 방식은 지속되지 않습니다. 운동기록, 공복체중, 생활패턴을 함께 보면서 유지 가능한 식사 방향을 피드백합니다.' },
    { q: '요요가 걱정됩니다.', a: '요요는 대부분 급격한 제한에서 시작됩니다. 근손실을 최소화하는 운동과 습관 관리로 감량 후에도 유지되는 몸을 목표로 합니다.' },
    { q: '체중 변화는 어떻게 확인하나요?', a: '인바디 변화와 공복체중 기록을 함께 봅니다. 회원 전용 앱에서 체중 변화 그래프를 직접 확인할 수 있습니다.' },
  ],
  bulk: [
    { q: '살이 잘 안 찌는 체형인데 가능할까요?', a: '마른 체형의 벌크업이 테오짐의 주요 프로그램 중 하나입니다. 운동기록과 식사량, 생활패턴을 함께 관리하며 근육량 증가를 목표로 합니다.' },
    { q: '무조건 많이 먹어야 하나요?', a: '무작정 많이 먹는 방식은 체지방만 늘기 쉽습니다. 중량 변화와 체형 변화를 기록으로 확인하면서 필요한 만큼의 식사량을 조절합니다.' },
    { q: '벌크업은 얼마나 걸리나요?', a: '시작 시점의 근육량, 운동 경험, 식사 습관에 따라 다릅니다. 점진적 과부하 원칙으로 중량 기록을 쌓으며 성장 속도를 함께 확인합니다.' },
  ],
  pricing: [
    { q: '왜 가격을 상담 후 안내하나요?', a: '몸 상태, 목표, 필요한 수업 횟수가 사람마다 다르기 때문입니다. 상담에서 현재 상태를 확인한 뒤 필요한 구성만 안내드립니다.' },
    { q: '체험 수업이 있나요?', a: '네, 체험 수업과 첫 등록 안내는 상담 시 함께 드립니다. 네이버 예약으로 무료 체험 상담을 신청할 수 있습니다.' },
    { q: '등록을 강요하지는 않나요?', a: '너무 빠른 결정보다 몸 상태와 목표 확인이 먼저입니다. 상담 후 필요한 관리 방향만 안내드리고 결정은 회원이 합니다.' },
  ],
  location: [
    { q: '영업시간이 어떻게 되나요?', a: '평일 10:00~22:00(입장 마감 21:00), 토요일 10:00~15:00(입장 마감 14:00), 일요일과 공휴일은 휴무입니다.' },
    { q: '예약 없이 방문해도 되나요?', a: '예약제로 운영하므로 네이버 예약 또는 전화로 시간을 확인한 뒤 방문해주시는 것이 좋습니다.' },
  ],
} as const;

export type Faq = { q: string; a: string };
