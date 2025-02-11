import { useEffect, useState } from "react";
import moment from "moment";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdMenu, MdClose } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { base_api_url } from "../config/config";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  const [show, setShow] = useState(false);

  const [categories, setCategories] = useState([]); // Re-enable this state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const res = await fetch(`${base_api_url}/api/category/all`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      // console.log("Fetched Categories header:", data); // Debugging
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleNewsMenu = () => {
    setIsNewsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="px-5 lg:px-8 flex justify-between items-center py-3 font-bold">
        <div className="flex flex-row gap-2 items-center">
          <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
          <span className="text-[15px] font-medium">
            {moment().format("LLLL")}
          </span>
          <TiWeatherPartlySunny className="text-2xl" />
        </div>
        <Link to="/">
          <div className="flex flex-row gap-2 items-center">
            <GiNewspaper className="text-6xl text-green-700 shadow-md" />
            <p className="uppercase text-4xl font-cookie">
              The <span className="text-green-600">Demo</span> News
            </p>
          </div>
        </Link>
        <div className="hidden md:flex md:flex-row gap-2 items-center">
          <p>E-paper</p>
          <button className="px-3 py-1 text-md border rounded-md">
            Today's News
          </button>
          <div>
            <select
              className="px-3 py-1 text-md border rounded-md bg-green-400"
              onChange={(e) => handleChangeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ba">English</option>
            </select>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } w-64`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-lg font-bold">Menu</span>
            <MdClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>

          {/* Scrollable Content */}
          <div className="h-screen overflow-y-auto mb-2">
            <ul className="p-4 space-y-4">
              {categories.length > 0 ? (
                categories.map((categoryItem, index) => (
                  <li key={index} className="relative group">
                    <Link
                      className={`px-4 ml-2 text-xl  flex items-center`}
                      to={`/category/news/${categoryItem.category.toLowerCase()}`}
                    >
                      {categoryItem.category}
                    </Link>
                  </li>
                ))
              ) : (
                <p>No categories available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
