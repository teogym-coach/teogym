import { Button, Card, CTA, FaqList, JsonLd, Photo, RelatedLinks, Section, SectionTitle, Steps } from './components';
import { faqs, photos, site } from './content';
import { faqSchema } from './schema';
import { CountUp, Reveal } from './ui';

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

    {/* Hero */}
    <section className="border-b border-line bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-[1.05fr_.95fr] md:py-28">
        <Reveal>
          <p className="text-sm font-bold tracking-wide text-accent">청라 프리미엄 1:1 PT 스튜디오</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.2] text-ink md:text-6xl">몸을 기록하고,<br />관리하는 곳</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft">청라에서 체형교정, 다이어트, 벌크업을 함께 관리합니다. 대표가 직접 수업하고 운동기록과 체중 변화를 끝까지 관리합니다.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={site.links.reservation}>무료 체험 상담 예약</Button>
            <Button href="/records/" variant="outline">운동기록 관리 보기</Button>
          </div>
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.heroStudio} priority /></Reveal>
      </div>
    </section>

    {/* 숫자로 보는 테오짐 */}
    <Section>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { value: <CountUp end={40000} suffix="원" />, label: '1:1 PT 회당 기준 가격' },
          { value: <CountUp end={5} suffix="가지" />, label: '매 수업 남기는 기본 기록 — 종목·세트·횟수·중량·RPE' },
          { value: <CountUp end={6} suffix="일" />, label: '주간 운영 — 평일 10~22시 · 토 10~15시' },
        ].map(({ value, label }, i) => <Reveal key={label} delay={i * 100}>
          <div className="rounded-2xl border border-line bg-card p-7 text-center shadow-card">
            <p className="text-3xl font-extrabold text-accent-deep md:text-4xl">{value}</p>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{label}</p>
          </div>
        </Reveal>)}
      </div>
    </Section>

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
          <Card title="가격 안내" href="/pricing/">1:1 PT 회당 4만원 기준. 체험 수업과 첫 등록, 2:1 수업은 몸 상태와 목표 상담 후 안내드립니다.</Card>
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
