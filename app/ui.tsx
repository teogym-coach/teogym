'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

// ─── Mobile Menu ─────────────────────────────────────────────
// 헤더의 backdrop-blur가 fixed 요소의 기준을 헤더로 바꿔 메뉴가 잘리는 문제가
// 있어, 버튼 기준 absolute 드롭다운 카드로 배치합니다. 화면 너비를 넘지 않도록
// min(100vw-여백, max-width)로 제한하고, 내용이 길면 카드 내부에서 스크롤됩니다.
export function MobileMenu({ nav, reservationHref }: { nav: readonly (readonly [string, string])[]; reservationHref: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
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
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-card"
      >
        <span aria-hidden className="relative block h-3.5 w-4">
          <span className={`absolute left-0 top-0 h-0.5 w-full bg-ink transition-transform duration-300 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''}`} />
          <span className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-ink transition-transform duration-300 ${open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''}`} />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 max-h-[min(calc(100dvh-7rem),32rem)] w-[min(calc(100vw-2rem),20rem)] overflow-y-auto rounded-2xl border border-line bg-bg p-4 shadow-lift">
          <nav aria-label="모바일 메뉴" className="flex flex-col gap-0.5">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-base font-semibold text-ink hover:bg-sand">
                {label}
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
