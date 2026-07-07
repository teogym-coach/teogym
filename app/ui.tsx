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
export function MobileMenu({ nav, reservationHref }: { nav: readonly (readonly [string, string])[]; reservationHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="lg:hidden">
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
        <div className="fixed inset-x-0 bottom-0 top-[73px] z-50 overflow-y-auto bg-bg px-6 py-8">
          <nav aria-label="모바일 메뉴" className="flex flex-col gap-1">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3.5 text-lg font-semibold text-ink hover:bg-sand">
                {label}
              </Link>
            ))}
          </nav>
          <a
            href={reservationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-base font-bold text-white"
          >
            무료 체험 상담 예약
          </a>
        </div>
      )}
    </div>
  );
}
