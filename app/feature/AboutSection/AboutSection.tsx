import React, { FC } from "react";

export const AboutSection: FC = () => {
  return (
    <section id="work" className="px-6 sm:px-0 max-w-5xl mx-auto text-lg">
      <h3 className="text-3xl group relative inline-block overflow-x-hidden">
        About
      </h3>
      <h4 className="text-2xl">Hello, I&apos;m Kevin Garcia-Fernandez</h4>
      <p>
        I try to alleviate life&apos;s challenges through innovative technology.
      </p>

      <div className="space-y-6 mt-6">
        <div>
          <p>I&apos;m somewhere here on the engineering spectrum</p>
          <div
            className="flex items-center space-x-2 relative
           text-xs text-center bg-red-50 justify-center my-3"
          >
            <span>
              Back-end <br /> infra
            </span>
            <svg width="140" height="8" className="rounded-full">
              <line
                x1="0"
                y1="0"
                x2="140"
                y2="0"
                stroke="#363940"
                strokeWidth="16"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute right-24 top-0">👇</span>
            <span>
              More
              <br />
              Animation!
            </span>
          </div>
        </div>
        <div className="">
          <p className="text-2xl">My current goals are:</p>
          <ul className="list-disc ml-6">
            <li>
              Becoming the best engineer by leading team to successful outcomes
            </li>
            <li>Becoming an entrepreneur</li>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl">How we got here</h4>
          <p>
            Belgian/Spanish born, I move to Australia in 2010 to study a
            bachelor of music production (sound engineering)
          </p>
          <p>
            I mixed live sound around the world for nearly a decade with some of
            australia's biggest bands. Always mixing for that kid in the crowd
            that attended his first gig. I wanted to make an impact, change
            lives
          </p>
          <p>blah blah blah</p>
        </div>
        <div>
          <h4 className="text-2xl">my values</h4>
          <ul>
            <li>Go After Your Dreams</li>
            <li>Have fun along the way</li>
            <li>Deepen the experience</li>
            <li>Spend Time Outside</li>
            <li>Do what excites you</li>
          </ul>
        </div>
        <div>
          <h4 className="text-2xl">Fun facts</h4>
          <ul>
            <li>
              Wanting to be get rid of stage fright, I became the host of the
              Melbourne Ruby Meetup
            </li>
            <li>
              I finished fourth at a national downhill skateboarding race,
              whilst organising it & having food poisoning.
            </li>
            <li>I Love hiking</li>
          </ul>
        </div>
      </div>
      {/* TODO */}
      {/* <p>what I use</p> */}
    </section>
  );
};
