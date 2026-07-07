import { Button, Card, CTA, FaqList, JsonLd, PageHero, Photo, Section, SectionTitle } from '../components';
import { faqs, pageMeta, photos, site } from '../content';
import { breadcrumbSchema, faqSchema } from '../schema';
import { makeMetadata } from '../seo';
import { Reveal } from '../ui';

export const metadata = makeMetadata(pageMeta.location);

export default function Page() {
  return <main>
    <JsonLd data={breadcrumbSchema([{ name: '홈', path: '/' }, { name: '오시는 길', path: pageMeta.location.path }])} />
    <JsonLd data={faqSchema(faqs.location)} />

    <PageHero crumb="오시는 길" eyebrow="오시는 길" title="테오짐 PT 청라점" desc={`${site.address}. 예약제로 운영하며 방문 전 네이버 예약 또는 전화로 시간을 확인해주세요.`} />

    <Section>
      <div className="grid items-start gap-12 md:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Visit" title="방문 안내" />
          <div className="mt-8 grid gap-4">
            <Card title="주소">
              <p>{site.address}</p>
            </Card>
            <Card title="영업시간">
              <ul className="space-y-1">
                <li>{site.hours.weekday.label} {site.hours.weekday.open} ~ {site.hours.weekday.close} (입장 마감 {site.hours.weekday.lastEntry})</li>
                <li>{site.hours.saturday.label} {site.hours.saturday.open} ~ {site.hours.saturday.close} (입장 마감 {site.hours.saturday.lastEntry})</li>
                <li>{site.hours.closed}</li>
              </ul>
              <p className="mt-3 text-sm">{site.hours.note}</p>
            </Card>
            <Card title="연락처">
              <p>전화 {site.telephone}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={site.links.place} variant="outline">네이버 플레이스</Button>
                <Button href={site.links.reservation} variant="outline">네이버 예약</Button>
                <Button href={site.links.talk} variant="outline">네이버 톡톡</Button>
                <Button href={site.links.phone} variant="outline">전화 상담</Button>
              </div>
            </Card>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Photo spec={photos.locationMap} />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href={site.links.directions}>네이버 지도에서 길찾기</Button>
          </div>
        </Reveal>
      </div>
    </Section>

    <Section tone="sand">
      <SectionTitle eyebrow="Studio" title="스튜디오 미리보기" desc="통창 전망과 머신·프리웨이트 존을 갖춘 5층 스튜디오입니다. 예약제로 운영되어 쾌적하게 이용할 수 있습니다." />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal><Photo spec={photos.facility1} /></Reveal>
        <Reveal delay={100}><Photo spec={photos.facility2} /></Reveal>
      </div>
    </Section>

    <Section>
      <SectionTitle eyebrow="FAQ" title="방문 전 자주 묻는 질문" />
      <div className="mt-10"><Reveal><FaqList items={faqs.location} /></Reveal></div>
    </Section>

    <CTA />
  </main>;
}
