import React from "react";
import { useGlobalContext } from "./Context";

const Search = () => {
  const { query, setQuery, movie } = useGlobalContext();

  return (
    <>
      <section className="search-section">
        <h2>Search Your Favourite Movie</h2>
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              placeholder="search movie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
        {movie && movie.length === 0?
        <div className="card-error">
          <p>Movie Not Found</p>
        </div>:""}
      </section>
    </>
  );
};

export default Search;