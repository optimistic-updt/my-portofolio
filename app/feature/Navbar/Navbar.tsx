"use client";

import React, { FC, useState } from "react";
import { Logo } from "./Logo";
import { Drawer } from "vaul";

// import Fade from 'react-reveal/Fade';

const NAV_ITEMS = [
  {
    href: "#projects",
    label: "projects",
  },
  {
    href: "#about",
    label: "about",
  },
  {
    href: "#contact",
    label: "contact",
  },
];

export const NavBar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-10 flex items-center justify-between w-full py-4 px-4">
      <a href="#home">
        <span className="sr-only">Go Home</span>
        <Logo className="size-8" />
      </a>

      <Drawer.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Drawer.Trigger
          className="relative size-8 focus:outline-none rounded-md xs:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="absolute w-6 -translate-x-2 -translate-y-px">
            <span
              className={`absolute h-0.5 w-full bg-white transition-all duration-200 ${
                isMenuOpen ? "rotate-45 translate-y-0" : "translate-y-[-8px]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
              }}
            />
            <span
              className={`absolute h-0.5 w-full bg-white transition-all duration-200 ${
                isMenuOpen ? "opacity-0" : "translate-y-0"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
              }}
            />
            <span
              className={`absolute h-0.5 w-full bg-white transition-all duration-200 ${
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-[8px]"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
              }}
            />
          </div>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Content className="z-50 fixed bottom-0 left-0 right-0 flex max-h-[95dvh] flex-col rounded-t-lg px-4 pt-4 bg-white pb-4">
            <Drawer.Handle className="mb-4" />

            <Drawer.Title className="sr-only">Navigation Menu</Drawer.Title>
            <Drawer.Description className="sr-only">
              Select where you want to go
            </Drawer.Description>

            {NAV_ITEMS.map((item) => (
              <a
                href={item.href}
                key={item.href}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
              >
                {item.label}
              </a>
            ))}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* icon */}

      {/* <Fade top cascade delay={3500}> */}
      {/* <a
          href="#projects"
          className="ml-[3%] uppercase tracking-[2px] pb-[1px] border-b-2 border-transparent hover:border-black transition-[border] duration-500 ease-in"
        >
          projects
        </a>

        <a
          href="#about"
          className="ml-[3%] uppercase tracking-[2px] pb-[1px] border-b-2 border-transparent hover:border-black transition-[border] duration-500 ease-in"
        >
          about
        </a>

        <a href="#contact" className="ml-[3%] uppercase tracking-[2px]">
          <span>contact</span>
        </a> */}
      {/* </Fade> */}
    </nav>
    // </Fade>
  );
};

export default NavBar;
