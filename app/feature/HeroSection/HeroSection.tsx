import React, { FC } from "react";
import styles from "./HeroSection.module.css";
import { ME } from "@/app/me";
// import { Chevron } from "./Chevron";

export const HeroSection: FC = () => {
  return (
    <section
      id="home"
      // * #DADADF is the color of the background of the current hero image
      className="h-screen bg-[#DADADF] bg-cover bg-center relative bg-[url('/images/me_landing.jpg')] px-6"
      style={{ backgroundPositionX: "63%" }} //good for mobile
    >
      <div className="absolute mx-auto text-5xl lg:text-7xl top-1/4 md:left-[8.3%] lg:top-1/2 lg:left-1/4 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
        <h1 className="lg:leading-tight transform starting:translate-y-8 starting:opacity-0 opacity-100 translate-y-0 ease-out duration-500">
          Hey
          <span className={`block ${styles["hero-gradient-text"]}`}>
            I&apos;m Kevin
          </span>
        </h1>
        <h2 className="text-2xl leading-loose transform starting:translate-y-8 starting:opacity-0 opacity-100 translate-y-0 ease-out duration-500 delay-300">
          {ME.title}
        </h2>
      </div>

      {/* TODO come back to this */}
      {/* <a
        href="#projects"
        className="absolute inset-x-0 bottom-0 bg-red-500 inline-block size-10"
        style={{ animation: "levitate 1.5s linear infinite" }}
      >
        <Chevron />
      </a> */}
    </section>
  );
};

export default HeroSection;
