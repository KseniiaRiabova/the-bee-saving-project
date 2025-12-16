function ModalForm({ children }) {
  return (
    // Backdrop
    <div className='fixed inset-0 bg-backdrop-color flex justify-center items-center p-6 opacity-0 animate-fade-in z-50'>
      {/* Modal */}
      <div
        className='bg-primary w-full max-w-lg rounded-lg'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
      >
        {children}
      </div>
    </div>
  );
}

export default ModalForm;
