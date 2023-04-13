import React, { useEffect, useState } from "react";
//import InfiniteScroll from "react-infinite-scroll-component";

export const MoviesContext = React.createContext({
  movies: [],
});

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    fetch("https://imdb-server.onrender.com/api/Movies")
      .then((response) => response.json())
      .then((data) => setMovies(data));

    ///api/Movies/featured?_page=${page}&_limit=10
    fetch("https://imdb-server.onrender.com/api/Movies/featured")
      .then((response) => response.json())
      .then((data) => setFeatured(data));
  }, []);

  const fetchFeatured = async () => {
    const res = await fetch(
      "https://imdb-server.onrender.com/api/Movies/featured"
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const featuredFormServer = await fetchFeatured();

    setFeatured([...featured, ...featuredFormServer]);
    // if (featuredFormServer.length === 0 || featuredFormServer.length < 10) {
    //   sethasMore(false);
    // }
    setPage(page + 1);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        featured,
        fetchFeatured,
        fetchData,
        hasMore,
        sethasMore,
        page,
        setPage,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
