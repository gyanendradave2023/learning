import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-detail" element={<MovieDetail />} />
        </Routes>

        {/*    
       <MovieList />
      <MovieDetail />  */}
      </div>
    </BrowserRouter>
  );
}

export default App;
