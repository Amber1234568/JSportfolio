import { useLanguage } from '../hooks/useLanguage';
import { content } from '../content';
import { CaseStudyLayout } from '../components/CaseStudyLayout';
import { Footer } from '../components/Footer';

export function AdhdCoach() {
  const { lang } = useLanguage();
  const project = content[lang].projects.adhd;

  return (
    <>
      <CaseStudyLayout project={project} />
      <Footer />
    </>
  );
}
