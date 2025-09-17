import { profiles } from "./footerUserData";
import FooterUserProfiles from "./FooterUserProfiles";
import FooterTechStack from "./FooterTechStack";
import FooterResources from "./FooterResources";
import { techstack } from "./FooterTechStackData";

function FooterContent() {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-4 lg:gap-8 text-footerBoxColor pt-2'>
      <FooterUserProfiles profiles={profiles} />

      <FooterTechStack techstack={techstack} />

      <FooterResources />
    </div>
  );
}

export default FooterContent;
