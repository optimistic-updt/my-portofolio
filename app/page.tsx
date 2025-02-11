import { HeroSection } from "./feature/HeroSection/HeroSection";
import NavBar from "./feature/Navbar/Navbar";
import { WorkSection } from "./feature/WorkSection/WorkSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="bg-white space-y-12 pb-12">
        <HeroSection />
        <WorkSection />
      </main>
    </>
  );
}
