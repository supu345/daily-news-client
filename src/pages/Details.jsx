import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { base_api_url } from "../config/config";
import parse from "html-react-parser";
import RecentNews from "../components/RecentNews";

import PopularNews from "../components/PopularNews";
import { PiGlobeLight } from "react-icons/pi";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
const Details = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all latest news (if needed)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
        const { news } = await res.json();
        setNews(news);
        console.log("Fetched news details:", news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="px-8 py-4">
      <Breadcrumb one="category" two={slug} />
      <div className="flex flex-col md:flex-row gap-8 mt-5">
        <div className="w-full md:w-2/3">
          <div className="">
            {news ? (
              <div>
                <p className="text-3xl font-bold mb-5">{news.title}</p>
                <img
                  src={news.image}
                  alt="img"
                  className="h-[400px] w-full object-cover mb-5 rounded-md"
                />
                <p>
                  {news.description
                    ? parse(news.description)
                    : "No description available."}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <RecentNews />
          <div className="w-full mt-3">
            <p className="text-xl font-bold "> Social Counter</p>

            <div>
              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <PiGlobeLight className="bg-red-500 text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaFacebookF
                    className="bg-blue-600 text-4xl text-white
                        rounded-full p-2 m-2"
                  />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <IoLogoInstagram className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaLinkedinIn
                    className="bg-blue-500 text-4xl text-white
                        rounded-full p-1 m-2"
                  />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-2 ">
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaXTwitter className="bg-black text-4xl text-white rounded-full p-1 m-2" />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
                <div className="w-1/2 border flex flex-row gap-2 items-center m-2 rounded-md py-3">
                  <FaYoutube className="bg-red-600 text-4xl text-white rounded-full p-2 m-2 " />
                  <div className=" ">
                    <p>4.3k</p>
                    <p>followers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <PopularNews />
      </div>
    </div>
  );
};

export default Details;
