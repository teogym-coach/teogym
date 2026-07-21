import { CTA, FaqList, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, Steps, SystemLink } from '../components';
import { faqs, pageMeta, photos } from '../content';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.bulk);

const forWhom = ['먹어도 살이 잘 붙지 않는 마른 체형', '혼자 운동했지만 몸이 달라지지 않은 분', '중량을 어떻게 늘려야 할지 막막한 분', '자세가 무너진 채 무게만 올려온 분', '근육량 증가를 수치로 확인하고 싶은 분', '식사량 조절까지 함께 관리받고 싶은 분'];
const process = [
  { title: '체형·기록 확인', desc: '현재 근육량, 운동 경험, 식사 습관을 확인합니다.' },
  { title: '성장 계획 설계', desc: '점진적 과부하 원칙으로 중량 성장 계획을 세웁니다.' },
  { title: '1:1 수업 + 기록', desc: '자세를 교정하며 부위별 운동기록을 쌓습니다.' },
  { title: '성장 추적', desc: '중량 변화와 체형 변화를 기록으로 함께 확인합니다.' },
];
const manage = ['마른 체형 벌크업', '근육량 증가 목표 관리', '운동 자세 교정', '점진적 과부하', '부위별 운동기록', '식사량과 생활패턴 관리'];
const related = [
  { title: '운동기록 관리', desc: '중량 성장이 어떻게 기록되고 연결되는지 확인하세요.', href: '/records/' },
  { title: '체형교정 PT', desc: '무너진 자세를 먼저 잡고 중량을 올리고 싶다면.', href: '/posture/' },
  { title: '가격 안내', desc: '상담 후 목적에 맞는 구성과 첫 등록 혜택을 안내합니다.', href: '/pricing/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '벌크업 PT', path: pageMeta.bulk.path }])} />
    <JsonLd data={serviceSchema({ name: '청라 벌크업 PT', description: pageMeta.bulk.description, path: pageMeta.bulk.path })} />
    <JsonLd data={faqSchema(faqs.bulk)} />

    <PageHero crumb="벌크업 PT" eyebrow="청라 벌크업 PT" title="무작정 많이 먹고 무겁게 드는 방식이 아니라 기록으로 성장 방향을 관리합니다" desc="운동기록, 중량 변화, 체형 변화를 함께 확인하며 마른 몸을 탄탄하게 만드는 과정을 설계합니다." />

    <Section>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="For You" title="이런 분께 권합니다" />
          <ul className="mt-8 space-y-3">{forWhom.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul>
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.bulkSession} /></Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Process" title="벌크업 PT 진행 방식" desc="근육은 기록 위에서 자랍니다. 지난 수업의 중량과 수행 기록이 다음 수업의 출발점이 됩니다." />
      <div className="mt-10"><Reveal><Steps items={process} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="Care" title="함께 관리하는 항목" />
      <div className="mt-10"><Reveal><FeatureList items={manage} /></Reveal></div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="벌크업 PT 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.bulk} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <SystemLink text="테오짐의 상담부터 변화 분석까지 전체 관리 과정이 궁금하신가요?" />

    <CTA />
  </main>;
}
