import FooterContent from './FooterContent';
import FooterBottom from './FooterBottom';
import FooterHeader from './FooterHeader';

function Footer() {
  return (
    <footer
      id='footer'
      className='dark:bg-black px-6'
    >
      <div className='max-w-7xl mx-auto rounded-lg col-span-12 pt-10'>
        <div className='w-full mx-auto'>
          <FooterHeader />

          <FooterContent />

          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
