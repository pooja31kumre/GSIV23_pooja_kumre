import React, { useState, useEffect } from "react";

// setting the api link 
export const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`;

const UseFetch = (apiParams) => {
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
      getMovie(`${API_URL}&query=${apiParams}`);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default UseFetch;