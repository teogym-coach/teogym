import { Button, Card, CTA, JsonLd, PageHero, Photo, Section, SectionTitle } from '../components';
import { pageMeta, photos, site } from '../content';
import { breadcrumbSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.cases);

const categories = [
  { title: '다이어트 변화 사례', desc: '체중 변화 그래프와 함께 기록된 감량 과정' },
  { title: '체형교정 사례', desc: '자세와 움직임이 달라진 과정' },
  { title: '벌크업 사례', desc: '중량 기록과 함께 쌓인 근육 성장 과정' },
  { title: '운동기록 관리 사례', desc: '기록이 다음 수업으로 연결되는 방식' },
  { title: '회원 전용 앱 활용 사례', desc: '회원이 직접 변화를 확인하는 모습' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '후기와 사례', path: pageMeta.cases.path }])} />

    <PageHero crumb="후기/사례" eyebrow="후기와 사례" title="공개 가능한 사례만 블로그로 연결합니다" desc="허위 후기를 만들지 않습니다. 실제 공개 가능한 콘텐츠만 카테고리별로 블로그에 연결하는 방식으로 운영합니다." />

    <Section>
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal><div className="mx-auto w-full max-w-md"><Photo spec={photos.postureBeforeAfter} /></div></Reveal>
        <Reveal delay={150}>
          <SectionTitle eyebrow="Real Change" title="변화는 기록으로 남습니다" desc="어깨 가동 범위가 달라진 체형교정 전후 비교처럼, 테오짐의 변화는 사진과 기록으로 남습니다. 공개 가능한 실제 사례만 보여드립니다." />
        </Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Cases" title="카테고리별 사례 보기" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {categories.map(({ title, desc }, i) => <Reveal key={title} delay={i * 60}>
          <Card title={title}>
            <p>{desc}. 블로그에 게시된 실제 공개 콘텐츠로 연결됩니다.</p>
            <div className="mt-5"><Button href={site.links.blog} variant="outline">블로그에서 보기</Button></div>
          </Card>
        </Reveal>)}
      </div>
    </Section>

    <CTA />
  </main>;
}
