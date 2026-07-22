import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { footerNav, site, type Faq, type PhotoSpec } from './content';
import { Reveal } from './ui';

const isExternalHref = (href: string) => href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

// ─── JSON-LD ─────────────────────────────────────────────────
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Header는 라우트/스크롤 인식이 필요해 클라이언트 컴포넌트로 분리됨 → app/ui.tsx의 SiteHeader

// ─── Footer ──────────────────────────────────────────────────
export function Footer() {
  return <footer className="border-t border-line bg-sand px-4 py-14 text-sm text-ink-soft">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="text-base font-extrabold text-ink">테오짐 PT 청라점</p>
          <p className="mt-3 leading-7">{site.tagline}<br />{site.address}<br />전화 {site.telephone}</p>
          <p className="mt-3 leading-7">{site.hours.weekday.label} {site.hours.weekday.open}~{site.hours.weekday.close} · {site.hours.saturday.label} {site.hours.saturday.open}~{site.hours.saturday.close}<br />{site.hours.closed} · 예약제 운영</p>
        </div>
        <nav aria-label="푸터 메뉴" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerNav.map(({ heading, items }) => <div key={heading}>
            <p className="font-bold text-ink">{heading}</p>
            <ul className="mt-3 space-y-2">{items.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-ink">{label}</Link></li>)}</ul>
          </div>)}
          <div>
            <p className="font-bold text-ink">채널</p>
            <ul className="mt-3 space-y-2">
              <li><TextLink href={site.links.reservation}>네이버 예약</TextLink></li>
              <li><TextLink href={site.links.talk}>네이버 톡톡</TextLink></li>
              <li><TextLink href={site.links.blog}>블로그</TextLink></li>
              <li><TextLink href={site.links.instagram}>인스타그램</TextLink></li>
              <li><TextLink href={site.links.youtube}>유튜브</TextLink></li>
              <li><TextLink href={site.links.phone}>전화 상담</TextLink></li>
            </ul>
          </div>
        </nav>
      </div>
      <p className="mt-10 border-t border-line pt-6 text-xs">© TEO GYM. All rights reserved.</p>
    </div>
  </footer>;
}

// ─── CTA ─────────────────────────────────────────────────────
export function CTA({ title, desc }: { title?: React.ReactNode; desc?: string } = {}) {
  return <section className="mx-auto max-w-6xl px-4 py-16">
    <Reveal>
      <div className="rounded-3xl border border-accent/25 bg-sand p-8 md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">Reservation</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-snug text-ink md:text-4xl">{title ?? <>지금 몸 상태와 목표부터<br className="hidden md:block" /> 상담해보세요.</>}</h2>
        <p className="mt-4 max-w-2xl text-ink-soft">{desc ?? '첫 상담에서 체형, 운동 경험, 체중 변화, 생활패턴을 확인한 뒤 필요한 관리 방향을 안내합니다.'}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button href={site.links.reservation}>네이버 예약</Button>
          <Button href={site.links.phone} variant="outline">전화 상담</Button>
          <Button href={site.links.talk} variant="outline">네이버 톡톡</Button>
          <Button href={site.links.directions} variant="outline">찾아오시는 길</Button>
        </div>
      </div>
    </Reveal>
  </section>;
}

// ─── PT 시스템 안내 연결 (보조 CTA) ────────────────────────────
// 프로그램/회원앱 페이지 본문 하단, 주 CTA(상담 예약) 직전에 배치해
// /system/ 페이지로 자연스럽게 연결합니다. outline 버튼이라 예약 버튼과 혼동되지 않습니다.
export function SystemLink({ text, label = '8단계 PT 시스템 확인하기' }: { text: string; label?: string }) {
  return <Section>
    <Reveal>
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card p-6 text-center shadow-card md:p-8">
        <p className="leading-7 text-ink-soft">{text}</p>
        <div className="mt-5 flex justify-center"><Button href="/system/" variant="outline">{label}</Button></div>
      </div>
    </Reveal>
  </Section>;
}

// ─── Button / TextLink ───────────────────────────────────────
export function Button({ href, children, variant = 'primary', compact = false }: { href: string; children: React.ReactNode; variant?: 'primary' | 'outline'; compact?: boolean }) {
  const externalProps = isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const styles = variant === 'primary'
    ? 'bg-accent text-white hover:bg-accent-deep'
    : 'border border-line bg-card text-ink hover:border-accent/40 hover:text-accent-deep';
  return <Link href={href} {...externalProps} className={`inline-flex items-center justify-center rounded-full ${compact ? 'px-4 py-2' : 'px-6 py-3.5'} text-sm font-bold transition-colors ${styles}`}>{children}</Link>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const externalProps = isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return <Link href={href} {...externalProps} className="underline-offset-4 transition-colors hover:text-accent-deep hover:underline">{children}</Link>;
}

// ─── Page Hero (H1 + Breadcrumb) ─────────────────────────────
export function PageHero({ eyebrow, title, desc, crumb }: { eyebrow: string; title: string; desc: string; crumb: string }) {
  return <section className="border-b border-line bg-sand">
    <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <Reveal>
        <nav aria-label="현재 위치" className="text-xs font-medium text-ink-soft"><Link href="/" className="hover:text-accent-deep">홈</Link><span aria-hidden className="mx-2">/</span><span className="text-accent-deep">{crumb}</span></nav>
        <p className="mt-6 text-sm font-bold tracking-wide text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.25] text-ink md:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">{desc}</p>
      </Reveal>
    </div>
  </section>;
}

// ─── Section 골격 ────────────────────────────────────────────
export function Section({ children, tone = 'bg', className = '' }: { children: React.ReactNode; tone?: 'bg' | 'sand'; className?: string }) {
  return <section className={`${tone === 'sand' ? 'bg-sand' : ''} ${className}`}><div className="mx-auto max-w-6xl px-4 py-16 md:py-24">{children}</div></section>;
}

export function SectionTitle({ eyebrow, title, desc }: { eyebrow?: string; title: string; desc?: string }) {
  return <Reveal>
    <div className="max-w-3xl">
      {eyebrow && <p className="text-sm font-bold tracking-wide text-accent">{eyebrow}</p>}
      <h2 className="mt-3 text-2xl font-extrabold leading-snug text-ink md:text-3xl">{title}</h2>
      {desc && <p className="mt-4 leading-8 text-ink-soft">{desc}</p>}
    </div>
  </Reveal>;
}

// ─── Card ────────────────────────────────────────────────────
export function Card({ title, children, href }: { title: string; children: React.ReactNode; href?: string }) {
  const body = <div className={`h-full rounded-2xl border border-line bg-card p-6 shadow-card ${href ? 'lift hover:shadow-lift' : ''}`}>
    <h3 className="text-lg font-bold text-ink">{title}</h3>
    <div className="mt-3 leading-7 text-ink-soft">{children}</div>
    {href && <p className="mt-4 text-sm font-bold text-accent-deep">자세히 보기 →</p>}
  </div>;
  return href ? <Link href={href} className="block h-full">{body}</Link> : body;
}

// ─── Feature List (ul/li — 헤딩 구조를 어지럽히지 않음) ──────
export function FeatureList({ items }: { items: readonly string[] }) {
  return <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-line bg-card p-4 leading-7 text-ink shadow-card"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{item}</li>)}
  </ul>;
}

// ─── 진행 단계 ───────────────────────────────────────────────
// 아이콘은 system/page.tsx의 SystemIcon과 같은 라인 스타일(1.6 stroke, round cap)로 통일합니다.
const stepIconPaths: Record<string, React.ReactNode> = {
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" /></>,
  dumbbell: <><path d="M4 9v6" /><path d="M20 9v6" /><path d="M2 10v4" /><path d="M22 10v4" /><path d="M4 12h16" /></>,
  trend: <><path d="M4 17 10 11 14 15 21 7" /><path d="M15 7h6v6" /></>,
};

function StepIcon({ name }: { name: string }) {
  return <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-accent-deep">{stepIconPaths[name]}</svg>;
}

export function Steps({ items }: { items: readonly { title: string; desc: string; icon?: string }[] }) {
  return <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {items.map((step, i) => <li key={step.title} className="rounded-2xl border border-line bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-extrabold text-accent">{String(i + 1).padStart(2, '0')}</p>
        {step.icon && <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft ring-1 ring-accent/25"><StepIcon name={step.icon} /></span>}
      </div>
      <h3 className="mt-3 font-bold text-ink">{step.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{step.desc}</p>
    </li>)}
  </ol>;
}

// ─── FAQ ─────────────────────────────────────────────────────
export function FaqList({ items }: { items: readonly Faq[] }) {
  return <div className="grid gap-4">
    {items.map(({ q, a }) => <details key={q} className="group rounded-2xl border border-line bg-card p-6 shadow-card">
      <summary className="cursor-pointer list-none font-bold text-ink marker:content-none"><span aria-hidden className="mr-3 text-accent">Q.</span>{q}</summary>
      <p className="mt-4 border-t border-line pt-4 leading-8 text-ink-soft">{a}</p>
    </details>)}
  </div>;
}

// ─── 관련 프로그램 교차 링크 ─────────────────────────────────
export function RelatedLinks({ items }: { items: readonly { title: string; desc: string; href: string }[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map(({ title, desc, href }) => <Card key={href} title={title} href={href}>{desc}</Card>)}
  </div>;
}

// ─── Photo ───────────────────────────────────────────────────
// public/images/에 매니페스트(content.ts의 photos)와 같은 파일명으로 사진을 넣고
// 빌드하면 자동으로 실제 사진이 표시됩니다. 파일이 없으면 같은 비율의
// placeholder가 렌더링되어 교체 시 레이아웃이 밀리지 않습니다.
export function Photo({ spec, priority = false, overlay = false, className = '' }: { spec: PhotoSpec; priority?: boolean; overlay?: boolean; className?: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), 'public', spec.src));

  if (exists) {
    const img = <img
      src={spec.src}
      alt={spec.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      className={`w-full rounded-3xl border border-line object-cover shadow-card ${className}`}
      style={{ aspectRatio: spec.ratio, objectPosition: 'center center' }}
    />;
    if (!overlay) return img;
    // 히어로 등 텍스트 인접 영역용: 밝고 따뜻한 톤을 유지하는 옅은 warm white 그라데이션.
    return <div className="relative">
      {img}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-bg/40 via-transparent to-transparent" />
    </div>;
  }

  return <div
    role="img"
    aria-label={`${spec.alt} (준비 중)`}
    className={`flex w-full items-center justify-center rounded-3xl border border-dashed border-accent/40 bg-sand p-6 text-center ${className}`}
    style={{ aspectRatio: spec.ratio }}
  >
    <div className="text-sm text-ink-soft">
      <p className="font-bold text-accent-deep">{spec.label}</p>
      <p className="mt-2 break-all font-mono text-xs">{spec.src}</p>
      <p className="mt-1 text-xs">비율 {spec.ratio.replace('/', ':')} · 파일 추가 후 빌드하면 자동 교체</p>
    </div>
  </div>;
}
