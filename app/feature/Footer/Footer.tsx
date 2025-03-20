import { ME } from "@/app/me";
import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="py-3 text-sm text-muted px-6 mx-auto bg-white">
      <div className="max-w-5xl gap-6 mx-auto flex flex-col-reverse sm:flex-row items-center justify-between">
        <div className="w-full sm:flex-grow">
          <p>
            Built on NextJS. Design by{" "}
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

        <nav className="text-primary flex items-center justify-around sm:justify-end w-full sm:w-auto sm:gap-3">
          {ME.socialLinks.map(({ name, url, icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary size-8"
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
