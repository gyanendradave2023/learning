
import './App.css'
import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent'
import WatchlistComponent from './components/WatchlistComponent'
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  

  return (
    <>
    <BrowserRouter>
    <NavbarComponent />
      <Routes>
        <Route path="/" element={ <HomeComponent />} />
        <Route path="/watchlist" element={ <WatchlistComponent/>} />
        <Route path="*" element={ <h1 className='w-full p-4 flex justify-center'> Page not found </h1>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
