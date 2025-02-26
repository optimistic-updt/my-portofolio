import { ME } from "@/app/me";
import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="py-3 text-sm text-muted bg-white px-6 mx-auto lg:px-32">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between ">
        <div className="">
          <p>
            Built by me on NextJS. Design by{" "}
            <a
              href="https://www.kiranraszka.com/"
              target="blank"
              className="hover:underline hover:text-primary focus:text-primary focus:underline focus:outline-none duration-300 ease-in-out transition-colors font-medium tracking-wide"
            >
              Kiran
            </a>
          </p>
          <p>&copy; Kevin Garcia-Fernandez 2025. All rights reserved.</p>
        </div>

        <nav className="text-primary space-x-3 flex items-center">
          {ME.socialLinks.map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary size-9"
            >
              <span className="sr-only">Go to {name}</span>
              {icon}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
