import { CTA, FaqList, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, Steps } from '../components';
import { faqs, pageMeta, photos } from '../content';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.posture);

const forWhom = ['오래 앉아 일하며 어깨·허리가 무거운 직장인', '거북목, 라운드숄더가 신경 쓰이는 분', '골반 불균형, 좌우 비대칭이 느껴지는 분', '무릎이 불편해 운동을 미뤄온 분', '운동을 하고 싶지만 자세가 걱정되는 분', '통증 재발 없이 몸을 쓰고 싶은 분'];
const process = [
  { title: '체형·움직임 확인', desc: '자세, 움직임 패턴, 근력 불균형을 함께 확인합니다.' },
  { title: '운동 방향 설계', desc: '생활패턴과 몸 상태에 맞는 교정 운동 방향을 제안합니다.' },
  { title: '1:1 교정 수업', desc: '대표가 직접 자세와 강도를 조절하며 지도합니다.' },
  { title: '변화 기록', desc: '수행 능력과 움직임 변화를 기록으로 남겨 추적합니다.' },
];
const manage = ['어깨 불편감 관리', '허리 불편감 관리', '골반 불균형 확인', '무릎 불편감 관리', '오래 앉는 직장인 체형관리', '움직임과 근력 균형 체크'];
const related = [
  { title: '다이어트 PT', desc: '체형 관리와 체중 감량을 함께 진행하고 싶다면.', href: '/diet/' },
  { title: '운동기록 관리', desc: '교정 과정의 변화가 어떻게 기록되는지 확인해보세요.', href: '/records/' },
  { title: '가격 안내', desc: '1:1 PT 회당 4만원 기준. 상담 후 구성을 안내합니다.', href: '/pricing/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '체형교정 PT', path: pageMeta.posture.path }])} />
    <JsonLd data={serviceSchema({ name: '청라 체형교정 PT', description: pageMeta.posture.description, path: pageMeta.posture.path })} />
    <JsonLd data={faqSchema(faqs.posture)} />

    <PageHero crumb="체형교정 PT" eyebrow="청라 체형교정 PT" title="통증 부위만이 아니라 자세, 움직임, 근력 불균형을 함께 확인합니다" desc="오래 앉는 생활, 반복되는 움직임, 운동 습관을 살펴보고 몸 상태에 맞는 운동 방향을 제안합니다." />

    <Section>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="For You" title="이런 분께 권합니다" />
          <ul className="mt-8 space-y-3">{forWhom.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul>
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.postureSession} /></Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Process" title="체형교정 PT 진행 방식" desc="교정은 한 번의 스트레칭이 아니라 기록이 쌓이는 과정입니다. 매 수업의 변화를 남기고 다음 수업에 연결합니다." />
      <div className="mt-10"><Reveal><Steps items={process} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="Care" title="함께 관리하는 항목" />
      <div className="mt-10"><Reveal><FeatureList items={manage} /></Reveal></div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="체형교정 PT 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.posture} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
