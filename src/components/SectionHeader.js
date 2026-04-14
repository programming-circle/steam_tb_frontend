import { Link } from 'react-router-dom';

function SectionHeader({ title, eyebrow, actionLabel, actionHref = '/' }) {
  return (
    <div className="section__header">
      <div>
        {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>

      {actionLabel && (
        <Link className="section__action" to={actionHref}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
