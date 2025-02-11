import React, { FC } from "react";
// import { Chevron } from "./Chevron";
import styles from "./HeroSection.module.css";

export const HeroSection: FC = () => {
  return (
    <section
      id="home"
      className="h-screen bg-secondary bg-cover bg-center relative bg-[url('/images/07_KK_Portraits_10_crop.jpg')] px-6"
      style={{ backgroundPositionX: "63%" }} //good for mobile
    >
      <div className="absolute mx-auto text-5xl lg:text-7xl top-1/4 md:left-[8.3%] lg:top-1/2 lg:left-1/4 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
        <h1 className="lg:leading-tight">
          Hey
          <span className={`block ${styles["hero-gradient-text"]}`}>
            I&apos;m Kevin
          </span>
        </h1>
        <h2 className="text-2xl leading-loose">Software Developer</h2>
      </div>

      {/* TODO come back to this */}
      {/* <a
        href="#projects"
        className="sticky bottom-0 bg-red-500 inline-block size-10 inset-x-0 animate-[levitate_1.5s_linear_infinite]"
      >
        <Chevron />
      </a> */}
    </section>
  );
};

export default HeroSection;
