import React, { useEffect, useState } from "react";
import SampleIcon from "../assets/desert.png";
import SampleIcon1 from "../assets/stay-home.png";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { PiGlobeLight } from "react-icons/pi";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
const Home = () => {
  const [activeTab, setActiveTab] = useState("mostPopular");
  const [news, setNews] = useState([]);
  const [newsCate, setNewsCate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("business"); // Initial category

  // Fetch all latest news (if needed)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/latest/news`, {
          credentials: "include",
        });
        const { news } = await res.json();
        setNews(news);
        console.log("Fetched news:", news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Fetch news by selected category
  useEffect(() => {
    const fetchNewsCate = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/all/news`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("Fetched data:", data);
        setNewsCate(data.news || {}); // Ensure it's an object
      } catch (error) {
        console.error("Error fetching news by category:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchNewsCate();
    }
  }, [category]);
  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  if (loading) return <p>Loading...</p>;

  const tabContent = {
    mostPopular: [
      "Content for Most Popular",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    ],
    mostRecent: [
      "Content for Most mostRecent",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    ],
    editorsPick: [
      "Content for  editorsPick",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    ],
  };

  return (
    <div className="mt-[20px] ml-4 mr-2 px-3">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Left Section */}
        <div className="w-full md:w-4/6">
          <div className="py-3">
            {news.slice(0, 1).map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt="img"
                  className="h-[230px] w-full object-cover"
                />
                <Link to={`/news/${item.slug}`}>
                  <p className="text-4xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                    {item.title}
                  </p>
                </Link>

                <p className="text-gray-700 mt-2">
                  {parse(item.description.slice(0, 100))}
                </p>
              </div>
            ))}
          </div>
          <div className="border"></div>
          <div className="py-3 ">
            {news.slice(1, 5).map((item) => (
              <div>
                <div key={item.id}>
                  <div className="flex flex-row gap-2 mt-5">
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>

                    <img
                      src={item.image}
                      alt="img"
                      className="h-[80px] w-[200px] object-cover"
                    />
                  </div>
                  <p className="text-gray-700 mt-2 mb-3">
                    {parse(item.description.slice(0, 100))}
                  </p>
                  <div className="border"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sections */}
        <div className="border"></div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3  rounded-lg p-2 ">
            {news.slice(4, 7).map((item) => (
              <div key={item.id}>
                <div className="py-3">
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[180px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-2xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2">
                    {parse(item.description.slice(0, 100))}
                  </p>
                </div>
                <div className="border "></div>
              </div>
            ))}
          </div>
          <div className="border"></div>
          <div className="w-full md:w-1/3  rounded-lg p-4 ">
            <div className="mt-2 py-3">
              {news.slice(8, 14).map((item) => (
                <div key={item}>
                  <div>
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-2xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>

                    <p className="text-gray-700 mt-2">
                      {parse(item.description.slice(0, 100))}
                    </p>
                  </div>
                  <div className="border"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="border"></div>
          <div>
            {/* add section */}{" "}
            <div className="flex flex-col gap-2">
              {news.slice(14, 15).map((item, index) => (
                <div key={index} className="w-full rounded-lg py-3">
                  <div
                    className="relative bg-local bg-cover bg-center h-[200px]"
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                  >
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Content */}
                    <div className="relative flex flex-col justify-center items-center h-full text-white z-10">
                      <p className="text-4xl font-bold mb-4 text-green-600 font-bebas">
                        Know More
                      </p>
                      <p className="text-xl font-bold mb-4">About Us.</p>
                      <Link to={`/news/${item.slug}`}>
                        <p className="text-center max-w-md cursor-pointer hover:text-green-600">
                          {item.title}
                        </p>
                      </Link>
                    </div>
                  </div>

                  <div className="border"></div>

                  {/*Social Icons */}
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
              ))}
            </div>
            {/* below add */}
            <div className="flex flex-col gap-5">
              {news.slice(16, 18).map((item, index) => (
                <div key={item}>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[230px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="w-[320px] object-cover mt-2 font-semibold text-xl cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border"></div>
      <div className="flex flex-wrap gap-2 w-full">
        {news.slice(1, 4).map((item, index) => (
          <div key={index} className="md:w-1/4">
            <div className="p-2">
              <Link to={`/news/${item.slug}`}>
                <p className="text-2xl font-bold cursor-pointer hover:text-green-600">
                  {item.title}
                </p>
              </Link>

              <p className="text-sm text-gray-600">
                {parse(item.description.slice(0, 100))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*opinion */}
      <div className="py-4">
        <div className="flex items-center my-4 relative">
          <div className="flex  flex-col grow ">
            <div className="border-t border-slate-500 "></div>
            <div className="border-t border-2 border-slate-500 mt-1 "></div>
          </div>
          <div className="px-4 text-8xl font-semibold opacity-10 absolute ml-[590px] text-slate-400">
            Opinion
          </div>
          <div className="px-[120px] text-5xl font-semibold text-orange-500 ">
            Opinion
          </div>{" "}
          {/* This will appear below */}
          <div className="flex flex-col grow">
            <div className="border-t border-slate-500"></div>
            <div className="border-t border-2 border-slate-500 mt-1"></div>
          </div>
        </div>
      </div>
      {/*opinion content*/}
      <div className="mt-8">
        <div className="flex flex-col  md:flex-row gap-3">
          {/* left */}
          <div className=" w-full md:w-2/5">
            {news.slice(3, 4).map((item, index) => (
              <div>
                <div className="py-3 mb-3">
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[300px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-2xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2">
                    {parse(item.description.slice(0, 150))}
                  </p>
                </div>
                <div className="border"></div>
              </div>
            ))}

            {/* left  without image*/}
            {news.slice(2, 4).map((item, index) => (
              <div>
                <div>
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-2xl mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2 mb-4">
                    {parse(item.description.slice(0, 150))}
                  </p>
                </div>
                <div className="border"></div>
              </div>
            ))}
          </div>
          {/* middle */}
          <div className="w-full md:w-2/6 px-4">
            {news.slice(0, 5).map((item, index) => (
              <div key={index} className="py-3 mb-3">
                <div className="flex flex-row items-start gap-3">
                  <div className="flex-1">
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-xl font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[100px] w-[180px] object-cover"
                  />
                </div>
                <div className="border"></div>
              </div>
            ))}
          </div>

          {/* right sight */}
          <div className="flex flex-col gap-6 ">
            <div className="w-full  mt-3">
              <img
                src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>
            <div className="w-full mt-3">
              <img
                src="https://images.pexels.com/photos/29237856/pexels-photo-29237856/free-photo-of-vibrant-yellow-ginkgo-leaves-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[50px] my-4">
        <img
          src="https://images.pexels.com/photos/30201143/pexels-photo-30201143/free-photo-of-vibrant-bouquet-of-orange-dahlias-in-hanoi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img"
          className="h-[100px] w-[1400px] object-cover"
        />
      </div>
      {/*Finance  Business*/}
      <div className="py-4">
        <div className="flex items-center my-4 relative">
          <div className="flex flex-col grow ">
            <div className="border-t border-slate-500 "></div>
            <div className="border-t border-2 border-slate-500 mt-1 "></div>
          </div>
          <div className="px-4 text-8xl font-semibold opacity-10 absolute ml-[590px] text-slate-400">
            Business
          </div>
          <div className="px-[120px] text-5xl font-semibold text-black ">
            Business
          </div>{" "}
          {/* This will appear below */}
          <div className="flex flex-col grow">
            <div className="border-t border-slate-500"></div>
            <div className="border-t border-2 border-slate-500 mt-1"></div>
          </div>
        </div>
      </div>
      {/*Finance content */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-3">
          {/* left */}
          {/* <div className="w-2/6 px-4">
            <div className="py-3 mb-3 flex flex-row gap-3">
              <p className="text-xl mt-2 font-semibold">
                HMPV-infected woman with other complications dies in Dhaka
              </p>
              <img
                src="https://images.pexels.com/photos/30088706/pexels-photo-30088706/free-photo-of-nyc-ferry-by-iconic-manhattan-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[100px] w-[200px] object-cover"
              />
            </div>

            <div className="border"></div>
            <div className="py-3 mb-3 flex flex-row gap-3">
              <p className="text-xl mt-2 font-semibold">
                HMPV-infected woman with other complications dies in Dhaka
              </p>
              <img
                src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[100px] w-[300px] object-cover"
              />
            </div>
            <div className="border"></div>
            <div className="py-3 mb-3 flex flex-row gap-3">
              <p className="text-xl mt-2 font-semibold">
                HMPV-infected woman with other complications dies in Dhaka
              </p>
              <img
                src="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[100px] w-[200px] object-cover"
              />
            </div>
            <div className="border"></div>
            <div className="py-3 mb-3 flex flex-row gap-3">
              <p className="text-xl mt-2 font-semibold">
                HMPV-infected woman with other complications dies in Dhaka
              </p>
              <img
                src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[100px] w-[200px] object-cover"
              />
            </div>
            <div className="border"></div>
          </div> */}

          <div className="w-full md:w-2/6 px-4">
            {newsCate["Finance"] &&
              newsCate["Finance"].slice(0, 4).map((item, index) => (
                <div>
                  <div className="py-3 mb-3 flex flex-row gap-3">
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>

                    <img
                      src={item.image}
                      alt="img"
                      className="h-[100px] w-[200px] object-cover"
                    />
                  </div>
                  <div className="border"></div>
                </div>
              ))}
          </div>
          {/* middle */}
          <div className="w-full md:w-2/5">
            {newsCate["Finance"] &&
              newsCate["Finance"].slice(0, 1).map((item, index) => (
                <div className="py-3 mb-3">
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[300px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-4xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2">
                    {parse(item.description.slice(0, 150))}
                  </p>
                </div>
              ))}
          </div>

          {/* right sight */}
          <div className="w-full md:w-1/5 mt-3">
            {newsCate["Finance"] &&
              newsCate["Finance"].slice(0, 5).map((item, index) => (
                <div>
                  <div className="mb-2">
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                  <div className="border"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/*Sports*/}
      <div className="py-4">
        <div className="flex items-center my-4 relative">
          <div className="flex flex-col grow ">
            <div className="border-t border-slate-500 "></div>
            <div className="border-t border-2 border-slate-500 mt-1 "></div>
          </div>
          <div className="px-4 text-8xl font-semibold opacity-10 absolute ml-[620px] text-slate-400">
            Sports
          </div>
          <div className="px-[120px] text-5xl font-semibold text-black ">
            Sports
          </div>{" "}
          {/* This will appear below */}
          <div className="flex flex-col grow">
            <div className="border-t border-slate-500"></div>
            <div className="border-t border-2 border-slate-500 mt-1"></div>
          </div>
        </div>
      </div>

      <div></div>

      {/*Sports content*/}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-2/5">
            {newsCate["Sports"] &&
              newsCate["Sports"].slice(0, 1).map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[300px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2">
                    {parse(item.description.slice(0, 150))}
                  </p>
                </div>
              ))}

            {/* left  without image*/}
            {newsCate["Sports"] &&
              newsCate["Sports"]
                .slice(0, 3) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div>
                      {/* Title */}
                      <Link to={`/news/${item.slug}`}>
                        <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                          {item.title}
                        </p>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-700 mt-2 mb-4">
                        {parse(item.description.slice(0, 150))}{" "}
                        {/* Parse and truncate */}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border"></div>
                  </div>
                ))}
          </div>
          {/* middle */}
          <div className="w-full md:w-2/6 px-4">
            {news.slice(0, 5).map((item, index) => (
              <div key={index} className="py-3 mb-3">
                <div className="flex flex-row items-start gap-3">
                  <div className="flex-1">
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-xl font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[100px] w-[200px] object-cover"
                  />
                </div>
                <div className="border"></div>
              </div>
            ))}
          </div>

          {/* right sight */}
          <div className="flex flex-col gap-8">
            <div className=" w-full  mt-3">
              <img
                src="https://images.pexels.com/photos/1637731/pexels-photo-1637731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>

            <div className=" w-full  mt-3">
              <img
                src="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/*News*/}
      <div className="py-4">
        <div className="flex items-center my-4 relative">
          <div className="flex flex-col grow ">
            <div className="border-t border-slate-500 "></div>
            <div className="border-t border-2 border-slate-500 mt-1 "></div>
          </div>
          <div className="px-4 text-7xl font-semibold opacity-10 absolute ml-[630px] text-slate-400">
            News
          </div>
          <div className="px-[150px] text-5xl font-semibold text-black ">
            News
          </div>{" "}
          {/* This will appear below */}
          <div className="flex flex-col grow">
            <div className="border-t border-slate-500"></div>
            <div className="border-t border-2 border-slate-500 mt-1"></div>
          </div>
        </div>
      </div>
      {/*News content*/}
      <div className="px-3">
        <div className="flex flex-col md:flex-row gap-6">
          {newsCate["Business"] &&
            newsCate["Business"]
              .slice(0, 3) // Select only the first 2 items
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full md:w-1/2 gap-4"
                >
                  <div className="py-3 mb-3">
                    <img
                      src={item.image}
                      alt="img"
                      className="h-[300px] w-full object-cover"
                    />
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>

                    <p className="text-gray-700 mt-2">
                      {parse(item.description.slice(0, 150))}{" "}
                    </p>
                  </div>
                  <div className="border"></div>
                </div>
              ))}
        </div>
      </div>

      {/* tab */}
      <div className="flex flex-col md:flex-row gap-5 mt-5 mb-[70px]">
        <div className="w-full md:w-1/3 bg-blue-100">
          <div className="w-full">
            {/* Tab Header */}
            <div className="flex justify-center border-b border-gray-300">
              <button
                onClick={() => setActiveTab("mostPopular")}
                className={`px-4 py-2 font-bold text-xl ${
                  activeTab === "mostPopular"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Most Popular
              </button>
              <button
                onClick={() => setActiveTab("mostRecent")}
                className={`px-4 py-2 font-bold text-xl ${
                  activeTab === "mostRecent"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Most Recent
              </button>
              <button
                onClick={() => setActiveTab("editorsPick")}
                className={`px-4 py-2 font-bold text-xl ${
                  activeTab === "editorsPick"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                Editor's Pick
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {Array.isArray(tabContent[activeTab]) ? (
                <div>
                  <ol className="list-decimal list-inside text-xl py-2 px-3 font-bold space-y-2">
                    {tabContent[activeTab].map((content, index) => (
                      <li key={index} className=" decoration-gray-400">
                        {content}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p>{tabContent[activeTab]}</p>
              )}
            </div>
          </div>
        </div>

        <div className=" w-full md:w-2/3 bg-slate-100 p-3">
          <img
            src="https://images.pexels.com/photos/6257703/pexels-photo-6257703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="h-[150px] w-full object-cover opacity-20"
          />
          <div className="flex flex-col md:flex-row gap-8">
            {/* Tab right */}
            {newsCate["Business"] &&
              newsCate["Business"]
                .slice(3, 5) // Select only the first 2 items
                .map((item, index) => (
                  <div className="w-full md:w-1/2">
                    <div className="py-3 mb-3">
                      <img
                        src={item.image}
                        alt="img"
                        className="h-[300px] w-full object-cover"
                      />
                      <Link to={`/news/${item.slug}`}>
                        <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                          {item.title}
                        </p>
                      </Link>

                      <p className="text-gray-700 mt-2">
                        {parse(item.description.slice(0, 150))}{" "}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/*Entertaintment1*/}
      <div className="border py-2 bg-red-900 flex justify-center items-center relative">
        <img
          src={SampleIcon}
          alt="Sample Icon"
          className="w-30 h-30 absolute inset-0 m-auto"
        />
      </div>
      {/*Entertaintment2*/}
      <div className="py-8 mt-4">
        <div className="flex items-center my-4 relative">
          <div className="flex flex-col grow ">
            <div className="border-t border-slate-500 "></div>
            <div className="border-t border-2 border-slate-500 mt-1 "></div>
          </div>
          <div className="px-4 text-7xl font-semibold opacity-10 absolute ml-[550px] text-slate-500">
            Entertaintment
          </div>
          <div className="px-[120px] text-5xl font-semibold text-black ">
            Entertaintment
          </div>{" "}
          {/* This will appear below */}
          <div className="flex flex-col grow">
            <div className="border-t border-slate-500"></div>
            <div className="border-t border-2 border-slate-500 mt-1"></div>
          </div>
        </div>
      </div>

      {/*Entertaintment content*/}

      <div className="mt-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-2/5">
            {newsCate["Entertaintment"] &&
              newsCate["Entertaintment"].slice(1, 2).map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[300px] w-full object-cover"
                  />
                  <Link to={`/news/${item.slug}`}>
                    <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                      {item.title}
                    </p>
                  </Link>

                  <p className="text-gray-700 mt-2 mb-3">
                    {parse(item.description.slice(0, 150))}
                  </p>
                </div>
              ))}
            <div className="border"></div>
            {/* left  without image*/}
            {newsCate["Entertaintment"] &&
              newsCate["Entertaintment"]
                .slice(0, 3) // Select only the first 3 items
                .map((item, index) => (
                  <div key={index}>
                    <div>
                      {/* Title */}
                      <Link to={`/news/${item.slug}`}>
                        <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                          {item.title}
                        </p>
                      </Link>

                      {/* Description */}
                      <p className="text-gray-700 mt-2 mb-4">
                        {parse(item.description.slice(0, 150))}{" "}
                        {/* Parse and truncate */}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border"></div>
                  </div>
                ))}
          </div>
          {/* middle */}
          <div className="w-full md:w-2/6 px-4">
            {newsCate["Entertaintment"] &&
              newsCate["Entertaintment"]
                .slice(0, 5) // Select only the first 3 items
                .map((item, index) => (
                  <div>
                    <div className="py-3 mb-3 flex flex-row gap-3">
                      <div className="flex-1">
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-xl font-semibold cursor-pointer hover:text-green-600">
                            {item.title}
                          </p>
                        </Link>
                      </div>
                      <img
                        src={item.image}
                        alt="img"
                        className="h-[100px] w-[200px] object-cover"
                      />
                    </div>
                    <div className="border"></div>
                  </div>
                ))}
          </div>
          {/* right sight */}
          <div className="flex flex-col gap-5">
            <div className="w-full mt-3">
              <img
                src="https://images.pexels.com/photos/63328/wells-theatre-norfolk-virginian-seats-63328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>

            <div className=" mt-3">
              <img
                src="https://images.pexels.com/photos/207582/pexels-photo-207582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="img"
                className="h-[250px] w-[350px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/*LifeStyle1*/}
      <div className="border-2 py-2 mt-12 bg-red-900 flex justify-center items-center relative">
        <img
          src={SampleIcon1}
          alt="Sample Icon"
          className="w-20 h-20 absolute inset-0 m-auto"
        />
      </div>
      <div className="bg-green-100">
        {" "}
        {/*LifeStyle2*/}
        <div className="py-8 mt-4">
          <div className="flex items-center my-4 relative">
            <div className="flex flex-col grow ">
              <div className="border-t border-slate-500 "></div>
              <div className="border-t border-2 border-slate-500 mt-1 "></div>
            </div>
            <div className="px-4 text-8xl font-semibold opacity-10 absolute ml-[590px] text-slate-800">
              Lifestyle
            </div>
            <div className="px-[120px] text-5xl font-semibold order-slate-500 ">
              Lifestyle
            </div>{" "}
            {/* This will appear below */}
            <div className="flex flex-col grow">
              <div className="border-t border-slate-500"></div>
              <div className="border-t border-2 border-slate-500 mt-1"></div>
            </div>
          </div>
        </div>
        {/*LifeStyle*/}
        <div className="mt-8 mb-4">
          <div className="flex flex-col md:flex-row gap-3 px-4">
            <div className="w-full md:w-2/5">
              {newsCate["Lifestyle"] &&
                newsCate["Lifestyle"].slice(0, 1).map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.image}
                      alt="img"
                      className="h-[300px] w-full object-cover"
                    />
                    <Link to={`/news/${item.slug}`}>
                      <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                        {item.title}
                      </p>
                    </Link>

                    <p className="text-black mt-2 mb-3">
                      {parse(item.description.slice(0, 150))}
                    </p>
                  </div>
                ))}
              <div className="border"></div>
              {/* left  without image*/}
              {newsCate["Lifestyle"] &&
                newsCate["Lifestyle"]
                  .slice(0, 3) // Select only the first 3 items
                  .map((item, index) => (
                    <div key={index}>
                      <div>
                        {/* Title */}
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-2xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                            {item.title}
                          </p>
                        </Link>

                        {/* Description */}
                        <p className="text-black mt-2 mb-4">
                          {parse(item.description.slice(0, 150))}{" "}
                          {/* Parse and truncate */}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="border"></div>
                    </div>
                  ))}
            </div>
            {/* middle */}
            <div className="w-full md:w-2/6 px-4">
              {newsCate["Lifestyle"] &&
                newsCate["Lifestyle"]
                  .slice(0, 5) // Select only the first 3 items
                  .map((item, index) => (
                    <div>
                      <div className="py-3 mb-3 flex flex-row gap-3">
                        <Link to={`/news/${item.slug}`}>
                          <p className="text-xl  mt-2 font-semibold cursor-pointer hover:text-green-600">
                            {item.title}
                          </p>
                        </Link>

                        <img
                          src={item.image}
                          alt="img"
                          className="h-[100px] w-[200px] object-cover"
                        />
                      </div>
                      <div className="border"></div>
                    </div>
                  ))}
            </div>
            {/* right sight */}
            <div className="flex flex-col gap-6">
              <div className=" mt-3">
                <img
                  src="https://images.pexels.com/photos/936611/pexels-photo-936611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="img"
                  className="h-[250px] w-[350px] object-cover"
                />
              </div>

              <div className=" mt-3">
                <img
                  src="https://images.pexels.com/photos/207582/pexels-photo-207582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="img"
                  className="h-[250px] w-[350px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
