import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import "./banner.css"

const baseImageUrl = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.2), rgba(51, 51, 51, 1)), url(${baseImageUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie.title ? movie.title : movie.name}</h1>
        
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{movie?.overview}</h1>
      </div>

      <div className="banner_fadebottom"></div>
    </header>
  );
}

export default Banner;
