import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../content';
import type { AdhdScreenshot } from '../content';
import { FadeUp } from '../components/FadeUp';
import { Footer } from '../components/Footer';

// ── Shared micro-components ────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-5 select-none">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-100 my-10" />;
}

function OverviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="text-[12px] text-gray-400 w-20 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-[13px] text-gray-700 leading-relaxed">{value}</span>
    </div>
  );
}

function Screenshot({ shot }: { shot: AdhdScreenshot }) {
  const [err, setErr] = useState(false);
  const base = import.meta.env.BASE_URL;
  return (
    <figure className="m-0">
      <div className="w-full aspect-[9/16] rounded-xl border border-slate-200 bg-slate-950 overflow-hidden">
        {err ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9l4-4 4 4 3-3 4 4" />
            </svg>
            <span className="text-[11px] text-gray-300 font-mono text-center">{shot.file.split('/').pop()}</span>
          </div>
        ) : (
          <img
            src={`${base}${shot.file}`}
            alt={shot.caption}
            onError={() => setErr(true)}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}
      </div>
      <figcaption className="text-[12px] text-gray-400 mt-2 text-center leading-snug">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

// ── Flow diagram ───────────────────────────────────────────────────────────────

function FocusFlow({ stages }: { stages: string[] }) {
  return (
    <div className="overflow-x-auto -mx-2 px-2 py-4">
      <div className="flex items-start gap-1 min-w-[480px]">
        {stages.map((label, i) => (
          <div key={label} className="flex items-start gap-1 flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-[11px] font-medium text-gray-400 tabular-nums">{i + 1}</span>
              </div>
              <span className="text-[11px] text-gray-500 mt-2 text-center leading-tight px-1">{label}</span>
            </div>
            {i < stages.length - 1 && (
              <div className="text-gray-200 text-[15px] flex-shrink-0 mt-2">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export function AdhdCoach() {
  const { lang } = useLanguage();
  const c = content[lang];
  const proj = c.projects.adhd;
  const cs = c.adhdCase;

  const L = {
    back:        lang === 'en' ? 'Work' : '作品集',
    overview:    lang === 'en' ? 'Project overview' : '项目概览',
    roleLabel:   lang === 'en' ? 'Role' : '角色',
    platform:    lang === 'en' ? 'Platform' : '平台',
    stack:       lang === 'en' ? 'Stack' : '技术栈',
    status:      lang === 'en' ? 'Status' : '状态',
    links:       lang === 'en' ? 'Links' : '链接',
    tldr:        lang === 'en' ? 'TL;DR' : '简述',
    background:  lang === 'en' ? 'Background' : '背景',
    problems:    lang === 'en' ? 'Problems' : '问题',
    principles:  lang === 'en' ? 'Design principles' : '设计原则',
    howItWorks:  lang === 'en' ? 'How it works' : '产品逻辑',
    screens:     lang === 'en' ? 'Screens' : '界面截图',
    decisions:   lang === 'en' ? 'Key UX decisions' : '关键 UX 决策',
    decisionLbl: lang === 'en' ? 'Decision' : '决策',
    rationaleLbl:lang === 'en' ? 'Rationale' : '理由',
    tradeoffLbl: lang === 'en' ? 'Tradeoff' : '权衡',
    metrics:     lang === 'en' ? 'Metrics I would track (MVP)' : '计划追踪指标（MVP）',
    builder:     lang === 'en' ? 'What I built' : '我做了什么',
    next:        lang === 'en' ? "What I'd do next" : '下一步',
    discuss:     lang === 'en' ? 'Discuss this project →' : '聊聊这个项目 →',
    statusValue: lang === 'en' ? 'Iterating (MVP)' : '迭代中（MVP）',
    platformVal: lang === 'en' ? 'Web prototype' : 'Web 原型',
    stackVal:    'React · Vite · TypeScript',
  };

  return (
    <>
      <main className="max-w-[680px] mx-auto px-6 pt-16 pb-24">

        {/* ── Back link ── */}
        <div className="mb-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
            </svg>
            {L.back}
          </Link>
        </div>

        {/* ── Hero ── */}
        <FadeUp>
          <header className="mb-8">
            <p className="text-[12px] text-gray-400 mb-2">{proj.subtitle}</p>
            <h1 className="text-[26px] font-semibold text-gray-900 leading-snug mb-3">
              {proj.title}
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed mb-4">{proj.oneLiner}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
              {proj.demoUrl && (
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-800 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-700 hover:text-gray-900 transition-colors"
                >
                  Demo ↗
                </a>
              )}
              {proj.demoUrl && proj.githubUrl && <span className="text-gray-200" aria-hidden>·</span>}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </header>
        </FadeUp>

        {/* ── Overview ── */}
        <FadeUp delay={30}>
          <div className="bg-gray-50 rounded-xl px-5 py-4 mb-2">
            <SectionLabel>{L.overview}</SectionLabel>
            <div className="space-y-2.5">
              <OverviewRow label={L.roleLabel} value={proj.role} />
              <OverviewRow label={L.platform} value={L.platformVal} />
              <OverviewRow label={L.stack} value={L.stackVal} />
              <OverviewRow label={L.status} value={L.statusValue} />
              <OverviewRow
                label={L.links}
                value={
                  <span className="flex flex-wrap gap-x-3 gap-y-1">
                    {proj.links.map((lk) => (
                      <a
                        key={lk.url}
                        href={lk.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {lk.label} ↗
                      </a>
                    ))}
                  </span>
                }
              />
            </div>
          </div>
        </FadeUp>

        {/* ── TL;DR ── */}
        <FadeUp delay={50}>
          <div className="border border-gray-100 rounded-xl px-5 py-4 mt-4">
            <SectionLabel>{L.tldr}</SectionLabel>
            <ul className="space-y-2.5">
              {cs.tldr.map((line, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <span className="text-gray-300 flex-shrink-0 select-none mt-0.5">–</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <Divider />

        {/* ── Background ── */}
        <FadeUp delay={60}>
          <section>
            <SectionLabel>{L.background}</SectionLabel>
            <p className="text-[15px] text-gray-700 leading-[1.8]">{cs.background}</p>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Problems ── */}
        <FadeUp delay={70}>
          <section>
            <SectionLabel>{L.problems}</SectionLabel>
            <div className="space-y-6">
              {cs.problems.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-medium text-gray-400 tabular-nums leading-none">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5">{p.label}</h3>
                    <p className="text-[14px] text-gray-600 leading-[1.8]">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Design principles ── */}
        <FadeUp delay={80}>
          <section>
            <SectionLabel>{L.principles}</SectionLabel>
            <div className="space-y-6">
              {cs.principles.map((p, i) => (
                <div key={i}>
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5">
                    <span className="text-gray-300 mr-2 select-none">{i + 1}.</span>
                    {p.label}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-[1.8] pl-5">{p.body}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── How it works (flow) ── */}
        <FadeUp delay={85}>
          <section>
            <SectionLabel>{L.howItWorks}</SectionLabel>
            <FocusFlow stages={cs.flowStages.map((s) => s.label)} />
            <div className="mt-6 space-y-4">
              {cs.flowStages.map((stage) => (
                <div key={stage.label} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-800 flex-shrink-0">{stage.label}:</span>
                  <span>{stage.body}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Screenshots ── */}
        <FadeUp delay={90}>
          <section>
            <SectionLabel>{L.screens}</SectionLabel>
            <div className="grid sm:grid-cols-2 gap-6">
              {cs.screenshots.map((shot) => (
                <Screenshot key={shot.file} shot={shot} />
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Key UX decisions ── */}
        <FadeUp delay={95}>
          <section>
            <SectionLabel>{L.decisions}</SectionLabel>
            <div className="space-y-7">
              {cs.decisions.map((d, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  <p className="text-[14px] font-semibold text-gray-900">{d.decision}</p>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 w-20 flex-shrink-0 pt-0.5">{L.rationaleLbl}</span>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{d.rationale}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 w-20 flex-shrink-0 pt-0.5">{L.tradeoffLbl}</span>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{d.tradeoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Metrics ── */}
        <FadeUp delay={100}>
          <section>
            <SectionLabel>{L.metrics}</SectionLabel>
            <p className="text-[12px] text-gray-400 italic mb-4">{cs.metricsNote}</p>
            <div className="space-y-3">
              {cs.metrics.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-[13px] font-medium text-gray-700 w-40 flex-shrink-0">{m.label}</span>
                  <span className="text-[13px] text-gray-500 leading-relaxed">{m.description}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── What I built ── */}
        <FadeUp delay={105}>
          <section>
            <SectionLabel>{L.builder}</SectionLabel>
            <ul className="space-y-2">
              {cs.builderBullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <span className="text-gray-300 flex-shrink-0 mt-0.5 select-none">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Next steps ── */}
        <FadeUp delay={110}>
          <section>
            <SectionLabel>{L.next}</SectionLabel>
            <ul className="space-y-2">
              {cs.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <span className="text-gray-300 flex-shrink-0 mt-0.5 select-none">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Bottom nav ── */}
        <div className="flex items-center justify-between text-[13px]">
          <Link
            to="/work"
            className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
            </svg>
            {L.back}
          </Link>
          <a
            href="mailto:j2shao@ucsd.edu"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            {L.discuss}
          </a>
        </div>

      </main>
      <Footer />
    </>
  );
}
