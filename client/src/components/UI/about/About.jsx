import AboutUserProfiles from './AboutUserProfiles';
import AboutTechStack from './AboutTechStack';
import AboutResources from './AboutResources';
import { profiles } from './aboutUserData';
import { techstack } from './aboutTechStackData';
import { resourcesData } from './aboutResourcesData';
import { Container } from '../Container';

function About() {
  return (
    <section id='about'>
      <Container>
        <div className='flex items-end justify-center sm:justify-between px-10 mb-2'>
          <h2>
            Lets
            <span className='text-brand-secondary block pl-7'>Connect</span>
          </h2>

          <h2 className='hidden sm:block text-brand-secondary'>Save Bees</h2>
        </div>

        <div className='flex flex-col md:flex-row justify-between gap-4 lg:gap-8 text-secondary-dark'>
          <AboutUserProfiles profiles={profiles} />

          <AboutTechStack techstack={techstack} />

          <AboutResources resourcesData={resourcesData} />
        </div>
      </Container>
    </section>
  );
}

export default About;
