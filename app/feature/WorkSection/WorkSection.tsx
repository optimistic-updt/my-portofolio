import Image from "next/image";
import { FC } from "react";

const PROJECTS = [
  {
    title: "Tapestry.ai",
    description:
      "Real-Time Data Infrastructure trusted by Fortune 500 companies",
    image: "/images/tapestry2.png",
    link: "https://www.tapestry.ai/",
  },
  {
    title: "Tiny Tripper",
    description: "Consumer website/app recommending activities for your kids",
    image: "/images/tiny-tripper.png",
    link: "https://tiny-tripper.vercel.app/",
  },
  {
    title: "Sm@rt Studio",
    description: "Digital Agency leveraging AI to help customers",
    image: "/images/smartstudio.png",
    link: "https://www.google.com",
  },
  {
    title: "My Portfolio",
    description: "What you see is what you get 😘",
    image: "/images/07_KK_Portraits_10_crop.jpg",
    link: "https://www.kevgarcia.fyi",
  },
];

export const WorkSection: FC = () => {
  // TODO make animation faster on exit
  return (
    <section id="work" className="px-6">
      <h3 className="text-3xl group relative inline-block overflow-x-hidden">
        <svg
          width="75"
          height="6"
          className="absolute -translate-x-full left-0 top-1/2 group-hover:-translate-x-0 duration-300 ease-out-expo"
        >
          <line
            x1="0"
            y1="0"
            x2="70"
            y2="0"
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        <span className="">Work</span>

        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in-out-quint duration-700 delay-[250ms]">
          Projects
        </span>
      </h3>

      <ul className="space-y-6 mt-3 md:hidden">
        {PROJECTS.map((project) => (
          <li key={project.title} className="rounded-md">
            <a
              href={project.link}
              className={`p-4 relative h-44 lg:h-[400px] bg-center bg-cover bg-black w-full inline-flex rounded-md flex-col justify-end text-white`}
              style={{ backgroundImage: `url(${project.image})` }}
            >
              {/* <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-transparent to-transparent" /> */}

              <h4 className="text-2xl">{project.title}</h4>
              <p className="text-sm tracking-wide">{project.description}</p>
            </a>
          </li>
        ))}
      </ul>

      <ul className="relative mt-3 justify-between items-center h-64 lg:h-72 xl:h-80 gap-6 xl:gap-9 hidden md:flex">
        {PROJECTS.map((project) => (
          <li
            key={project.title}
            className="cursor-alias group relative transition-all duration-500 ease-in-out h-full rounded-lg overflow-hidden flex-[1] hover:flex-[3] text-2xl text-white"
          >
            <Image
              src={project.image}
              className="w-full h-full object-cover transition-all object-center brightness-50"
              alt={project.title}
              width={476} //TODO
              height={274} //TODO
            />

            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-transparent to-transparent" />

            <h4 className="absolute w-max top-1/2 transform -translate-y-1/2 ml-6 font-medium tracking-wide">
              {project.title}
            </h4>

            <p className="absolute flex-1 text-left bottom-8 inset-x-6 group-hover:opacity-100 transition-opacity duration-500 delay-500 flex items-center justify-between opacity-0">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
