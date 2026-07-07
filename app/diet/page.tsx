import { CTA, FaqList, FeatureList, JsonLd, PageHero, Photo, RelatedLinks, Section, SectionTitle, Steps } from '../components';
import { faqs, pageMeta, photos } from '../content';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.diet);

const forWhom = ['여러 번 다이어트에 실패해본 분', '빠지지 않는 살 때문에 지친 분', '굶는 다이어트로 요요를 겪은 분', '체중보다 체형이 달라지길 원하는 분', '혼자서는 식습관 관리가 어려운 분', '감량 후 유지까지 관리받고 싶은 분'];
const process = [
  { title: '현재 상태 확인', desc: '인바디, 식습관, 생활패턴, 과거 다이어트 이력을 확인합니다.' },
  { title: '감량 방향 설계', desc: '유지 가능한 식사 방향과 운동 계획을 함께 정합니다.' },
  { title: '1:1 수업 + 기록', desc: '근손실을 최소화하는 운동과 공복체중 기록을 병행합니다.' },
  { title: '피드백과 유지', desc: '체중 변화 그래프를 함께 보며 요요 방지 습관을 만듭니다.' },
];
const manage = ['인바디 변화 확인', '공복체중 기록', '식단 피드백', '근손실 최소화 방향', '요요 방지 습관 관리', '생활패턴 점검'];
const related = [
  { title: '체형교정 PT', desc: '감량과 함께 자세·움직임 균형을 잡고 싶다면.', href: '/posture/' },
  { title: '회원 전용 앱', desc: '체중 변화 그래프를 직접 확인하는 방법을 소개합니다.', href: '/app/' },
  { title: '후기와 사례', desc: '실제 다이어트 변화 사례를 블로그에서 확인하세요.', href: '/cases/' },
];

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '다이어트 PT', path: pageMeta.diet.path }])} />
    <JsonLd data={serviceSchema({ name: '청라 다이어트 PT', description: pageMeta.diet.description, path: pageMeta.diet.path })} />
    <JsonLd data={faqSchema(faqs.diet)} />

    <PageHero crumb="다이어트 PT" eyebrow="청라 다이어트 PT" title="식단을 무조건 줄이는 방식이 아니라 기록과 생활패턴을 함께 관리합니다" desc="지속 가능한 체중 관리를 위해 운동기록, 공복체중, 생활 루틴을 함께 확인합니다." />

    <Section>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="For You" title="이런 분께 권합니다" />
          <ul className="mt-8 space-y-3">{forWhom.map((item) => <li key={item} className="flex items-start gap-3 leading-7 text-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul>
        </Reveal>
        <Reveal delay={150}><Photo spec={photos.dietSession} /></Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Process" title="다이어트 PT 진행 방식" desc="급격한 제한은 요요로 돌아옵니다. 기록을 근거로 유지 가능한 속도를 찾는 것이 테오짐의 방식입니다." />
      <div className="mt-10"><Reveal><Steps items={process} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="Care" title="함께 관리하는 항목" />
      <div className="mt-10"><Reveal><FeatureList items={manage} /></Reveal></div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="다이어트 PT 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.diet} /></Reveal></div>
    </Section>

    <Section>
      <SectionTitle eyebrow="More" title="함께 보면 좋은 페이지" />
      <div className="mt-10"><Reveal><RelatedLinks items={related} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
