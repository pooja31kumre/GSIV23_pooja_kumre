import { NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useFetch from "./Usefetch";

const DetailPage = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results !== "") {
        setIsLoading(false);
        setMovie(data.results || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // debouncing in react js
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
    }, 1000);

    return () => {
      clearTimeout(timeOut);

    };
  }, []);
  
  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }


  function reverseDateFormat(inputDate) {
    const parts = inputDate.split('-'); // Split the input date string
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
  
    const reversedDate = `${day}/${month}/${year}`; // Format the date in the desired order
    return reversedDate;
  }
  
  

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path} alt={movie.path} />
        </figure>
        <div className="card-content">
          <p className="title">{movie.title}</p>
          <p className=""></p>
          <p className="card-text">{reverseDateFormat(movie.release_date)}</p>
          <p className="card-text">{movie.genres.map((genre) => genre.name).join(', ')}</p>
          <p className="card-text">{movie.vote_average} / 10</p>
          <p className="card-text">Description:{movie.overview}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;