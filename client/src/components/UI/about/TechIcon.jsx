import sprite from '../../../assets/images/about/tech-logo.svg?raw';

export function TechIcon({ id, className }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: sprite }} />
      <svg className={className}>
        <use xlinkHref={`#${id}`} />
      </svg>
    </>
  );
}

export default TechIcon;
