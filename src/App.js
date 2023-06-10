import { BrowserRouter, Routes, Route } from "react-router-dom";

import FilmItem from "./Components/film/filmItem";

import DetailsFilm from "./Components/film/details/details";
import DetailsAnime from "./Components/anime/details/details";
import Gallery from "./Components/Character/Gallery";
import Homepage from "./Components/anime/animeHome";
import HomePagest from "./Components/homepage/HomePagest";
import ContactUS from "./Components/homepage/ContactUS";
import UserVip from "./Components/homepage/UserVip";
import Login from "./Components/authentication/Login";
import Register from "./Components/authentication/Register";
import FilmHome from "./Components/film/filmHome";
import Infor from "./Components/infor/Infor";
import Profile from "./Components/dashboard/Profile";
import Aos from "aos";
import Password from "./Components/dashboard/Password";
import FavoritesMovies from "./Components/dashboard/FavoritesMovies";
import MovieList from "./Components/dashboard/admin/MovieList";
import Dashboard from "./Components/dashboard/admin/Dashboard";
import Categories from "./Components/dashboard/admin/Categories";
import Users from "./Components/dashboard/admin/Users";
import AddMovie from "./Components/dashboard/admin/AddMovie";
import AddAnime from "./Components/dashboard/admin/AddAnime";
import UpdateMovie from "./Components/dashboard/admin/UpdateMovie";
import UpdateAnime from "./Components/dashboard/admin/UpdateAnime";
import ListMovieEpisode from "./Components/dashboard/admin/ListMovieEpisode";
import ListAnimeEpisode from "./Components/dashboard/admin/ListAnimeEpisode";
import Header from "./Components/homepage/Header";
import Footer from "./Components/homepage/Footer";
import AnimeItem from "./Components/anime/animeItem";
import Pay from "./Components/payComponent";
import NotFound from "./Components/404NotFound";
import BXHPhim from "./Components/dashboard/BXHPhim";




function App() {
  Aos.init();
 
  return (

    <BrowserRouter>
     
      <Header />
      <Routes>
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/dangky" element={<Register />} />
        <Route path="/infor" element={<Infor />} />
        <Route path="/phim" element={<FilmHome />} />
        <Route path="/anime" element={<Homepage />} />
        <Route path="/" element={<HomePagest />} />
        <Route path="/film/:id" element={<FilmItem />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/anime/:id/details/:episode" element={<DetailsAnime />} />
        <Route path="/film/:id/details/:episode" element={<DetailsFilm />} />
        <Route path="/character/:id" element={<Gallery />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Password" element={<Password />} />
        <Route path="/favorites" element={<FavoritesMovies />} />
        <Route path="/movieslist" element={<MovieList />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users" element={<Users />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/addanime" element={<AddAnime />} />
        <Route path="/pay" element={<Pay/>} />
        <Route path="/vip-user" element={<UserVip/>} />
        <Route path="/contactUS" element={<ContactUS/>} />
        <Route path="/404-notfound" element={<NotFound/>} />
        <Route path="/updatemovie/:id" element={<UpdateMovie />} />
        <Route path="/updateanime/:id" element={<UpdateAnime />} />
        <Route path="/listepisodemovie/:id" element={<ListMovieEpisode />} />
        <Route path="/listepisodeanime/:id" element={<ListAnimeEpisode />} />
        <Route path="/bxh" element={<BXHPhim />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;

