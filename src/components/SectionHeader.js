function SectionHeader({ title, eyebrow, actionLabel, actionHref = '#hero' }) {
  return (
    <div className="section__header">
      <div>
        {eyebrow && <span className="section__eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>

      {actionLabel && (
        <a className="section__action" href={actionHref}>
          {actionLabel}
        </a>
      )}
    </div>
  );
}

export default SectionHeader;
