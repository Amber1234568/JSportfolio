import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../content';
import { FadeUp } from '../components/FadeUp';
import { Footer } from '../components/Footer';

// ── Small helpers ─────────────────────────────────────────────────────────────

function SilentImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return <img src={src} alt={alt} className={className} onError={() => setHidden(true)} />;
}

function ProfilePhoto() {
  const [err, setErr] = useState(false);
  const base = import.meta.env.BASE_URL;
  if (err) {
    return (
      <div className="w-[200px] h-[200px] rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
        <span className="text-gray-400 text-4xl font-light select-none">A</span>
      </div>
    );
  }
  return (
    <img
      src={`${base}images/profile.jpg`}
      alt="Jingcheng Shao"
      onError={() => setErr(true)}
      className="w-[200px] h-[200px] rounded-2xl object-cover border border-gray-200 flex-shrink-0"
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400 mb-6 select-none">
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="border-0 border-t border-gray-100 my-10" />;
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function Work() {
  const { lang } = useLanguage();
  const c = content[lang];
  const wc = c.work;
  const base = import.meta.env.BASE_URL;

  const projectKeys = ['daplink', 'adhd', 'studypal'] as const;
  const projectRoutes = {
    daplink: '/work/daplink',
    adhd: '/work/adhd-coach',
    studypal: '/work/studypal',
  } as const;

  return (
    <>
      <main className="max-w-[680px] mx-auto px-6 pt-20 pb-24">

        {/* Optional header banner — hidden automatically if missing */}
        <SilentImage
          src={`${base}images/header.jpg`}
          alt="Header"
          className="w-full h-28 object-cover rounded-xl mb-8 opacity-80"
        />

        {/* ── Profile header ── */}
        <FadeUp>
          <header className="flex flex-col sm:flex-row items-start gap-6 mb-2">
            <ProfilePhoto />
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-[17px] font-semibold text-gray-900 leading-snug">{c.name}</h1>
              <p className="text-[14px] text-gray-500 mt-0.5">{c.role}</p>
              <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-[13px]">
                <a
                  href={`${base}resume.pdf`}
                  download
                  className="text-gray-700 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 hover:text-gray-900 transition-colors"
                >
                  {wc.resume}
                </a>
                <span className="text-gray-200" aria-hidden>·</span>
                <a
                  href="https://github.com/Amber1234568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  GitHub ↗
                </a>
                <span className="text-gray-200" aria-hidden>·</span>
                <a
                  href={c.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {c.contact.linkedin}
                </a>
                <span className="text-gray-200" aria-hidden>·</span>
                <a
                  href={c.contact.scholarUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {c.contact.scholar}
                </a>
                <span className="text-gray-200" aria-hidden>·</span>
                <a
                  href={`mailto:${c.contact.email}`}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {c.contact.email}
                </a>
              </nav>
            </div>
          </header>
          <p className="text-[12px] text-gray-400 mt-4 mb-0 italic">{wc.subtitle}</p>
        </FadeUp>

        <Divider />

        {/* ── Bio ── */}
        <FadeUp delay={50}>
          <section>
            <SectionLabel>{wc.sections.bio}</SectionLabel>
            <p className="text-[15px] text-gray-700 leading-[1.75]">{c.bio}</p>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Projects ── */}
        <FadeUp delay={70}>
          <section>
            <SectionLabel>{wc.sections.projects}</SectionLabel>
            <div className="space-y-10">
              {projectKeys.map((key) => {
                const proj = c.projects[key];
                const route = projectRoutes[key];
                return (
                  <div key={key}>
                    <div className="mb-0.5">
                      <span className="font-medium text-[15px] text-gray-900">{proj.title}</span>
                    </div>
                    <p className="text-[12px] text-gray-400 mb-2">{proj.subtitle}</p>
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-3">{proj.oneLiner}</p>
                    <ul className="space-y-1.5 mb-3">
                      {proj.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                          <span className="text-gray-300 flex-shrink-0 mt-0.5 select-none">—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                      <Link
                        to={route}
                        className="text-gray-800 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {wc.viewCase} →
                      </Link>
                      {proj.demoUrl && (
                        <>
                          <span className="text-gray-200" aria-hidden>·</span>
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            Demo ↗
                          </a>
                        </>
                      )}
                      {proj.githubUrl && (
                        <>
                          <span className="text-gray-200" aria-hidden>·</span>
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            {wc.viewGitHub}
                          </a>
                        </>
                      )}
                      {proj.figmaUrl && (
                        <>
                          <span className="text-gray-200" aria-hidden>·</span>
                          <a
                            href={proj.figmaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                          >
                            {wc.viewFigma}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Experience ── */}
        <FadeUp delay={90}>
          <section>
            <SectionLabel>{wc.sections.experience}</SectionLabel>
            <div className="space-y-7">
              {c.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-1.5">
                      <span className="font-medium text-[14px] text-gray-900">{exp.role}</span>
                      <span className="text-gray-300 text-[12px]">·</span>
                      <span className="text-[14px] text-gray-600">{exp.company}</span>
                      {exp.location && (
                        <>
                          <span className="text-gray-300 text-[12px]">·</span>
                          <span className="text-[13px] text-gray-400">{exp.location}</span>
                        </>
                      )}
                    </div>
                    <span className="text-[12px] text-gray-400 sm:flex-shrink-0">{exp.dates}</span>
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[14px] text-gray-600 leading-relaxed">
                          <span className="text-gray-300 flex-shrink-0 mt-0.5 select-none">—</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Skills ── */}
        <FadeUp delay={100}>
          <section>
            <SectionLabel>{wc.sections.skills}</SectionLabel>
            <div className="space-y-2.5">
              {c.skills.map((group, i) => (
                <div key={i} className="flex gap-5">
                  <span className="text-[12px] text-gray-400 w-[72px] flex-shrink-0 pt-0.5">
                    {group.category}
                  </span>
                  <span className="text-[14px] text-gray-600 leading-relaxed">
                    {group.items.join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Education ── */}
        <FadeUp delay={110}>
          <section>
            <SectionLabel>{wc.sections.education}</SectionLabel>
            <div className="space-y-4">
              {c.education.map((edu, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
                  <div>
                    <span className="font-medium text-[14px] text-gray-900">{edu.degree}</span>
                    <span className="text-[13px] text-gray-400 ml-2">· {edu.school}</span>
                    {edu.notes && (
                      <p className="text-[12px] text-gray-400 mt-0.5">{edu.notes}</p>
                    )}
                  </div>
                  <span className="text-[12px] text-gray-400 sm:flex-shrink-0">{edu.dates}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>

        <Divider />

        {/* ── Contact ── */}
        <FadeUp delay={120}>
          <section id="contact">
            <SectionLabel>{wc.sections.contact}</SectionLabel>
            <p className="text-[14px] text-gray-500 mb-4 leading-relaxed">{c.contact.note}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px]">
              <a
                href={`mailto:${c.contact.email}`}
                className="text-gray-800 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-600 hover:text-gray-900 transition-colors"
              >
                {c.contact.email}
              </a>
              <span className="text-gray-200" aria-hidden>·</span>
              <a
                href="https://github.com/Amber1234568"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                GitHub ↗
              </a>
              <span className="text-gray-200" aria-hidden>·</span>
              <a
                href={c.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                {c.contact.linkedin}
              </a>
              <span className="text-gray-200" aria-hidden>·</span>
              <a
                href={c.contact.scholarUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                {c.contact.scholar}
              </a>
            </div>
          </section>
        </FadeUp>

      </main>
      <Footer />
    </>
  );
}
