import { Button, Card, CTA, FaqList, JsonLd, Photo, RelatedLinks, Section, SectionTitle, Steps } from './components';
import { faqs, photos, site } from './content';
import { faqSchema } from './schema';
import { Reveal } from './ui';

// 히어로 하단 feature 카드용 골드 라인 아이콘
function FeatureIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5" /><path d="m9 13 2 2 4-4" /></>,
    chart: <><path d="M4 19h16" /><path d="M7 16v-4" /><path d="M12 16V9" /><path d="M17 16V5" /></>,
    chat: <><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" /><path d="M9 12h.01M13 12h.01M17 12h.01" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  };
  return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 shrink-0 text-accent">{paths[name]}</svg>;
}

const programs = [
  { title: '체형교정 PT', desc: '불편한 몸을 편하게, 흐트러진 움직임을 균형 있게. 자세와 근력 불균형을 함께 확인합니다.', href: '/posture/' },
  { title: '다이어트 PT', desc: '무작정 굶지 않습니다. 체중 변화와 생활패턴을 함께 관리하며 유지되는 몸을 만듭니다.', href: '/diet/' },
  { title: '벌크업 PT', desc: '마른 몸을 탄탄하게. 운동기록과 중량 변화를 바탕으로 근육 성장을 관리합니다.', href: '/bulk-up/' },
];

const process = [
  { title: '무료 체험 상담', desc: '체형, 운동 경험, 체중 변화, 생활패턴을 확인합니다.' },
  { title: '방향 설계', desc: '몸 상태와 목표에 맞는 운동 방향과 관리 계획을 안내합니다.' },
  { title: '1:1 수업', desc: '대표가 직접 수업하고 매 수업의 수행 내용을 기록합니다.' },
  { title: '기록과 피드백', desc: '운동기록과 체중 변화를 회원 전용 앱에서 함께 확인합니다.' },
];

export default function Home() {
  return <main>
    <JsonLd data={faqSchema(faqs.home)} />

    {/* Hero — 밝은 센터 전경이 화면 전체 배경으로 깔리는 프리미엄 히어로 */}
    <section className="relative">
      <img
        src={photos.heroStudio.src}
        alt={photos.heroStudio.alt}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center md:object-[54%_35%]"
        style={{ filter: 'contrast(1.03) saturate(1.02) brightness(1.02)' }}
      />
      {/* 데스크톱: 텍스트 뒤(~40%)는 거의 흰 배경, 40~60%에서 빠르게 투명, 60% 이후는 원본 사진 */}
      <div aria-hidden className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(90deg, rgba(248,244,238,0.98) 0%, rgba(248,244,238,0.96) 18%, rgba(248,244,238,0.90) 34%, rgba(248,244,238,0.55) 44%, rgba(248,244,238,0.16) 54%, rgba(248,244,238,0.03) 60%, rgba(248,244,238,0) 66%)' }} />
      {/* 모바일: 텍스트 가독성 우선 — 상단은 진하게, 하단은 사진이 선명하게 */}
      <div aria-hidden className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, rgba(248,244,238,0.98) 0%, rgba(248,244,238,0.94) 48%, rgba(248,244,238,0.55) 78%, rgba(248,244,238,0.25) 100%)' }} />
      <div className="relative mx-auto flex min-h-[600px] max-w-6xl items-center px-4 pb-28 pt-20 md:min-h-[760px] md:px-10 md:pb-36 md:pt-24">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-deep">청라 프리미엄 1:1 PT 스튜디오</p>
          <h1 className="mt-6 max-w-[520px] text-4xl font-extrabold leading-[1.15] tracking-tight text-ink md:max-w-[640px] md:text-6xl lg:text-7xl">기록이 만든 변화,<br />테오짐은 다릅니다</h1>
          <p className="mt-7 max-w-[520px] text-lg leading-8 text-ink-soft">정확한 평가, 체계적인 기록, 꾸준한 피드백으로<br className="hidden sm:block" /> 몸의 변화를 끝까지 관리합니다.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={site.links.reservation}>무료 체험 상담 예약</Button>
            <Button href="/records/" variant="outline">운동기록 관리 보기</Button>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Floating feature card — 히어로 하단에 떠 있는 흰색 카드 바 (부드러운 그림자) */}
    <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 md:-mt-24">
      <Reveal>
        <div className="grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-card shadow-[0_20px_50px_rgba(0,0,0,0.08)] lg:grid-cols-5 lg:divide-x lg:divide-y-0">
          {[
            { icon: 'clipboard', title: '정확한 평가', desc: '체형·움직임·체성분을 먼저 확인' },
            { icon: 'chart', title: '기록 기반 관리', desc: '운동·식단·컨디션 모든 과정을 기록' },
            { icon: 'chat', title: '맞춤 피드백', desc: '기록을 바탕으로 꼼꼼한 피드백' },
            { icon: 'user', title: '1:1 프라이빗', desc: '대표가 직접 지도하는 맞춤 수업' },
            { icon: 'shield', title: '지속 가능한 변화', desc: '단기 변화가 아닌 평생 가는 습관' },
          ].map(({ icon, title, desc }) => <div key={title} className="flex items-start gap-4 p-6 lg:flex-col lg:gap-3">
            <FeatureIcon name={icon} />
            <div>
              <h3 className="text-[15px] font-bold text-ink">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-ink-soft">{desc}</p>
            </div>
          </div>)}
        </div>
      </Reveal>
    </section>

    {/* 프로그램 */}
    <Section tone="sand">
      <SectionTitle eyebrow="Programs" title="세 가지 목표, 하나의 관리 방식" desc="어떤 목표든 시작은 같습니다. 몸 상태를 확인하고, 기록을 남기고, 변화를 추적합니다." />
      <div className="mt-10"><Reveal><RelatedLinks items={programs} /></Reveal></div>
    </Section>

    {/* 기록 철학 */}
    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Record & Care" title="수업이 끝나도 기록은 남습니다" desc="종목, 세트, 횟수, 중량, RPE를 매 수업 기록하고 다음 수업 루틴과 변화 추적에 연결합니다. 체중 변화, 운동 기록, 수업 히스토리는 회원 전용 앱에서 언제든 확인할 수 있습니다." />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/records/" variant="outline">운동기록 관리</Button>
            <Button href="/app/" variant="outline">회원 전용 앱</Button>
          </div>
        </Reveal>
        <Reveal delay={150}><div className="mx-auto w-full max-w-[280px]"><Photo spec={photos.appDashboard} /></div></Reveal>
      </div>
    </Section>

    {/* 진행 과정 */}
    <Section tone="sand">
      <SectionTitle eyebrow="Process" title="첫 상담부터 관리까지" />
      <div className="mt-10"><Reveal><Steps items={process} /></Reveal></div>
    </Section>

    {/* 가격 & 후기 */}
    <Section>
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <Card title="가격 안내" href="/pricing/">상담에서 몸 상태와 목표를 확인한 뒤 목적에 맞는 수업 구성과 신규 회원 첫 등록 혜택을 안내드립니다.</Card>
        </Reveal>
        <Reveal delay={100}>
          <Card title="후기와 사례" href="/cases/">허위 후기를 만들지 않습니다. 실제 공개 가능한 사례만 블로그로 연결합니다.</Card>
        </Reveal>
      </div>
    </Section>

    {/* FAQ */}
    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.home} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
