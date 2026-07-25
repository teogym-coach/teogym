import { Fragment } from 'react';
import { Button, CTA, Card, CompareTable, FaqList, FeatureList, JsonLd, PageHero, Photo, Section, SectionTitle, TextLink } from '../components';
import { faqs, pageMeta, photos } from '../content';
import { breadcrumbSchema, faqSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.system);

// 8단계 시스템 카드용 골드 라인 아이콘
function SystemIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    consult: <><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" /><path d="M9 12h.01M13 12h.01M17 12h.01" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" /></>,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M4 10h16" /><path d="M12 14v4" /><path d="M10 16h4" /></>,
    dumbbell: <><path d="M4 9v6" /><path d="M20 9v6" /><path d="M2 10v4" /><path d="M22 10v4" /><path d="M4 12h16" /></>,
    record: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5" /><path d="M8 11h8" /><path d="M8 15h8" /><path d="M8 19h5" /></>,
    heart: <path d="M12 20s-7-4.4-9.5-9C1 8 2.5 4.5 6 4a5 5 0 0 1 6 2 5 5 0 0 1 6-2c3.5.5 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9Z" />,
    trend: <><path d="M4 17 10 11 14 15 21 7" /><path d="M15 7h6v6" /></>,
  };
  return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-accent-deep">{paths[name]}</svg>;
}

function StepConnector() {
  return <div aria-hidden className="flex justify-center py-0.5 sm:hidden">
    <svg viewBox="0 0 12 12" className="h-4 w-4 text-accent/50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>;
}

// 8단계 개요 카드 — 실제 관리 방식에 맞춘 단계명(상담→움직임 평가→목표 설정→수업 계획→PT 수업→운동기록→수업 후 피드백→다음 수업 설계 및 변화 확인)
const steps = [
  { icon: 'consult', title: '상담', desc: '목표, 운동 경험, 빈도, 생활패턴과 불편 부위를 확인합니다.' },
  { icon: 'activity', title: '움직임 평가', desc: '기본 움직임, 좌우 차이와 불편한 동작을 확인합니다.' },
  { icon: 'target', title: '목표 설정', desc: '몸 상태와 일정에 맞는 현실적인 목표로 구체화합니다.' },
  { icon: 'calendar', title: '수업 계획', desc: '빈도, 부위, 종목, 강도, 순서와 회복을 계획합니다.' },
  { icon: 'dumbbell', title: 'PT 수업', desc: '대표가 직접 자세와 강도를 확인하며 진행합니다.' },
  { icon: 'record', title: '운동기록', desc: '종목, 중량, 횟수, 세트와 회원 반응을 기록합니다.' },
  { icon: 'heart', title: '수업 후 피드백', desc: '몸 상태, 근육통, 강도 체감과 회복을 확인합니다.' },
  { icon: 'trend', title: '다음 수업 설계', desc: '기록을 근거로 다음 수업의 방향을 결정합니다.' },
] as const;

// 단계별 상세 설명 — 검색엔진과 AI가 각 단계를 구체적으로 읽을 수 있도록 텍스트로 확장
const stepDetails: readonly { title: string; intro: string; items: readonly string[]; href?: string }[] = [
  {
    title: '1. 상담',
    intro: '운동 목표, 운동 경험, 가능한 운동 빈도, 생활 패턴, 기존에 불편했던 부위, 선호하는 운동 방식을 확인합니다. 의학적 진단을 내리는 과정이 아니라 운동 방향을 정하기 위한 상담입니다.',
    items: ['운동 목표', '운동 경험', '가능한 운동 빈도', '생활 패턴', '기존 불편 부위', '선호하는 운동 방식'],
  },
  {
    title: '2. 움직임 평가',
    intro: '기본적인 움직임과 자세, 좌우 움직임 차이, 운동 시 불편이 발생하는 동작을 확인합니다. 운동을 시작하기 전 우선적으로 보완할 부분을 확인하는 과정이며, 교정을 보장하거나 통증을 치료하는 과정이 아닙니다.',
    items: ['기본 움직임과 자세 확인', '좌우 움직임 차이 확인', '불편이 발생하는 동작 확인', '우선 보완할 부분 확인'],
  },
  {
    title: '3. 목표 설정',
    intro: '체중 감량, 체력 향상, 근력 증가, 벌크업, 운동 습관 형성, 자세와 움직임 개선처럼 목표를 구체화합니다. 회원의 일정과 운동 경험을 고려해 현실적인 단계로 나눕니다.',
    items: ['체중 감량', '체력 향상', '근력 증가', '벌크업', '운동 습관 형성', '자세와 움직임 개선'],
  },
  {
    title: '4. 수업 계획',
    intro: '주간 운동 빈도, 운동 부위, 운동 종목, 강도, 운동 순서, 휴식과 회복을 계획합니다. 모든 회원에게 같은 루틴을 제공하지 않고, 목표와 몸 상태에 맞춰 계획을 다르게 구성합니다.',
    items: ['주간 운동 빈도', '운동 부위', '운동 종목', '강도', '운동 순서', '휴식과 회복'],
  },
  {
    title: '5. PT 수업',
    intro: '대표가 직접 수업하며 운동 자세와 강도를 확인하고, 당일 컨디션에 따라 조절합니다. 동작을 단순히 따라 하는 것이 아니라 목적을 이해하도록 설명합니다.',
    items: ['대표가 직접 수업', '운동 자세와 강도 확인', '당일 컨디션에 따른 조절', '동작의 목적 설명'],
  },
  {
    title: '6. 운동기록',
    intro: '운동 종목, 중량, 반복 횟수, 세트, 운동 부위, 회원 반응, 다음에 확인할 부분을 기록합니다.',
    items: ['운동 종목', '중량', '반복 횟수', '세트', '운동 부위', '회원 반응', '다음에 확인할 부분'],
    href: '/records/',
  },
  {
    title: '7. 수업 후 피드백',
    intro: '수업 후 몸 상태, 근육통 정도, 운동 강도 체감, 회원 메모, 회복 상태를 기록합니다. 회원 전용 앱 기능과 일치하는 항목만 남깁니다.',
    items: ['수업 후 몸 상태', '근육통 정도', '운동 강도 체감', '회원 메모', '회복 상태'],
  },
  {
    title: '8. 다음 수업 설계 및 변화 확인',
    intro: '직전 기록을 확인하고 같은 부위의 이전 수업과 비교해 강도를 유지하거나 조절합니다. 필요한 동작을 반복하거나 변경하며 다음 수업의 운동 부위와 방향을 결정합니다. 기록이 다음 수업을 만듭니다.',
    items: ['직전 기록 확인', '같은 부위 이전 수업과 비교', '강도 유지 또는 조절', '동작 반복 또는 변경', '다음 수업 부위·방향 결정'],
  },
];

const compareRows = [
  { item: '수업 전', left: '그날의 컨디션 위주로 확인', right: '직전 수업 기록과 몸 상태를 함께 확인' },
  { item: '수업 중', left: '정해진 프로그램을 그대로 진행', right: '기록을 바탕으로 종목과 강도를 조정' },
  { item: '수업 후', left: '수업이 끝나면 종료', right: '몸 상태와 강도 체감을 기록으로 남김' },
  { item: '다음 수업', left: '다음 수업에서 다시 확인', right: '직전 기록을 기준으로 미리 준비' },
  { item: '회원 확인', left: '별도로 확인하기 어려움', right: '회원 전용 앱에서 언제든 확인 가능' },
];

const forWhom = ['PT를 처음 시작하는 분', '이전에 운동을 배웠지만 혼자 하면 방향을 잃는 분', '매번 같은 운동이 반복되는 것이 아쉬웠던 분', '자신의 운동 과정을 기록으로 확인하고 싶은 분', '다이어트와 근력 향상을 함께 관리하고 싶은 분', '운동 자세와 움직임을 세심하게 배우고 싶은 분'];

const coachPoints = ['상담에서 확인한 목표와 움직임을 수업까지 연결합니다', '대표가 직접 기록하고 다음 수업을 준비합니다', '수업 담당자가 자주 바뀌지 않는 구조입니다', '회원별 진행 과정을 지속해서 확인합니다'];

const appFeatures = ['운동 기록', '체중 변화', '건강 기록', '변화 분석', '다음 수업 확인'];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: 'PT 시스템', path: pageMeta.system.path }])} />
    <JsonLd data={faqSchema(faqs.system)} />

    <PageHero
      crumb="PT 시스템"
      eyebrow="테오짐 PT 시스템"
      title="테오짐 PT는 한 번의 수업이 아니라, 연결되는 관리 과정입니다"
      desc="테오짐 PT 청라점은 대표가 직접 상담과 수업을 진행하며, 움직임 평가와 운동기록을 바탕으로 회원별 다음 수업을 설계합니다."
    />

    {/* AI/검색엔진 요약 — 3~5문장 */}
    <Section>
      <Reveal>
        <p className="max-w-3xl text-lg leading-8 text-ink-soft">
          테오짐 PT 청라점은 청라에서 대표가 직접 상담부터 수업까지 진행하는 1:1 PT 스튜디오입니다.
          상담과 움직임 평가로 회원의 목표와 몸 상태를 확인한 뒤, 수업 계획을 세우고 매 수업의 운동기록과 피드백을 남깁니다.
          이렇게 쌓인 기록은 다음 수업의 강도와 종목, 순서를 정하는 기준이 되어 회원마다 다른 맞춤형 PT로 이어집니다.
          체형교정, 다이어트, 벌크업 등 목표와 관계없이 같은 방식으로 관리하며, 운동을 처음 시작하는 분도 무리 없이 시작할 수 있습니다.
        </p>
      </Reveal>
    </Section>

    {/* 8단계 개요 */}
    <Section tone="sand">
      <SectionTitle eyebrow="System" title="테오짐 PT 시스템, 8단계로 진행됩니다" desc="상담부터 다음 수업 설계까지, 매 수업이 같은 흐름으로 이어집니다." />
      <div className="mt-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {steps.map((step, i) => <Fragment key={step.title}>
              <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft ring-1 ring-accent/25"><SystemIcon name={step.icon} /></span>
                  <p className="text-xs font-extrabold tracking-wide text-accent">STEP {String(i + 1).padStart(2, '0')}</p>
                </div>
                <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.desc}</p>
              </div>
              {i < steps.length - 1 && <StepConnector />}
            </Fragment>)}
          </div>
        </Reveal>
      </div>
    </Section>

    {/* 단계별 상세 설명 */}
    <Section>
      <SectionTitle eyebrow="Details" title="단계별로 자세히 살펴보면" desc="각 단계에서 실제로 확인하고 기록하는 항목입니다." />
      <div className="mt-10 grid gap-6">
        {stepDetails.map((d, i) => <Reveal key={d.title} delay={i * 40}>
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card md:p-8">
            <h3 className="text-lg font-bold text-ink">{d.title}</h3>
            <p className="mt-3 leading-7 text-ink-soft">{d.intro}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.items.map((item) => <li key={item} className="rounded-full border border-line bg-sand px-3 py-1.5 text-xs font-semibold text-ink-soft">{item}</li>)}
            </ul>
            {d.href && <p className="mt-4"><TextLink href={d.href}>운동기록 관리 페이지에서 자세히 보기 →</TextLink></p>}
          </div>
        </Reveal>)}
      </div>
    </Section>

    {/* A. 일반적인 PT 진행과 테오짐 시스템의 차이 */}
    <Section tone="sand">
      <SectionTitle eyebrow="Compare" title="수업 단위로 확인할 때와, 기록으로 연결해 관리할 때" desc="어느 쪽이 더 낫다는 비교가 아니라, 테오짐이 운영하는 방식을 항목별로 정리했습니다." />
      <div className="mt-10"><Reveal><CompareTable leftLabel="수업 단위로 확인할 때" rightLabel="기록으로 연결해 관리할 때" rows={compareRows} /></Reveal></div>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-ink-soft">테오짐의 차이는 특별해 보이는 운동을 만드는 것이 아니라, 상담과 수업, 기록과 피드백이 끊기지 않도록 연결하는 데 있습니다.</p>
    </Section>

    {/* B. 이런 분에게 잘 맞습니다 */}
    <Section>
      <SectionTitle eyebrow="For You" title="이런 분에게 잘 맞습니다" />
      <div className="mt-10"><Reveal><FeatureList items={forWhom} /></Reveal></div>
    </Section>

    {/* C. 대표 직접 수업 설명 */}
    <Section tone="sand">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal><Photo spec={photos.coachLesson} /></Reveal>
        <Reveal delay={150}>
          <SectionTitle eyebrow="1:1 Coaching" title="상담한 사람이 직접 수업합니다" />
          <ul className="mt-6 space-y-3">{coachPoints.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul>
          <div className="mt-8"><Button href="/about/" variant="outline">대표 소개 보기</Button></div>
        </Reveal>
      </div>
    </Section>

    {/* 회원 전용 앱 */}
    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Member App" title="회원 전용 앱으로 변화까지 확인" desc="수업이 끝난 뒤에도 운동 기록과 체중 변화, 다음 수업 일정을 회원 전용 앱에서 언제든 확인할 수 있습니다." />
          <div className="mt-8"><Button href="/app/" variant="outline">회원 전용 앱 자세히 보기</Button></div>
        </Reveal>
        <Reveal delay={150}>
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <Photo spec={photos.appDashboard} />
            <div className="mt-8"><Photo spec={photos.appRecords} /></div>
          </div>
        </Reveal>
      </div>
      <div className="mt-10"><Reveal><FeatureList items={appFeatures} /></Reveal></div>
    </Section>

    {/* D. FAQ */}
    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="PT 시스템 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.system} /></Reveal></div>
    </Section>

    <CTA
      title="운동은 같은 프로그램의 반복이 아니라, 다음 수업을 설계하는 과정입니다"
      desc="현재 몸 상태와 운동 기록을 바탕으로 다음 수업을 설계합니다. 상담에서는 현재 상태를 먼저 확인하고 가장 적합한 방향을 함께 제안드립니다."
    />
  </main>;
}
