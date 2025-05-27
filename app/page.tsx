import { AboutSection } from "./feature/AboutSection/AboutSection";
import { Chat } from "./feature/chat";
import { ContactSection } from "./feature/ContactSection/ContactSection";
import Footer from "./feature/Footer/Footer";
import { HeroSection } from "./feature/HeroSection/HeroSection";
import NavBar from "./feature/Navbar/Navbar";
import { WorkSection } from "./feature/WorkSection/WorkSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-white space-y-12 lg:space-y-32">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
      <Chat />
    </>
  );
}
