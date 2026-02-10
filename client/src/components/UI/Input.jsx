import PropTypes from 'prop-types';
import { useState } from 'react';

export const Input = ({
  id,
  type,
  label,
  placeholder,
  hideLabel = false,
  ...attrs
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={hideLabel ? 'sr-only' : undefined}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        {...attrs}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  hideLabel: PropTypes.bool,
};
