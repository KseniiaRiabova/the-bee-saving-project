import { useState } from 'react';

export const DarkLightModeButton = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
  };

  return (
    <label className='relative block w-12 h-6'>
      <input
        type='checkbox'
        className='sr-only peer'
        onClick={() => darkModeHandler()}
      />
      {/* Toggle track */}
      <span className='absolute inset-0 bg-transparent border border-black rounded-full cursor-pointer'></span>

      {/* Toggle thumb */}
      <span className='absolute top-1 left-1 h-4 w-4 bg-white border border-black rounded-full cursor-pointer transition-transform duration-300 peer-checked:translate-x-6 peer-checked:bg-black'></span>
    </label>
  );
};
