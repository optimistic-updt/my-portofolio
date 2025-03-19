import React, { FC } from "react";

const FactCard: FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="bg-gray-100 rounded-md p-4 lg:p-12">{children}</li>
);

export const AboutSection: FC = () => {
  return (
    <section id="about" className="px-6 lg:px-0 max-w-5xl mx-auto text-lg">
      <h3 className="text-3xl mb-3 lg:mb-6">About</h3>

      <div className="space-y-6 lg:space-y-16 lg:text-2xl">
        <div className="text-xl lg:text-5xl sm:max-w-[83%]">
          <h4>
            Hello 👋😁, <br />
            I&apos;m Kevin Garcia-Fernandez
          </h4>

          <p className="text-primary md:mt-3 lg:mt-6">
            I love alleviating life&apos;s challenges through innovative
            technology.
          </p>
        </div>

        {/* TODO Future showcase video */}

        <section className="lg:grid lg:grid-cols-12 lg:gap-6">
          <h4 className="text-muted mb-1 lg:text-3xl lg:col-span-4 lg:sticky">
            How we got here
          </h4>
          <p className="lg:col-span-8">
            From sound waves to code — I&apos;m a sound engineer turned software
            developer who loves creating experiences that resonate. 🔊 <br />
            <br className="hidden sm:block" />
            After a decade of crafting unforgettable moments for audiences
            around the world, I jumped into software to build things with
            staying power. <br />
            <br className="hidden sm:block" />
            My background gives me a unique mix of creativity and technical
            know-how that I&apos;ve been putting to work as a front-end dev for
            the past 5 years. <br />
            I&apos;m all about creating digital products that actually help
            people.
            <br />
            Whether it&apos;s making data more accessible or building interfaces
            that just make sense, I bring energy and enthusiasm to every project
            and love collaborating with others to make cool shit happen. <br />
            <br className="hidden sm:block" />
            {/* Make "together" a rainbow gradient Or some shining test */}
            Let&apos;s build something awesome together. 🚀
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

        <section className="lg:grid lg:grid-cols-12 lg:gap-6">
          <p className="text-muted mb-1 lg:text-3xl lg:col-span-4">
            Current goals
          </p>
          <ul className="list-disc ml-6 lg:col-span-8">
            <li>
              Becoming the best engineer by leading team to successful outcomes
            </li>
            <li>Do more backend work</li>
            <li>Do more with AI</li>
            <li>Learn entrepreneurship</li>
          </ul>
        </section>

        {/* TODO */}
        {/* <details>
          <summary className="">Keen to read on 📖?</summary>
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
            blah blah blah
          </div>
        </details> */}
        <div>
          <h4 className="text-muted mb-1 sm:mb-3 lg:text-3xl lg:mb-6">
            Fun facts
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FactCard>
              I became the host of the Melbourne Ruby Meetup to get rid of stage
              fright
            </FactCard>
            <FactCard>
              I finished fourth at a national downhill skateboarding race,
              whilst organising it <strong> and </strong> having food poisoning.
            </FactCard>
            <FactCard>
              I call AWS &quot;AWeSome&quot;.
              <br />
              <br className="hidden lg:block" />
              Apparantly, I&apos;m alone.
            </FactCard>
            <FactCard>I speak fluent English, Spanish, and French.</FactCard>
          </ul>
        </div>
      </div>
      {/* TODO */}
      {/* <p>what I use</p> */}
    </section>
  );
};
