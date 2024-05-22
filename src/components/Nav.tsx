import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify-icon/react";

import config from "../data/config.json";

const Nav = () => {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(TextPlugin);
  const { contextSafe } = useGSAP();

  const [toggleMenu, setToggleMenu] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);

  const bodyElement = document.getElementsByTagName("body")[0];

  const menuTimeline: any = useRef();

  useGSAP(() => {
    menuTimeline.current = gsap.timeline({ paused: true });
    menuTimeline.current
      .set(wrapperRef.current, {
        height: "100%",
      })
      .set(navRef.current, {
        backgroundColor: "rgba(0,0,0,0)",
        color: "white",
      })
      .to(menuRef.current, {
        height: "100%",
        ease: "power2.out",
      })
      // .to(
      //   menuButtonRef.current,
      //   {
      //     text: "CLOSE",
      //     ease: "none",
      //     duration: 0,
      //   },
      //   "0"
      // )
      .fromTo(
        ".page",
        {
          y: -50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
        },
        "-=0.2"
      );
  });

  useEffect(
    contextSafe(() => {
      if (toggleMenu) {
        bodyElement.classList.add("max-h-screen");
        bodyElement.classList.add("overflow-hidden");

        menuTimeline.current.play();
      } else {
        bodyElement.classList.remove("max-h-screen");
        bodyElement.classList.remove("overflow-hidden");

        menuTimeline.current.reverse();
      }
    }),
    [toggleMenu]
  );
  const threshold = 200; // Adjust this value to set the scroll threshold
  let prevScrollpos = window.scrollY;
  let accumulatedScroll = 0;

  window.onscroll = contextSafe(() => {
    const currentScrollPos = window.scrollY;
    const scrollDifference = prevScrollpos - currentScrollPos;
    accumulatedScroll += scrollDifference;

    if (Math.abs(accumulatedScroll) >= threshold) {
      if (accumulatedScroll > 0) {
        if (navRef.current) {
          gsap.to(navRef.current, {
            top: 0,
          });
        }
      } else {
        if (navRef.current) {
          gsap.to(navRef.current, {
            top: -100,
          });
        }
      }
      // Reset accumulated scroll after applying the toggle
      accumulatedScroll = 0;
    }

    prevScrollpos = currentScrollPos;
  });

  return (
    <div ref={wrapperRef} className="fixed top-0 left-0 w-full z-50">
      <div
        ref={menuRef}
        className="absolute top-0 left-0 h-0 overflow-hidden w-full bg-slate-800 flex flex-col z-[60]"
      >
        <div className="h-full w-full pt-24 max-md:pt-0 text-7xl max-md:text-4xl uppercase font-extrabold">
          <ul className="max-w-screen-xl gap-4 md:mt-12 mx-auto flex flex-col max-md:items-center max-md:h-full max-md:justify-center">
            {config.pages.map((page, index) => (
              <a
                key={index}
                href={page.url}
                className="text-white w-fit page hover:text-primary transition-colors"
              >
                {page.name}
              </a>
            ))}
          </ul>
        </div>
      </div>
      <nav
        ref={navRef}
        className="text-2xl uppercase px-2 font-extrabold flex flex-row h-24 items-center max-w-screen-xl bg-white justify-between mx-auto relative z-[60]"
      >
        <a className="max-md:hidden" href="/">
          {config.businessName}
        </a>
        <h1 className="md:hidden">{config.name}</h1>
        <button ref={menuButtonRef} onClick={() => setToggleMenu(!toggleMenu)}>
          {toggleMenu ? (
            <Icon icon="mdi:close" className="text-5xl text-white" />
          ) : (
            "MENU"
          )}
        </button>
      </nav>
    </div>
  );
};

export default Nav;
