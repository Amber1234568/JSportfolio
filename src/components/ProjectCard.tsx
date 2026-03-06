import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle: string;
  oneLiner: string;
  tags: string[];
  to: string;
  viewLabel: string;
}

export function ProjectCard({ title, subtitle, oneLiner, tags, to, viewLabel }: Props) {
  return (
    <Link
      to={to}
      className="group flex flex-col p-7 bg-apple-light rounded-3xl hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ease-out"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 bg-white rounded-full text-apple-secondary border border-gray-200 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs text-apple-secondary mb-2 font-medium tracking-wide uppercase">
        {subtitle}
      </p>
      <h3 className="text-xl font-semibold text-apple-dark mb-3 group-hover:text-apple-blue transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-apple-secondary text-sm leading-relaxed flex-1">{oneLiner}</p>
      <div className="mt-5 flex items-center gap-1.5 text-apple-blue text-sm font-medium">
        {viewLabel}
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
