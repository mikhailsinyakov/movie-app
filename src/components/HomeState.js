import React, { useState } from "react";

export const HomeStateContext = React.createContext();

export const withHomeStateContext = Component => props => {
  const [category, setCategory] = useState("now_playing");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [moviesData, setMoviesData] = useState({
    page: 0,
    total_pages: 0,
    results: []
  });
  const [error, setError] = useState(null);
  
  return (
    <HomeStateContext.Provider 
      value={{
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        isSearchActive,
        setIsSearchActive,
        moviesData,
        setMoviesData,
        error,
        setError
      }}
    >
      <Component {...props} />
    </HomeStateContext.Provider>
  );
};
