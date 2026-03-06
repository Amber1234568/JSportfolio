import { useLanguage } from '../hooks/useLanguage';
import { content } from '../content';
import { CaseStudyLayout } from '../components/CaseStudyLayout';
import { Footer } from '../components/Footer';

export function Daplink() {
  const { lang } = useLanguage();
  const project = content[lang].projects.daplink;

  return (
    <>
      <CaseStudyLayout project={project} />
      <Footer />
    </>
  );
}
