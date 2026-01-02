import DevHeader from '@/templates/developer-portfolio/components/DevHeader';
import HeroSection from '@/templates/developer-portfolio/components/HeroSection';
import AboutSection from '@/templates/developer-portfolio/components/AboutSection';
import SkillsSection from '@/templates/developer-portfolio/components/SkillsSection';
import ProjectsSection from '@/templates/developer-portfolio/components/ProjectsSection';
import ExperienceSection from '@/templates/developer-portfolio/components/ExperienceSection';
import ContactSection from '@/templates/developer-portfolio/components/ContactSection';
import DevFooter from '@/templates/developer-portfolio/components/DevFooter';

export default function DeveloperPortfolioPreview() {
  return (
    <div className="min-h-screen bg-slate-900">
      <DevHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <DevFooter />
    </div>
  );
}
