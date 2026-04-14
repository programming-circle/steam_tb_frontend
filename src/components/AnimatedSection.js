import useFadeIn from '../hooks/useFadeIn';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useFadeIn(0.1);

  return (
    <section
      ref={ref}
      className={`animated-section ${className} ${visible ? 'animated-section--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export default AnimatedSection;
