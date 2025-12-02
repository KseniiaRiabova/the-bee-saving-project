export const Container = ({ children, py = 'default', className = '' }) => {
  const pyClasses = {
    default: 'py-5 md:py-10',
    header: 'py-6',
    firstSection: 'pt-10 md:pt-20 pb-5 md:pb-10',
    hero: 'pt-0 pb-0',
  };

  return (
    <div className={`max-w-7xl mx-auto px-6 ${pyClasses[py]} ${className}`}>
      {children}
    </div>
  );
};
