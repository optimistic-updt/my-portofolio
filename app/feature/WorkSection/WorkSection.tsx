import { FC } from "react";

const PROJECTS = [
  {
    title: "Tapestry.ai",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    link: "https://www.google.com",
  },
  {
    title: "Tiny Trippers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    link: "https://www.google.com",
  },
  {
    title: "Sm@rt Studio",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    link: "https://www.google.com",
  },
  {
    title: "My Portfolio",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    link: "https://www.google.com",
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

      <ul className="space-y-6 mt-3">
        {PROJECTS.map((project) => (
          <li key={project.title} className="bg-red-300 rounded-md">
            <a
              href={project.link}
              className="p-4 bg-[url('/images/07_KK_Portraits_10_crop.jpg')] h-44 bg-center bg-cover bg-green-400 inline-flex rounded-md flex-col justify-end text-white"
            >
              <h4 className="text-2xl">{project.title}</h4>
              <p className="text-sm tracking-wide">{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
