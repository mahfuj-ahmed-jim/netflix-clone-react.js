import React, { useEffect, useState } from "react";
import axios from "../../axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [trailerUrl, setTraileUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if(movieName === movie?.name || movieName === movie?.title || ""){
      setTraileUrl("");
      setMovieName("");
    }else{
      movieTrailer(movie?.name || movie?.title || "" )
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTraileUrl(urlParams.get("v"));
        setMovieName(movie.name ? movie.name : movie.title);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const opts = {
    height: "390",
    width: "100%",
    playerView: {
      autoplay: 1,
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className={`row_posters`}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseImageUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title ? movie.title : movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
}

export default Row;
