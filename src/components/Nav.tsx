import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import config from "../data/config.json";

const Nav = () => {
  gsap.registerPlugin(useGSAP);
  const { contextSafe } = useGSAP();

  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);

  const bodyElement = document.getElementsByTagName("body")[0];

  const menuTimeline: any = useRef();

  useGSAP(() => {
    menuTimeline.current = gsap.timeline({ paused: true });
    menuTimeline.current.to(menuRef.current, {
      height: "100%",
    });
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

  return (
    <div className="fixed top-0 left-0 h-full w-full">
      <div
        ref={menuRef}
        className="absolute top-0 left-0 h-0 w-full bg-white z-40"
      ></div>
      <nav className="flex justify-between text-2xl uppercase font-extrabold fixed z-50 w-full top-0 left-0 bg-white p-4">
        <a href="/" className="z-50">
          {config.businessName}
        </a>
        <button onClick={() => setToggleMenu(!toggleMenu)}>MENU</button>
      </nav>
    </div>
  );
};

export default Nav;
