import React, { useEffect, useState } from "react";
import { base_api_url } from "../config/config";
import { Link } from "react-router-dom";

const PopularNews = () => {
  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/popular/news`);
        const data = await res.json();
        setNews(data.popularNews || []);
        console.log("Fetched popular news:", data.popularNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <div className="w-full pb-8 mt-5">
        <div className="flex flex-col w-full gap-y-[14px]">
          <p className="pl-4 text-2xl font-bold">Popular news</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-3 lg:gap-x-4">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item._id}>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[200px] w-full opject-cover"
                  />
                  <p className="text-xl mt-2 font-semibold">{item.title}</p>
                </div>
              ))
            ) : (
              <p>No popular news available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
