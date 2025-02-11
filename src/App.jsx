import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryNewsPage from "./pages/CategoryNewsPage";
import HeaderCategory from "./components/HeaderCategory"; // Import HeaderCategory here
import Details from "./pages/Details";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <HeaderCategory />{" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/news/:category"
            element={
              <>
                {/* Render HeaderCategory inside the route */}
                <CategoryNewsPage />
              </>
            }
            caseSensitive={true}
          />
          <Route path="/news/:slug" element={<Details />} />
          <Route path="/search/news?" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
