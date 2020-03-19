import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const withCategoryContext = Component => props => {
  const [ category, setCategory ] = useState("now_playing");
  
  return (
    <CategoryContext.Provider value={{category, setCategory}}>
      <Component {...props} />
    </CategoryContext.Provider>
  )
};
