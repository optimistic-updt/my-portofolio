import { AboutSection } from "./feature/AboutSection/AboutSection";
import Footer from "./feature/Footer/Footer";
import { HeroSection } from "./feature/HeroSection/HeroSection";
import NavBar from "./feature/Navbar/Navbar";
import { WorkSection } from "./feature/WorkSection/WorkSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-white space-y-12">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <Footer />
      </main>
    </>
  );
}
