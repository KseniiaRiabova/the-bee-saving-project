import PropTypes from "prop-types";
import AnimatedNumber from "../../layout/AnimatedNumber";

export const MainHeroLandingSurveyAnimatedNumber = ({
  statHighlights,
  text,
}) => {
  return (
    <div className='text-base md:text-lg space-y-1 whitespace-nowrap text-black dark:text-white'>
      <div className='flex justify-center md:justify-start font-bold'>
        <AnimatedNumber n={statHighlights} /> +
      </div>
      <p>{text}</p>
    </div>
  );
};

MainHeroLandingSurveyAnimatedNumber.propTypes = {
  statHighlights: PropTypes.number,
  text: PropTypes.string,
};
