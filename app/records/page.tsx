import { Button, CTA, Card, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, Steps } from '../components';
import { pageMeta, photos, site } from '../content';
import { breadcrumbSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.records);

const recordItems = ['수업 날짜', '운동 부위', '운동 종목', '중량', '반복 횟수', '세트', '운동 강도(RPE)', '회원 피드백', '수업 후 몸 상태', '다음 수업 예정 부위', '이전 수업 대비 변화'];

const flow = [
  { title: '수업 진행', desc: '예약된 시간에 1:1 수업을 진행합니다.' },
  { title: '운동 내용 기록', desc: '수행한 종목, 중량, 반복 횟수, 세트를 남깁니다.' },
  { title: '회원 반응 확인', desc: '수업 중 반응과 수업 후 몸 상태를 함께 기록합니다.' },
  { title: '이전 기록과 비교', desc: '지난 수업 기록과 비교해 변화를 확인합니다.' },
  { title: '다음 수업 설계', desc: '비교한 내용을 근거로 강도·종목·순서를 준비합니다.' },
];

const benefits = [
  { title: '매 수업이 연결됩니다', desc: '지난 수업의 기록이 다음 수업의 출발점이 되어 운동이 끊기지 않고 이어집니다.' },
  { title: '더 세밀한 강도 조정', desc: '중량, 반복 횟수, RPE 기록을 근거로 다음 수업의 강도를 세밀하게 조정합니다.' },
  { title: '잘하는 점과 보완점 확인', desc: '기록으로 남은 수행 내용을 통해 잘하고 있는 부분과 보완할 부분을 함께 확인합니다.' },
  { title: '기록을 기준으로 한 관리', desc: '담당자의 기억이 아니라 남겨진 기록을 기준으로 관리받을 수 있습니다.' },
  { title: '회원도 확인 가능한 과정', desc: '회원 전용 앱에서 자신의 운동 과정과 변화를 직접 확인할 수 있습니다.' },
];

const appFeatures = ['운동 기록', '체중 변화 그래프', '수업 히스토리', '오늘의 컨디셔닝'];

const related = [
  { title: '회원 전용 앱', desc: '기록이 쌓이는 곳. 체중 변화와 수업 히스토리를 확인하세요.', href: '/app/' },
  { title: '벌크업 PT', desc: '기록 기반 점진적 과부하로 근육 성장을 관리합니다.', href: '/bulk-up/' },
  { title: '다이어트 PT', desc: '공복체중 기록과 인바디 변화로 감량을 관리합니다.', href: '/diet/' },
];

// 실제 회원 정보가 아닌 가상의 예시 화면 (개인정보 없음)
function RecordExampleCard() {
  return <div className="rounded-3xl border border-line bg-card p-6 shadow-card">
    <p className="text-xs font-bold uppercase tracking-widest text-accent">예시 화면 · 실제 회원 정보 아님</p>
    <h3 className="mt-2 text-lg font-bold text-ink">최근 수업: 등</h3>
    <ul className="mt-4 space-y-2 text-sm">
      <li className="flex items-center justify-between rounded-xl bg-sand px-4 py-3"><span className="font-semibold text-ink">랫풀다운</span><span className="text-ink-soft">30kg · 12회 · 3세트</span></li>
      <li className="flex items-center justify-between rounded-xl bg-sand px-4 py-3"><span className="font-semibold text-ink">시티드로우</span><span className="text-ink-soft">25kg · 12회 · 3세트</span></li>
    </ul>
    <div className="mt-4 rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-deep">이전 동일 부위 수업 대비 총 볼륨 8% 향상</div>
    <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-ink-soft"><span className="font-bold text-ink">다음 수업 계획</span><br />왼쪽 광배 자극 확인, 로우 동작 자세 보완</p>
  </div>;
}

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '운동기록 관리', path: pageMeta.records.path }])} />

    <PageHero
      crumb="운동기록 관리"
      eyebrow="운동기록 관리"
      title="왜 테오짐은 모든 수업을 기록할까요?"
      desc="기록은 지난 수업을 보관하는 일이 아니라, 다음 수업을 더 정확하게 만드는 과정입니다."
    />

    {/* AI/검색엔진 요약 — 3~5문장 */}
    <Section>
      <Reveal>
        <p className="max-w-3xl text-lg leading-8 text-ink-soft">
          테오짐 PT 청라점은 대표가 직접 수업을 진행하며, 매 수업에서 다룬 운동 종목과 중량, 반복 횟수, 회원의 몸 상태를 기록으로 남깁니다.
          이 기록은 다음 수업을 설계할 때 기준이 되어, 지난 수업과 비교해 강도와 운동 순서를 조정하는 데 쓰입니다.
          운동을 처음 시작하는 분부터 다이어트, 근력 향상, 자세와 움직임 개선을 목표로 하는 회원까지, 같은 방식으로 기록을 남기고 관리합니다.
          회원은 회원 전용 앱에서 자신의 운동기록과 변화 과정을 직접 확인할 수 있습니다.
        </p>
      </Reveal>
    </Section>

    {/* 1) 기억에 의존하는 PT의 한계 */}
    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle
            eyebrow="Why Record"
            title="기억이 아니라 기록에 근거합니다"
            desc="회원마다 진행한 운동, 중량, 반복 횟수, 세트, 운동 부위가 다릅니다. 수업 내용을 기록하지 않으면 이전 수업과의 연결성이 약해지기 쉽습니다. 그날그날 컨디션과 몸 상태가 달라지는데 매번 같은 프로그램만 반복해서는 변화를 만들기 어렵습니다. 테오짐은 이런 이유로 매 수업의 수행 내용을 기록으로 남기고, 그 기록을 근거로 다음 수업의 방향을 정합니다."
          />
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.recordsSheet} /></Reveal>
      </div>
    </Section>

    {/* 2) 테오짐이 기록하는 항목 */}
    <Section tone="sand">
      <SectionTitle eyebrow="Records" title="테오짐이 기록하는 항목" desc="매 수업마다 아래 항목을 기록으로 남기고, 회원 전용 앱에서 함께 확인할 수 있습니다." />
      <div className="mt-10"><Reveal><FeatureList items={recordItems} /></Reveal></div>
    </Section>

    {/* 3) 기록이 다음 수업에 반영되는 과정 */}
    <Section>
      <SectionTitle eyebrow="Process" title="기록이 다음 수업에 반영되는 과정" desc="수업 진행부터 다음 수업 설계까지, 5단계로 이어집니다." />
      <div className="mt-10"><Reveal><Steps items={flow} /></Reveal></div>
    </Section>

    {/* 4) 회원에게 생기는 변화 */}
    <Section tone="sand">
      <SectionTitle eyebrow="For Members" title="회원에게 생기는 변화" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ title, desc }, i) => <Reveal key={title} delay={i * 60}><Card title={title}>{desc}</Card></Reveal>)}
      </div>
    </Section>

    {/* 5) 실제 기록 예시 UI */}
    <Section>
      <SectionTitle eyebrow="Example" title="실제 기록은 이렇게 남습니다" desc="개인정보가 없는 가상의 예시 화면입니다. 실제 회원 전용 앱 화면 구성을 기준으로 만들었습니다." />
      <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
        <Reveal><RecordExampleCard /></Reveal>
        <Reveal delay={150}><Photo spec={photos.appRecords} /></Reveal>
      </div>
    </Section>

    {/* 6) 회원 전용 앱 설명 */}
    <Section tone="sand">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Member App" title="회원 전용 앱에서 기록을 확인합니다" desc="테오짐 회원은 회원 전용 앱에서 수업 기록과 최근 운동 내용을 확인할 수 있습니다. 운동 기록, 체중 변화 그래프, 수업 히스토리, 오늘의 컨디셔닝을 언제든 열어볼 수 있습니다." />
          <div className="mt-6"><FeatureList items={appFeatures} /></div>
          <div className="mt-8"><Button href="/app/" variant="outline">회원 전용 앱 자세히 보기</Button></div>
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.appDashboard} /></Reveal>
      </div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <CTA
      title="기록이 쌓일수록 수업은 더 구체적으로 달라집니다"
      desc="현재 운동 상태와 목표를 확인한 뒤, 어떤 방식으로 수업을 기록하고 관리하는지 상담에서 직접 설명드립니다."
      buttons={[
        { label: '상담 예약하기', href: site.links.reservation, variant: 'primary' },
        { label: '네이버에서 상담 예약하기', href: site.links.reservation, variant: 'outline' },
        { label: '테오짐 PT 시스템 보기', href: '/system/', variant: 'outline' },
      ]}
    />
  </main>;
}
