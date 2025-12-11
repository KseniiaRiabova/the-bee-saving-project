import { Container } from './Container';

function Footer() {
  return (
    <footer>
      <Container>
        <div className='flex items-center justify-center text-secondary-dark mb-5 md:mb-10'>
          <i className='fab fa-github text-4xl mr-4'></i>
          <a
            href='https://github.com/chingu-voyages/v50-tier3-team-28'
            target='_blank'
            className='hover:text-brand-primary'
          >
            Github Project Link - September 2024
          </a>
        </div>

        <div className='p-8 space-y-6 bg-brand-secondary rounded-3xl'>
          <p>
            Disclaimer: This website and its associated services are provided
            for demonstrative and educational purposes only. The content and
            features, including the ability to report bee swarms, are part of a
            demonstrative project and may not be fully functional or accurate.
            The information presented about bees is intended solely for
            informational purposes and should not be relied upon for
            professional advice or real-world applications.
          </p>
          <p>
            Please note that this site is not monitored, and any reports
            submitted regarding bee swarms will not be acted upon. For
            assistance with bee-related concerns, please contact a licensed
            professional or your local authorities.
          </p>
          <p>
            We are not responsible for any inaccuracies or issues arising from
            the use of this site. By using this website, you acknowledge and
            agree to these terms.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
