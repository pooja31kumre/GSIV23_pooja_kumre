import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./Context";

const imgUrl = "https://via.placeholder.com/200/200";

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();
  if (isLoading) {
    return <div className="loading">Loading....</div>;
  }

  return (
    <>
      {/* if movie is present then only show data else remain as it is  */}
      <section className="movie-page">
        <div className="grid grid-4-col">
          {movie && movie.length > 0
            ? movie.map((curMovieElem) => {
              const { id, title, poster_path
              } = curMovieElem;
              const movieName = title.substring(0, 15);

              return (
                <NavLink to={`movie/${id}`} key={id}>
                  <div className="card">
                    <div className="card-info">
                      <h2>
                        {movieName.length > 13
                          ? `${movieName}...`
                          : movieName}
                      </h2>
                      <img src={'https://image.tmdb.org/t/p/w500/' + poster_path === "N/A" ? imgUrl : 'https://image.tmdb.org/t/p/w500/' + poster_path} alt="#" />
                    </div>
                  </div>
                </NavLink>
              );
            })
            : ""}
        </div>
      </section>
    </>
  );
};

export default Movies;