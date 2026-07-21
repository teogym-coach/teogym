import { Fragment } from 'react';
import { Button, CTA, FaqList, FeatureList, JsonLd, PageHero, Photo, Section, SectionTitle } from '../components';
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
    record: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5" /><path d="M8 11h8" /><path d="M8 15h8" /><path d="M8 19h5" /></>,
    dumbbell: <><path d="M4 9v6" /><path d="M20 9v6" /><path d="M2 10v4" /><path d="M22 10v4" /><path d="M4 12h16" /></>,
    heart: <path d="M12 20s-7-4.4-9.5-9C1 8 2.5 4.5 6 4a5 5 0 0 1 6 2 5 5 0 0 1 6-2c3.5.5 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9Z" />,
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M4 10h16" /><path d="M12 14v4" /><path d="M10 16h4" /></>,
    trend: <><path d="M4 17 10 11 14 15 21 7" /><path d="M15 7h6v6" /></>,
  };
  return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-accent-deep">{paths[name]}</svg>;
}

function StepConnector() {
  return <div aria-hidden className="flex justify-center py-0.5 sm:hidden">
    <svg viewBox="0 0 12 12" className="h-4 w-4 text-accent/50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>;
}

const steps = [
  { icon: 'consult', title: '상담', desc: '목표, 운동 경험, 생활습관과 통증을 확인합니다.' },
  { icon: 'activity', title: '움직임 평가', desc: '가동성, 균형과 움직임 패턴을 확인합니다.' },
  { icon: 'target', title: '목표 설정', desc: '몸 상태에 맞는 운동 방향을 정합니다.' },
  { icon: 'record', title: '운동 기록', desc: '무게, 횟수, 강도와 컨디션을 기록합니다.' },
  { icon: 'dumbbell', title: 'PT 수업', desc: '당일 몸 상태에 맞춰 프로그램을 조정합니다.' },
  { icon: 'heart', title: '피드백', desc: '느낌, 통증, 회복 상태를 확인합니다.' },
  { icon: 'calendar', title: '다음 수업 설계', desc: '이번 기록을 바탕으로 다음 운동을 준비합니다.' },
  { icon: 'trend', title: '변화 분석', desc: '체중, 기록, 근력 변화를 앱에서 확인합니다.' },
] as const;

const appFeatures = ['운동 기록', '체중 변화', '건강 기록', '변화 분석', '다음 수업 확인'];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: 'PT 시스템', path: pageMeta.system.path }])} />
    <JsonLd data={faqSchema(faqs.system)} />

    <PageHero
      crumb="PT 시스템"
      eyebrow="테오짐 PT 시스템"
      title="운동을 가르치는 것이 아니라, 변화를 설계합니다"
      desc="테오짐 PT는 평가부터 운동 기록, 다음 수업 설계까지 하나의 시스템으로 관리합니다."
    />

    {/* 8단계 시스템 */}
    <Section>
      <SectionTitle eyebrow="System" title="테오짐 PT 시스템, 8단계로 진행됩니다" desc="상담부터 변화 분석까지, 매 수업이 같은 흐름으로 이어집니다." />
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

    {/* 왜 기록이 중요한가 */}
    <Section tone="sand">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle
            eyebrow="Why Record"
            title="왜 기록이 중요한가"
            desc="테오짐은 단순히 운동 방법을 알려드리는 것이 아닙니다. 지난 수업의 무게, 횟수, 볼륨, RPE, 컨디션 기록을 근거로 다음 운동을 결정합니다. 그래서 같은 목표라도 회원마다 프로그램이 계속 달라지고, 매 수업이 지난 기록 위에서 이어집니다."
          />
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.recordsSheet} /></Reveal>
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

    {/* FAQ */}
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
