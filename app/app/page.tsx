import { CTA, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, SystemLink } from '../components';
import { pageMeta, photos } from '../content';
import { breadcrumbSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.app);

const features = ['체중 변화 그래프', '운동 기록', '건강관리 허브', '루틴 추천', '오늘의 컨디셔닝', '수업 히스토리'];
const related = [
  { title: '운동기록 관리', desc: '앱에 쌓이는 기록이 어떻게 만들어지는지 확인하세요.', href: '/records/' },
  { title: '다이어트 PT', desc: '체중 변화 그래프와 함께 감량을 관리합니다.', href: '/diet/' },
  { title: '후기와 사례', desc: '회원 전용 앱 활용 사례를 블로그에서 확인하세요.', href: '/cases/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '회원 전용 앱', path: pageMeta.app.path }])} />

    <PageHero crumb="회원 전용 앱" eyebrow="회원 전용 앱" title="수업 밖의 시간까지, 하나의 시스템으로" desc="PT를 받을 때만 관리받는 것이 아니라 운동 습관이 이어지도록 관리합니다. 홈페이지와 앱이 하나의 서비스로 연결됩니다." />

    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Member App" title="내 몸의 변화를 언제든 확인" desc="수업에서 남긴 운동기록과 대표가 제안하는 루틴을 회원 전용 앱에서 확인할 수 있습니다. 회원은 수업 후 몸 상태와 운동 강도 체감, 메모를 앱에 남길 수 있고, 트레이너는 수업 기록과 회원 피드백을 함께 확인해 다음 수업의 운동 부위, 종목과 강도를 준비합니다." />
        </Reveal>
        <Reveal delay={150}>
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <Photo spec={photos.appDashboard} />
            <div className="mt-8"><Photo spec={photos.appRecords} /></div>
          </div>
        </Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Features" title="앱에서 확인할 수 있는 것" />
      <div className="mt-10"><Reveal><FeatureList items={features} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <SystemLink text="회원 전용 앱은 테오짐 8단계 관리 시스템의 운동 기록과 변화 분석을 연결합니다." label="전체 PT 관리 시스템 보기" />

    <CTA />
  </main>;
}
