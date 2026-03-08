import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './FadeUp';
import type { CaseStudyProject } from '../content';
import { useLanguage } from '../hooks/useLanguage';

interface Props {
  project: CaseStudyProject;
}

function ArtifactImage({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-full min-h-[160px] rounded-xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 py-8 px-4">
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9l4-4 4 4 3-3 4 4" />
        </svg>
        <span className="text-[12px] text-gray-400 text-center">{label}</span>
        <span className="text-[11px] text-gray-300 font-mono">{src.split('/').pop()}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className="w-full rounded-xl object-cover border border-gray-100"
    />
  );
}

function ScreenImage({ src, caption, landscape }: { src: string; caption: string; landscape?: boolean }) {
  const [err, setErr] = useState(false);
  return (
    <figure className="m-0">
      <div className={`w-full rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden ${landscape ? 'aspect-[16/10]' : 'h-[420px] sm:h-[520px]'}`}>
        {err ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 9l4-4 4 4 3-3 4 4" />
            </svg>
            <span className="text-[11px] text-gray-300 font-mono text-center">{src.split('/').pop()}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={caption}
            onError={() => setErr(true)}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        )}
      </div>
      <div className="flex items-start justify-between gap-3 mt-2">
        <figcaption className="text-[12px] text-gray-400 leading-snug flex-1">
          {caption}
        </figcaption>
        {!err && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-gray-300 hover:text-gray-500 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Full size ↗
          </a>
        )}
      </div>
    </figure>
  );
}

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

function OverviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="text-[12px] text-gray-400 w-16 flex-shrink-0 pt-0.5">{label}</span>
      <span className="text-[13px] text-gray-700 leading-relaxed">{value}</span>
    </div>
  );
}

export function CaseStudyLayout({ project }: Props) {
  const { lang } = useLanguage();
  const base = import.meta.env.BASE_URL;

  const L = {
    overview: lang === 'en' ? 'Project overview' : '项目概览',
    role: lang === 'en' ? 'Role' : '角色',
    tools: lang === 'en' ? 'Tools' : '工具',
    links: lang === 'en' ? 'Links' : '链接',
    background: lang === 'en' ? 'Background' : '背景',
    problem: lang === 'en' ? 'Problem' : '问题',
    approach: lang === 'en' ? 'Approach' : '方案',
    screens: lang === 'en' ? 'Screens' : '关键界面',
    whyArch: lang === 'en' ? 'Why this architecture' : '为什么这样设计',
    artifacts: lang === 'en' ? 'Artifacts' : '产出',
    next: lang === 'en' ? "What I'd do next" : '下一步',
    back: lang === 'en' ? 'Work' : '作品集',
    discuss: lang === 'en' ? 'Discuss this project →' : '聊聊这个项目 →',
    comingSoon: lang === 'en' ? 'GitHub (coming soon)' : 'GitHub（即将上线）',
  };

  return (
    <main className="max-w-[680px] mx-auto px-6 pt-16 pb-24">

      {/* ── Title ── */}
      <FadeUp>
        <div className="mb-8">
          <p className="text-[12px] text-gray-400 mb-2">{project.subtitle}</p>
          <h1 className="text-[26px] font-semibold text-gray-900 leading-snug mb-3">
            {project.title}
          </h1>
          <p className="text-[16px] text-gray-500 leading-relaxed">{project.oneLiner}</p>
        </div>
      </FadeUp>

      {/* ── Overview table ── */}
      <FadeUp delay={40}>
        <div className="bg-gray-50 rounded-xl px-5 py-4 mb-2">
          <SectionLabel>{L.overview}</SectionLabel>
          <div className="space-y-2.5">
            <OverviewRow label={L.role} value={project.role} />
            <OverviewRow label={L.tools} value={project.tools.join(' · ')} />
            <div className="flex gap-4">
              <span className="text-[12px] text-gray-400 w-16 flex-shrink-0 pt-0.5">{L.links}</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.links.length > 0 ? (
                  project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-gray-700 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))
                ) : (
                  <span className="text-[13px] text-gray-400">{L.comingSoon}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      <Divider />

      {/* ── Background ── */}
      <FadeUp delay={60}>
        <section>
          <SectionLabel>{L.background}</SectionLabel>
          <p className="text-[15px] text-gray-700 leading-[1.8]">{project.background}</p>
        </section>
      </FadeUp>

      <Divider />

      {/* ── Problem ── */}
      <FadeUp delay={70}>
        <section>
          <SectionLabel>{L.problem}</SectionLabel>
          <p className="text-[15px] text-gray-700 leading-[1.8]">{project.problem}</p>
        </section>
      </FadeUp>

      <Divider />

      {/* ── Approach ── */}
      <FadeUp delay={80}>
        <section>
          <SectionLabel>{L.approach}</SectionLabel>
          <div className="space-y-8">
            {project.solution.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center mt-0.5">
                  <span className="text-[11px] font-medium text-gray-400 tabular-nums leading-none">
                    {step.step}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-semibold text-gray-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-gray-600 leading-[1.8]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeUp>

      {/* ── Why this architecture ── */}
      {project.whyArchitecture && (
        <>
          <Divider />
          <FadeUp delay={85}>
            <section>
              <SectionLabel>{L.whyArch}</SectionLabel>
              <ul className="space-y-2">
                {project.whyArchitecture.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                    <span className="text-gray-300 flex-shrink-0 mt-0.5 select-none">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          </FadeUp>
        </>
      )}

      {/* ── Screens ── */}
      {project.screens && project.screens.length > 0 && (
        <>
          <Divider />
          <FadeUp delay={88}>
            <section>
              <SectionLabel>{L.screens}</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-5">
                {project.screens.map((s) => (
                  <ScreenImage key={s.file} src={`${base}${s.file}`} caption={s.caption} landscape={project.screensLandscape} />
                ))}
              </div>
            </section>
          </FadeUp>
        </>
      )}

      {/* ── Artifacts ── */}
      {project.artifacts.length > 0 && (
        <>
          <Divider />
          <FadeUp delay={90}>
            <section>
              <SectionLabel>{L.artifacts}</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.artifacts.map((a) => (
                  <div key={a.file}>
                    <ArtifactImage
                      src={`${base}${a.file}`}
                      alt={a.label}
                      label={a.label}
                    />
                    <p className="text-[12px] text-gray-400 mt-2 text-center">{a.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeUp>
        </>
      )}

      <Divider />

      {/* ── What I'd do next ── */}
      <FadeUp delay={100}>
        <section>
          <SectionLabel>{L.next}</SectionLabel>
          <ul className="space-y-2">
            {project.nextSteps.map((step, i) => (
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
  );
}
