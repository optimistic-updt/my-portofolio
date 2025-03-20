import React, { FC } from "react";

const FactCard: FC<{
  children: React.ReactNode;
  icon: React.ReactElement;
}> = ({ children, icon }) => {
  return (
    <li className="bg-gray-100 rounded-md p-6 lg:p-12">
      {React.cloneElement(icon, {
        // @ts-expect-error TODO: className is not a valid property
        className: "size-6 lg:size-8 mb-6 lg:mb-12",
      })}
      {children}
    </li>
  );
};

export const AboutSection: FC = () => {
  return (
    <section id="about" className="px-6 xl:px-0 max-w-5xl mx-auto text-lg">
      <h3 className="text-3xl mb-3 lg:mb-12">About</h3>

      <div className="space-y-6 lg:space-y-16 lg:text-2xl">
        <div className="text-xl lg:text-5xl sm:max-w-[83%]">
          <h4>
            Hello <span className="inline-block">👋</span>
            😁, <br />
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
          <h4 className="mb-1 sm:mb-3 lg:text-3xl lg:mb-12">Fun facts</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FactCard
              icon={
                // microphone
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M476.9 204.9l1-1c45.9-46.9 45.6-122.2-1-168.7s-121.8-46.9-168.7-1l-1 .9s0 0 0 0l-16 16-16 16s0 0 0 0l-.9 1C251.8 91 240.4 120.7 240 150.5L17.2 388.2C6.1 400 0 415.5 0 431.6c0 16.8 6.7 33 18.6 44.9l16.8 16.8C47.4 505.3 63.5 512 80.4 512c16.1 0 31.7-6.1 43.4-17.2L232 393.4l0 94.6c0 13.3 10.7 24 24 24s24-10.7 24-24l0-139.6L361.5 272c29.8-.4 59.5-11.8 82.4-34.2l1-1 16-16 16-16zM361.9 224L325 187 288 150.1c.5-17.4 7.2-34.6 20.1-48L409.9 203.9c-13.4 12.9-30.7 19.6-48 20.1zm82-54L342.1 68.1c28.2-27.2 73-26.8 100.8 1s28.1 72.7 1 100.8zM80.4 464c-4.1 0-8.1-1.6-11-4.5L52.5 442.6c-2.9-2.9-4.5-6.9-4.5-11c0-3.9 1.5-7.7 4.2-10.6L264.6 194.5 291 221l26.5 26.5L91 459.8c-2.9 2.7-6.7 4.2-10.6 4.2z" />
                </svg>
              }
            >
              <p>
                I became the{" "}
                <span className="font-medium text-secondary">host of</span> the
                Melbourne{" "}
                <span className="font-medium text-secondary">Ruby Meetup</span>{" "}
                to get rid of stage fright 🫣
              </p>
            </FactCard>
            <FactCard
              icon={
                // gauge
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 464a208 208 0 1 0 0-416 208 208 0 1 0 0 416zM256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zm32 112a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM256 408c-30.9 0-56-25.1-56-56s25.1-56 56-56c10.3 0 19.9 2.8 28.2 7.6l110.2-75.4c10.9-7.5 25.9-4.7 33.4 6.3s4.7 25.9-6.3 33.4L311.3 343.2c.4 2.9 .7 5.8 .7 8.8c0 30.9-25.1 56-56 56zM384 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM112 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm80-64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z" />
                </svg>
              }
            >
              I finished fourth at a{" "}
              <span className="font-medium text-secondary">
                national downhill skateboarding race,
              </span>{" "}
              whilst organising it & having food poisoning. 🤢
            </FactCard>
            <FactCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M180.4 203c-.7 22.7 10.6 32.7 10.9 39.1a8.2 8.2 0 0 1 -4.1 6.3l-12.8 9a10.7 10.7 0 0 1 -5.6 1.9c-.4 0-8.2 1.8-20.5-25.6a78.6 78.6 0 0 1 -62.6 29.5c-16.3 .9-60.4-9.2-58.1-56.2-1.6-38.3 34.1-62.1 70.9-60.1 7.1 0 21.6 .4 47 6.3v-15.6c2.7-26.5-14.7-47-44.8-43.9-2.4 0-19.4-.5-45.8 10.1-7.4 3.4-8.3 2.8-10.8 2.8-7.4 0-4.4-21.5-2.9-24.2 5.2-6.4 35.9-18.4 65.9-18.2a76.9 76.9 0 0 1 55.7 17.3 70.3 70.3 0 0 1 17.7 52.4l0 69.3zM94 235.4c32.4-.5 46.2-20 49.3-30.5 2.5-10.1 2.1-16.4 2.1-27.4-9.7-2.3-23.6-4.9-39.6-4.9-15.2-1.1-42.8 5.6-41.7 32.3-1.2 16.8 11.1 31.4 30 30.5zm170.9 23.1c-7.9 .7-11.5-4.9-12.7-10.4l-49.8-164.7c-1-2.8-1.6-5.7-1.9-8.6a4.6 4.6 0 0 1 3.9-5.3c.2 0-2.1 0 22.3 0 8.8-.9 11.6 6 12.6 10.4l35.7 140.8 33.2-140.8c.5-3.2 2.9-11.1 12.8-10.2h17.2c2.2-.2 11.1-.5 12.7 10.4l33.4 142.6L421 80.1c.5-2.2 2.7-11.4 12.7-10.4h19.7c.9-.1 6.2-.8 5.3 8.6-.4 1.9 3.4-10.7-52.8 169.9-1.2 5.5-4.8 11.1-12.7 10.4h-18.7c-10.9 1.2-12.5-9.7-12.7-10.8L328.7 110.7l-32.8 137c-.2 1.1-1.7 11.9-12.7 10.8h-18.3zm273.5 5.6c-5.9 0-33.9-.3-57.4-12.3a12.8 12.8 0 0 1 -7.8-11.9v-10.8c0-8.5 6.2-6.9 8.8-5.9 10 4.1 16.5 7.1 28.8 9.6 36.7 7.5 52.8-2.3 56.7-4.5 13.2-7.8 14.2-25.7 5.3-35-10.5-8.8-15.5-9.1-53.1-21-4.6-1.3-43.7-13.6-43.8-52.4-.6-28.2 25.1-56.2 69.5-56 12.7 0 46.4 4.1 55.6 15.6 1.4 2.1 2 4.6 1.9 7v10.1c0 4.4-1.6 6.7-4.9 6.7-7.7-.9-21.4-11.2-49.2-10.8-6.9-.4-39.9 .9-38.4 25-.4 19 26.6 26.1 29.7 26.9 36.5 11 48.7 12.8 63.1 29.6 17.1 22.3 7.9 48.3 4.4 55.4-19.1 37.5-68.4 34.4-69.3 34.4zm40.2 104.9c-70 51.7-171.7 79.3-258.5 79.3A469.1 469.1 0 0 1 2.8 327.5c-6.5-5.9-.8-14 7.2-9.5a637.4 637.4 0 0 0 316.9 84.1 630.2 630.2 0 0 0 241.6-49.6c11.8-5 21.8 7.8 10.1 16.4zm29.2-33.3c-9-11.5-59.3-5.4-81.8-2.7-6.8 .8-7.9-5.1-1.8-9.5 40.1-28.2 105.9-20.1 113.4-10.6 7.6 9.5-2.1 75.4-39.6 106.9-5.8 4.9-11.3 2.3-8.7-4.1 8.4-21.3 27.4-68.5 18.4-80z" />
                </svg>
              }
            >
              I call AWS &quot;<strong className="text-secondary">A</strong>
              <strong className="text-secondary">W</strong>e
              <strong className="text-secondary">S</strong>
              ome&quot;.
              <br />
              <br className="hidden md:block" />
              Apparantly, I&apos;m alone... 😢
            </FactCard>
            <FactCard
              icon={
                // language
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l208 0 32 0 16 0 256 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L320 64l-16 0-32 0L64 64zm512 48c8.8 0 16 7.2 16 16l0 256c0 8.8-7.2 16-16 16l-256 0 0-288 256 0zM178.3 175.9l64 144c4.5 10.1-.1 21.9-10.2 26.4s-21.9-.1-26.4-10.2L196.8 316l-73.6 0-8.9 20.1c-4.5 10.1-16.3 14.6-26.4 10.2s-14.6-16.3-10.2-26.4l64-144c3.2-7.2 10.4-11.9 18.3-11.9s15.1 4.7 18.3 11.9zM179 276l-19-42.8L141 276l38 0zM456 164c-11 0-20 9-20 20l0 4-52 0c-11 0-20 9-20 20s9 20 20 20l72 0 35.1 0c-7.3 16.7-17.4 31.9-29.8 45l-.5-.5-14.6-14.6c-7.8-7.8-20.5-7.8-28.3 0s-7.8 20.5 0 28.3L430 298.3c-5.9 3.6-12.1 6.9-18.5 9.8l-3.6 1.6c-10.1 4.5-14.6 16.3-10.2 26.4s16.3 14.6 26.4 10.2l3.6-1.6c12-5.3 23.4-11.8 34-19.4c4.3 3 8.6 5.8 13.1 8.5l18.9 11.3c9.5 5.7 21.8 2.6 27.4-6.9s2.6-21.8-6.9-27.4l-18.9-11.3c-.9-.5-1.8-1.1-2.7-1.6c17.2-18.8 30.7-40.9 39.6-65.4L534 228l2 0c11 0 20-9 20-20s-9-20-20-20l-16 0-44 0 0-4c0-11-9-20-20-20z" />
                </svg>
              }
            >
              I speak fluent English, Spanish, and French. 🇧🇪🇦🇺🇪🇸
            </FactCard>
          </ul>
        </div>
      </div>
      {/* TODO */}
      {/* <p>what I use</p> */}
    </section>
  );
};
