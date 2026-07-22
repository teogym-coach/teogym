'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site, type NavItem } from './content';

// ─── Site Header ─────────────────────────────────────────────
// 홈(다크 히어로): 스크롤 전 투명 → 스크롤 후 다크 + blur.
// 그 외 페이지: 기존 warm white 스티키 헤더 그대로.
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isHome) {
    return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/10 bg-night/85 backdrop-blur' : 'border-b border-transparent bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-white">TEO<span className="text-accent">GYM</span></Link>
        <nav aria-label="주 메뉴" className="hidden items-center gap-5 text-sm font-medium text-white/80 lg:flex"><DesktopNav dark /></nav>
        <div className="flex items-center gap-3">
          <a href={site.links.reservation} target="_blank" rel="noopener noreferrer" className="hidden items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-light lg:inline-flex">상담 예약</a>
          <MobileMenu nav={site.nav} reservationHref={site.links.reservation} dark />
        </div>
      </div>
    </header>;
  }

  return <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link href="/" className="text-lg font-extrabold tracking-tight text-ink">TEO<span className="text-accent">GYM</span></Link>
      <nav aria-label="주 메뉴" className="hidden items-center gap-5 text-sm font-medium text-ink-soft lg:flex"><DesktopNav /></nav>
      <div className="flex items-center gap-3">
        <a href={site.links.reservation} target="_blank" rel="noopener noreferrer" className="hidden items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-deep lg:inline-flex">상담 예약</a>
        <MobileMenu nav={site.nav} reservationHref={site.links.reservation} />
      </div>
    </div>
  </header>;
}

// ─── Desktop Nav ─────────────────────────────────────────────
// href만 있는 항목은 일반 링크, children이 있는 항목(프로그램)은 hover/click
// 드롭다운으로 렌더링합니다. 드롭다운과 버튼 사이 간격을 지날 때 닫히지 않도록
// 짧은 close 딜레이를 둡니다.
function DesktopNav({ dark = false }: { dark?: boolean }) {
  return <>{site.nav.map((item) => item.children
    ? <DesktopDropdown key={item.label} label={item.label} items={item.children} dark={dark} />
    : <Link key={item.href} href={item.href!} className={`transition-colors ${dark ? 'hover:text-accent-light' : 'hover:text-ink'}`}>{item.label}</Link>,
  )}</>;
}

function DesktopDropdown({ label, items, dark }: { label: string; items: NonNullable<NavItem['children']>; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpen(true); };
  const closeSoon = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open]);

  return (
    <div ref={rootRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1 transition-colors ${dark ? 'hover:text-accent-light' : 'hover:text-ink'}`}
      >
        {label}
        <svg aria-hidden viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div className={`absolute left-1/2 top-[calc(100%+12px)] z-50 w-44 -translate-x-1/2 rounded-2xl border p-2 shadow-lift ${dark ? 'border-white/10 bg-night/95 backdrop-blur' : 'border-line bg-bg'}`}>
          {items.map(([itemLabel, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${dark ? 'text-white/85 hover:bg-white/10 hover:text-accent-light' : 'text-ink hover:bg-sand hover:text-accent-deep'}`}>
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Scroll Reveal ───────────────────────────────────────────
// globals.css의 .reveal / .is-visible 클래스와 함께 동작합니다.
// prefers-reduced-motion 사용자는 CSS에서 애니메이션이 해제됩니다.
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>;
}

// ─── Count Up ────────────────────────────────────────────────
export function CountUp({ end, suffix = '', prefix = '', duration = 1200 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{value.toLocaleString('ko-KR')}{suffix}</span>;
}

// ─── Mockup Carousel ─────────────────────────────────────────
// Record & Care 섹션 전용: 브랜드 컨셉 목업 3장을 부드러운 opacity crossfade로
// 자동 전환합니다. prefers-reduced-motion 사용자는 자동 전환을 멈추고 첫 장만 보여줍니다.
export function MockupCarousel({ images }: { images: readonly { src: string; alt: string; width: number; height: number }[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div>
      <div className="relative w-full overflow-hidden rounded-3xl border border-line bg-card shadow-card" style={{ aspectRatio: `${images[0].width}/${images[0].height}` }}>
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority={i === 0}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`${i + 1}번째 이미지 보기`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-line'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Mobile Menu ─────────────────────────────────────────────
// 헤더의 backdrop-blur가 fixed 요소의 기준을 헤더로 바꿔 메뉴가 잘리는 문제가
// 있어, 버튼 기준 absolute 드롭다운 카드로 배치합니다. 화면 너비를 넘지 않도록
// min(100vw-여백, max-width)로 제한하고, 내용이 길면 카드 내부에서 스크롤됩니다.
export function MobileMenu({ nav, reservationHref, dark = false }: { nav: readonly NavItem[]; reservationHref: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = () => { setOpen(false); setExpanded(null); };

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) { setOpen(false); setExpanded(null); }
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${dark ? 'border-white/30 bg-white/10' : 'border-line bg-card'}`}
      >
        <span aria-hidden className="relative block h-3.5 w-4">
          <span className={`absolute left-0 top-0 h-0.5 w-full ${dark ? 'bg-white' : 'bg-ink'} transition-transform duration-300 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''}`} />
          <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 ${dark ? 'bg-white' : 'bg-ink'} transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute bottom-0 left-0 h-0.5 w-full ${dark ? 'bg-white' : 'bg-ink'} transition-transform duration-300 ${open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''}`} />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 max-h-[min(calc(100dvh-7rem),32rem)] w-[min(calc(100vw-2rem),20rem)] overflow-y-auto rounded-2xl border border-line bg-bg p-4 shadow-lift">
          <nav aria-label="모바일 메뉴" className="flex flex-col gap-0.5">
            {nav.map((item) => item.children ? (
              <div key={item.label}>
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-sand"
                >
                  {item.label}
                  <svg aria-hidden viewBox="0 0 12 12" className={`h-3 w-3 text-ink-soft transition-transform duration-200 ${expanded === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {expanded === item.label && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-line pl-2">
                    {item.children.map(([label, href]) => (
                      <Link key={href} href={href} onClick={close} className="rounded-xl px-3 py-2 text-[15px] font-medium text-ink-soft hover:bg-sand hover:text-ink">
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href!} onClick={close} className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-sand">
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={reservationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-white"
          >
            무료 체험 상담 예약
          </a>
        </div>
      )}
    </div>
  );
}
