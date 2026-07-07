// 홈페이지 사진 일괄 처리 스크립트
// 실행: node scripts/process-photos.mjs
// 원본은 photo-originals/ 에 보관하고, public/images/ 에는 웹 최적화본만 남깁니다.
// 후보정 원칙: 어두운 사진만 밝기 5~15%, WB 약간 따뜻하게. 나머지는 원본 유지.
import sharp from 'sharp';

const jobs = [
  {
    src: 'photo-originals/CTA용.jpeg', out: 'public/images/coach-profile.jpg',
    // 대표 프로필(3:4): TEO GYM 로고 아래 대표가 중심에 오도록 세로 크롭. 톤 원본 유지.
    crop: (w, h) => ({ left: Math.round(0.55 * w - (h * 0.75) / 2), top: 0, width: Math.round(h * 0.75), height: h }),
    resize: { height: 1600 },
  },
  {
    src: 'photo-originals/상담장면.jpeg', out: 'public/images/coach-lesson.jpg',
    // 상담 장면(4:3): 데스크와 두 사람 중심. 톤 원본 유지 (이미 완성도 높음).
    crop: (w, h) => ({ left: 0, top: Math.round(0.30 * h), width: w, height: Math.round(w * 0.75) }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/움직임평가.jpeg', out: 'public/images/posture-session.jpg',
    // 움직임 평가(4:3): 평가 동작 중심. 톤 원본 유지.
    crop: (w, h) => ({ left: 0, top: Math.round(0.40 * h), width: w, height: Math.round(w * 0.75) }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/PT 수업 장면.jpeg', out: 'public/images/diet-session.jpg',
    // 1:1 수업 지도(4:3): 어두운 사진 → 밝기 +12%, WB 약간 따뜻하게.
    crop: (w, h) => ({ left: 0, top: Math.round(0.34 * h), width: w, height: Math.round(w * 0.75) }),
    grade: (img) => img.recomb([[1.02, 0, 0], [0, 1.0, 0], [0, 0, 0.98]]).modulate({ brightness: 1.12 }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/대표프로필.jpeg', out: 'public/images/bulk-session.jpg',
    // 중량 운동(4:3): 좌상단 워터마크 제거를 겸해 오른쪽 중심 크롭. 톤 원본 유지.
    crop: (w, h) => ({ left: Math.round(0.17 * w), top: 0, width: Math.round(h * (4 / 3)), height: h }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/운동기록확인장면.jpeg', out: 'public/images/records-sheet.jpg',
    // 운동기록 작성 화면(4:3): 무드는 살리고 밝기만 +6%.
    crop: (w, h) => ({ left: Math.round((w - h * (4 / 3)) / 2), top: 0, width: Math.round(h * (4 / 3)), height: h }),
    grade: (img) => img.modulate({ brightness: 1.06 }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/회원앱사용화면.jpeg', out: 'public/images/app-dashboard.jpg',
    // 회원 앱 사용 장면(9:19 세로): 어두운 저녁 조명 → 밝기 +8%, WB 약간 따뜻하게.
    crop: (w, h) => ({ left: 0, top: 0, width: Math.round(h * (9 / 19)), height: h }),
    grade: (img) => img.recomb([[1.02, 0, 0], [0, 1.0, 0], [0, 0, 0.98]]).modulate({ brightness: 1.08 }),
    resize: { width: 900 },
  },
  {
    src: 'photo-originals/교정장면.jpeg', out: 'public/images/posture-before-after.jpg',
    // 교정 전/후 비교(1:1): 크롭 없음(텍스트 보존), 밝기 +8%.
    grade: (img) => img.modulate({ brightness: 1.08 }),
    resize: { width: 1400 },
  },
  {
    src: 'photo-originals/시설1.jpg', out: 'public/images/facility-1.jpg',
    // 시설 전경(4:3 원본 비율): 실내 살짝 +5%.
    grade: (img) => img.modulate({ brightness: 1.05 }),
    resize: { width: 1600 },
  },
  {
    src: 'photo-originals/시설4.jpg', out: 'public/images/facility-2.jpg',
    // TEO GYM 로고 거울 벽(4:3 원본 비율): 톤 원본 유지.
    resize: { width: 1600 },
  },
];

for (const job of jobs) {
  let img = sharp(job.src).rotate();
  const meta = await img.metadata();
  if (job.crop) img = img.extract(job.crop(meta.width, meta.height));
  if (job.resize) img = img.resize({ ...job.resize, withoutEnlargement: true });
  if (job.grade) img = job.grade(img);
  await img.jpeg({ quality: 83, mozjpeg: true }).toFile(job.out);
  const out = await sharp(job.out).metadata();
  console.log(`${job.out}  ${out.width}x${out.height}`);
}
