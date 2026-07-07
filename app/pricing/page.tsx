import { CTA, Card, FaqList, JsonLd, PageHero, Section, SectionTitle } from '../components';
import { faqs, pageMeta } from '../content';
import { breadcrumbSchema, faqSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.pricing);

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '가격 안내', path: pageMeta.pricing.path }])} />
    <JsonLd data={faqSchema(faqs.pricing)} />

    <PageHero crumb="가격 안내" eyebrow="가격 안내" title="필요한 수업 방향은 상담 후 안내드립니다" desc="너무 빠른 결정보다 몸 상태와 목표를 먼저 확인합니다. 상담에서 필요한 구성만 안내드리고 결정은 회원이 합니다." />

    <Section>
      <SectionTitle eyebrow="Pricing" title="수업 구성" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { title: '1:1 PT', desc: '회당 4만원 기준으로 안내드립니다. 대표가 직접 수업하고 매 수업 기록을 남깁니다.' },
          { title: '체험 · 첫 등록', desc: '체험 수업과 첫 등록 혜택은 몸 상태와 목표 상담 후 안내드립니다.' },
          { title: '2:1 수업', desc: '목표, 일정, 구성에 따라 상담 후 안내드립니다.' },
        ].map(({ title, desc }, i) => <Reveal key={title} delay={i * 100}><Card title={title}>{desc}</Card></Reveal>)}
      </div>
      <Reveal><p className="mt-8 max-w-3xl leading-8 text-ink-soft">가격을 상담 후 안내드리는 이유는 사람마다 필요한 수업 횟수와 관리 범위가 다르기 때문입니다. 같은 목표라도 운동 경험, 체형, 생활패턴에 따라 구성이 달라집니다. 상담에서는 현재 몸 상태를 확인하고 필요한 만큼만 제안드립니다.</p></Reveal>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="FAQ" title="가격 관련 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.pricing} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
