import React, { useState } from "react";
import moment from "moment";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdMenu, MdClose } from "react-icons/md";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
const Footer = () => {
  const scrollTop = () => {
    const scrollStep = -window.scrollY / 50;
    const delay = 10;

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, delay);
  };
  return (
    <div className="bg-gray-900 text-white">
      <div className=" flex flex-col md:flex-row gap-4 pt-[50px] items-center">
        <div className="w-2/6 mb-9 ml-5 flex flex-row gap-4">
          <Link to="/">
            <div className="flex flex-row gap-2 items-center">
              <GiNewspaper className="text-6xl text-green-700 shadow-md" />
              <p className="uppercase text-4xl font-cookie">
                The <span className="text-green-600">Demo</span> News
              </p>
            </div>
            <p className="mt-7">Lorem ipsum dolor sit amet.Lorem ipsum dolor</p>
          </Link>
        </div>
        <div className="w-1/6  ">
          <p>About Us</p>
          <p>Contact Us</p>
        </div>
        <div className="w-1/6">
          <p>About Us</p>
          <p>Contact Us</p>
        </div>
        <div className="w-1/6">
          <p>About Us</p>
          <p>Contact Us</p>
        </div>
        <div className="w-1/6">
          <p>About Us</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div className="border border-slate-200 w-full"></div>

      <div
        onClick={scrollTop}
        id="scroll"
        className="fixed bottom-4 right-4 cursor-pointer"
      >
        <button className="bg-slate-300 p-3 rounded-md  shadow-md">
          <span>
            <FaArrowUp className="text-black" />
          </span>
        </button>
      </div>
      <div className="text-center py-5 border-t border-gray-300/50 text-gray-700 dark:text-gray-200">
        © 2025 All rights reserved || Made with Suparna
      </div>
    </div>
  );
};

export default Footer;
