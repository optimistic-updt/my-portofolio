import React, { FC } from "react";

const FactCard: FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="bg-slate-100 rounded-md p-4">{children}</li>
);

export const AboutSection: FC = () => {
  return (
    <section id="work" className="px-6 sm:px-0 max-w-5xl mx-auto text-lg">
      <h3 className="text-3xl group relative inline-block overflow-x-hidden">
        About
      </h3>

      <h4 className="text-2xl">
        Hello 👋😁, <br />
        I&apos;m Kevin Garcia-Fernandez
      </h4>

      <p className="text-2xl text-primary">
        I love alleviating life&apos;s challenges through innovative technology.
      </p>

      {/* TODO Future showcase video */}

      <div className="space-y-6 mt-6">
        <section>
          <p className="underline">How we got here</p>
          <p>
            From sound waves to code — I'm a sound engineer turned software
            developer who loves creating experiences that resonate. 🔊 <br />{" "}
            After a decade of crafting unforgettable moments for audiences
            around the world, I jumped into software to build things with
            staying power. <br />
            My background gives me a unique mix of creativity and technical
            know-how that I've been putting to work as a front-end dev for the
            past 5 years. <br />
            I'm all about creating digital products that actually help people.
            <br />
            Whether it's making data more accessible or building interfaces that
            just make sense, I bring energy and enthusiasm to every project and
            love collaborating with others to make cool shit happen. <br />
            {/* Make "together" a rainbow gradient Or some shining test */}
            Let's build something awesome together. 🚀
          </p>
        </section>
        {/* <div>
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
        </div> */}

        <section className="">
          <p className="text-2xl">My current goals are:</p>
          <ul className="list-disc ml-6">
            <li>
              Becoming the best engineer by leading team to successful outcomes
            </li>
            <li>Do more backend</li>
            <li>Do more with AI</li>
            <li>Becoming an entrepreneur</li>
          </ul>
        </section>

        <details>
          <summary className="text-2xl">Keen to read on 📖?</summary>
          <div>
            <p>
              Belgian/Spanish born, I move to Australia in 2010 to study a
              bachelor of music production (sound engineering)
            </p>
            <p>
              I mixed live sound around the world for nearly a decade with some
              of australia's biggest bands. Always mixing for that kid in the
              crowd that attended his first gig. I wanted to make an impact,
              change lives
            </p>
            {/* blah blah blah */}
          </div>
        </details>
        {/* VALUE are a good idea */}
        {/* <div>
          <h4 className="text-2xl">my values</h4>
          <ul>
            <li>Go After Your Dreams</li>
            <li>Have fun along the way</li>
            <li>Deepen the experience</li>
            <li>Spend Time Outside</li>
            <li>Do what excites you</li>
          </ul>
        </div> */}
        <div>
          <h4 className="text-2xl mb-4">Fun facts</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FactCard>
              Wanting to be get rid of stage fright, I became the host of the
              Melbourne Ruby Meetup
            </FactCard>
            <FactCard>
              I finished fourth at a national downhill skateboarding race,
              whilst organising it <strong> and </strong> having food poisoning.
            </FactCard>
          </ul>
        </div>
      </div>
      {/* TODO */}
      {/* <p>what I use</p> */}
    </section>
  );
};
