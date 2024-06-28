import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Header from "./components/Header";
import Favourite from "./components/Favourite";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MyComponent from "./components/MyComponent";

function App() {
  return (
    <div className="App">
      {/* <MyComponent /> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-list" element={<Navigate to={"/"} />} />
          <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
          <Route path="/favourites" element={<Favourite />} />
          <Route path="*" element={<div>Page not Found - 404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
