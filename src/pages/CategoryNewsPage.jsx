import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { base_api_url } from "../config/config";
import parse from "html-react-parser";
import RecentNews from "../components/RecentNews";
import { PiGlobeLight } from "react-icons/pi";
import PopularNews from "../components/PopularNews";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const CategoryNewsPage = () => {
  const { category } = useParams();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const normalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "";

  useEffect(() => {
    setNews([]);
    setPage(1);
  }, [normalizedCategory]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${base_api_url}/api/category/news/${normalizedCategory}?page=${page}&limit=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews((prevNews) =>
          page === 1 ? data.news : [...prevNews, ...(data.news || [])]
        );
        setTotalPages(data.pagination.totalPages || 1);
        console.log("Fetched news:", data.news);
      } catch (err) {
        console.error("Error fetching news:", err.message);
        setError(err.message);
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    if (normalizedCategory) {
      fetchNews();
    }
  }, [normalizedCategory, page]);

  const loadMoreNews = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="px-8 py-4">
      <Breadcrumb one="category" two={category} />
      <div className="flex flex-col  md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          {loading && page === 1 ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1  md:grid-cols-2 gap-8 ">
              {news.map((item, index) => (
                <div key={index} className="py-5 mb-3 ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[200px] w-full object-cover"
                  />
                  <p className="text-2xl mt-2 font-semibold">{item.title}</p>
                  <p className="text-gray-700 mt-2">
                    {parse(item.description.slice(0, 100))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No news found for this category.</p>
          )}

          {page < totalPages && (
            <button
              onClick={loadMoreNews}
              disabled={loading}
              className="bg-green-500 p-2 mb-4"
            >
              {loading ? "Loading..." : "Read More"}
            </button>
          )}
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

export default CategoryNewsPage;
