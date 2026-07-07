import { CTA, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle } from '../components';
import { pageMeta, photos } from '../content';
import { breadcrumbSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.records);

const items = ['운동 종목', '세트', '횟수', '중량', 'RPE(운동 강도)', '부위별 운동 기록', '다음 수업 루틴 연결', '변화 추적'];
const related = [
  { title: '회원 전용 앱', desc: '기록이 쌓이는 곳. 체중 변화와 수업 히스토리를 확인하세요.', href: '/app/' },
  { title: '벌크업 PT', desc: '기록 기반 점진적 과부하로 근육 성장을 관리합니다.', href: '/bulk-up/' },
  { title: '다이어트 PT', desc: '공복체중 기록과 인바디 변화로 감량을 관리합니다.', href: '/diet/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '운동기록 관리', path: pageMeta.records.path }])} />

    <PageHero crumb="운동기록 관리" eyebrow="운동기록 관리" title="수업이 끝나도 기록은 남습니다" desc="기록은 다음 수업의 출발점입니다. 운동 종목과 수행 강도를 남겨 루틴을 연결하고 변화를 추적합니다." />

    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Why Record" title="감이 아니라 기록으로 관리합니다" desc="지난주에 몇 kg을 몇 번 들었는지 기억에 의존하면 성장도 감에 의존하게 됩니다. 테오짐은 매 수업의 수행 내용을 기록으로 남기고, 그 기록을 근거로 다음 수업의 루틴과 강도를 정합니다. 회원은 자신의 변화를 수치로 확인할 수 있습니다." />
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.recordsSheet} /></Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Records" title="매 수업 남기는 기록" />
      <div className="mt-10"><Reveal><FeatureList items={items} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
