import useDarkModeStore from '../../stores/useDarkModeStore';

export const DarkLightModeButton = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <label
      className='relative block w-12 h-6 cursor-pointer'
    >
      <input
        type='checkbox'
        role='switch'
        aria-label='Toggle dark mode'
        aria-checked={isDarkMode}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className='sr-only peer'
      />

      {/* Toggle track */}
      <span className='absolute inset-0 bg-transparent border border-primary-dark rounded-full cursor-pointer'></span>

      {/* Toggle thumb */}
      <span className='absolute top-1 left-1 h-4 w-4 bg-primary border border-primary-dark rounded-full cursor-pointer transition-transform duration-300 peer-checked:translate-x-6 peer-checked:bg-primary'></span>
    </label>
  );
};
