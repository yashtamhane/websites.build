import DevHeader from './components/DevHeader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import DevFooter from './components/DevFooter';

export default function DeveloperPortfolioTemplate() {
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
