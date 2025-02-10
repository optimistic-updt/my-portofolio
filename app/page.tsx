import SectionHero from "./feature/HeroSection/HeroSection";
import NavBar from "./feature/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <SectionHero />
      </main>
    </>
  );
}
