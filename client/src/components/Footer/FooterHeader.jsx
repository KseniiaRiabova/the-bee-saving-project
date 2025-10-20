function FooterHeader() {
  return (
    <div className='flex flex-col items-center sm:items-start sm:flex-row justify-between w-full px-10'>
      <h2 className='flex flex-col'>
        Lets
        <span className='text-footerTextColor pl-7'>Connect</span>
      </h2>

      <h2 className='hidden sm:block text-footerTextColor mt-10 sm:mt-12'>
        Save Bees
      </h2>
    </div>
  );
}

export default FooterHeader;
