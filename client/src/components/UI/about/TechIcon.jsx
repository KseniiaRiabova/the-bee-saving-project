import sprite from '../../../assets/images/about/tech-logo.svg?raw';
import PropTypes from 'prop-types';

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

TechIcon.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default TechIcon;
