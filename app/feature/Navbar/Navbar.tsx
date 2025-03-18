"use client";

import React, { FC, useState } from "react";
import { Logo } from "./Logo";
import { Drawer } from "vaul";

// import Fade from 'react-reveal/Fade';

const NAV_ITEMS = [
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

export const NavBar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //   const navLink = document.querySelectorAll('.index-nav-inner a');

  // window.addEventListener('scroll', () => {
  //   let spot = window.pageYOffset

  //   navLink.forEach(link => {
  //     let section = document.querySelector(link.hash);

  //     if (
  //       section.offsetTop <= spot &&
  //       section.offsetTop + section.offsetHeight > spot
  //     ) {
  //       link.classList.add('active')
  //     } else {
  //       link.classList.remove('active')
  //     }
  //   })
  // });

  return (
    // TODO make appearing bg
    <header className="fixed top-0 z-10 w-full py-4 px-6 bg-white xs:bg-opacity-90 lg:px-24">
      <div className="max-w-5xl flex items-center justify-between mx-auto">
        <a href="#home">
          <span className="sr-only">Go Home</span>
          <Logo className="size-8" />
        </a>

        {/* above mobile */}
        <nav className="space-x-4 hidden sm:block">
          {NAV_ITEMS.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className="uppercase pb-px border-b-2 border-transparent hover:border-black transition-[border] duration-500 ease-in"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile */}
        <Drawer.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <Drawer.Trigger
            className="relative size-8 focus:outline-none rounded-md sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="absolute w-6 -translate-x-2 -translate-y-px">
              <span
                className={`absolute h-0.5 w-full bg-black transition-all duration-200 ${
                  isMenuOpen ? "rotate-45 translate-y-0" : "translate-y-[-8px]"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
                }}
              />
              <span
                className={`absolute h-0.5 w-full bg-black transition-all duration-200 ${
                  isMenuOpen ? "opacity-0" : "translate-y-0"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
                }}
              />
              <span
                className={`absolute h-0.5 w-full bg-black transition-all duration-200 ${
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-[8px]"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(1, 0, 0, 1)",
                }}
              />
            </div>
          </Drawer.Trigger>

          <Drawer.Portal>
            {/* TODO FORGOT THE OVERLAY */}

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
      </div>
    </header>
  );
};

export default NavBar;
