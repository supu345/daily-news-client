import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineDown } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { base_api_url } from "../config/config";

const HeaderCategory = () => {
  const [show, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]); // Re-enable this state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Function to fetch categories
  const getCategories = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/category/all`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      console.log("Fetched Categories:", data); // Debugging
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getCategories();
  }, []);

  // Search function
  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?value=${searchQuery}`);
    setSearchQuery("");
    setShow(false);
  };

  // Toggle dropdown for categories with subcategories
  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="w-full shadow-md text-black font-semibold relative">
        <div className="px-4 flex justify-between items-center relative h-[48px]">
          {/* Categories Navigation */}
          <div className="hidden lg:flex">
            <div className="mt-3 ml-2">
              <Link to="/">Home</Link>
            </div>
            {categories.length > 0 ? (
              categories.map((categoryItem, index) => (
                <div key={index} className="relative group">
                  <Link
                    className={`px-4 ml-2 font-medium py-[13px] flex items-center`}
                    to={`/category/news/${categoryItem.category.toLowerCase()}`}
                  >
                    {categoryItem.category}
                  </Link>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>

          {/* Search Icon and Input */}
          <div className="h-full w-[48px]">
            <div
              onClick={() => setShow(!show)}
              className={`text-xl ${
                show ? "bg-[#00000026]" : ""
              } font-bold h-full w-full cursor-pointer flex justify-center items-center hover:bg-[#00000026]`}
            >
              {show ? <IoClose /> : <AiOutlineSearch />}
            </div>
            {show && (
              <div className="absolute transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0">
                <div className="p-3 bg-white">
                  <form onSubmit={search} className="flex">
                    <div className="w-[calc(100%-45px)] h-[40px]">
                      <input
                        value={searchQuery}
                        required
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                      />
                    </div>
                    <button className="w-[45px] hover:bg-red-700 cursor-pointer h-[40px] flex justify-center items-center bg-green-600 text-white text-xl">
                      <AiOutlineSearch />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCategory;
