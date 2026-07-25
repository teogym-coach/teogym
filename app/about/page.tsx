import { CTA, Card, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, TextLink } from '../components';
import { pageMeta, photos } from '../content';
import { breadcrumbSchema, personSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.about);

// 실패 원인부터 → 대표 직접 수업 → 운동기록 → 회원 전용 앱 순으로,
// 김태오 대표가 상담부터 회원 전용 앱 공유까지 이어가는 이유를 설명합니다.
const principles = [
  { title: '실패 원인부터', desc: '운동을 시작하기 전에 지금까지 잘 되지 않았던 이유를 먼저 찾습니다. 원인이 다르면 방법도 달라야 합니다.' },
  { title: '대표가 직접, 끝까지', desc: '상담에서 확인한 목표와 고민을 수업까지 그대로 연결하기 위해서입니다. 담당자가 바뀌며 생기는 정보 단절을 줄이고, 회원의 움직임과 운동 반응을 지속해서 지켜봅니다.' },
  { title: '기록이 남는 PT', desc: '이전 수업을 기억에만 의존하지 않기 위해서입니다. 운동 종목, 중량, 반복 횟수, 부위와 회원 반응을 비교해 같은 수업을 반복하지 않고 회원 상태에 맞춰 조절합니다.' },
  { title: '회원도 확인할 수 있게', desc: '운동 과정을 트레이너만 아는 것이 아니라 회원도 직접 볼 수 있어야 한다고 생각했습니다. 최근 수업 내용과 수업 후 몸 상태, 이전 기록 대비 변화를 회원 전용 앱에서 확인할 수 있습니다.' },
];
const related = [
  { title: '체형교정 PT', desc: '자세, 움직임, 근력 불균형을 함께 확인합니다.', href: '/posture/' },
  { title: '다이어트 PT', desc: '기록과 생활패턴으로 유지되는 감량을 만듭니다.', href: '/diet/' },
  { title: '벌크업 PT', desc: '기록 기반으로 마른 몸의 근육 성장을 관리합니다.', href: '/bulk-up/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '대표 소개', path: pageMeta.about.path }])} />
    <JsonLd data={personSchema({ name: '김태오', jobTitle: '대표', path: '/about/' })} />

    <PageHero crumb="대표 소개" eyebrow="대표 소개" title="운동보다 먼저, 실패 원인을 찾습니다" desc="김태오 대표가 직접 상담하고 수업합니다. 체형교정, 다이어트, 벌크업 경험을 바탕으로 회원의 몸 상태와 목표에 맞게 운동을 설계합니다." />

    <Section>
      <div className="grid items-start gap-12 md:grid-cols-[.85fr_1.15fr]">
        <Reveal><div className="mx-auto w-full max-w-sm"><Photo spec={photos.coachProfile} /></div></Reveal>
        <Reveal delay={150}>
          <SectionTitle eyebrow="Principles" title="테오짐이 일하는 방식" />
          <div className="mt-8 grid gap-4">{principles.map(({ title, desc }) => <Card key={title} title={title}>{desc}</Card>)}</div>
          <ul className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li><TextLink href="/system/">테오짐 PT 시스템 확인하기 →</TextLink></li>
            <li><TextLink href="/records/">운동기록이 다음 수업에 반영되는 과정 →</TextLink></li>
            <li><TextLink href="/app/">회원 전용 앱에서 확인할 수 있는 내용 →</TextLink></li>
          </ul>
        </Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal><Photo spec={photos.coachLesson} /></Reveal>
        <Reveal delay={150}>
          <SectionTitle eyebrow="1:1 Lesson" title="상담부터 수업까지, 한 사람이 관리합니다" desc="첫 상담에서 체형, 운동 경험, 체중 변화, 생활패턴을 확인하고 필요한 관리 방향을 안내합니다. 등록을 서두르게 하지 않습니다. 몸 상태와 목표 확인이 먼저입니다." />
        </Reveal>
      </div>
    </Section>

    <Section>
      <SectionTitle eyebrow="Programs" title="프로그램 보기" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
