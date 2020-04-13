import React, { useEffect, useContext, useCallback, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollRestoration from "./ScrollRestoration";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";
import ActorScreen from "screens/Actor";
import NotFoundScreen from "screens/NotFound";
import { addAuthKey } from "api/auth";
import { getMoviesList, getMoviesListBySearch } from "api/movieAPI";
import { withHomeStateContext, HomeStateContext } from "./HomeState";

const App = () => {
  const { ready, i18n: { language } } = useTranslation();
  
  const { 
    category, searchQuery, isSearchActive, setMoviesData, setError
  } = useContext(HomeStateContext);
  const timer = useRef(null);
  
  const setMoviesDataCb = useCallback(setMoviesData, []);
  const setErrorCb = useCallback(setError, []);
  const delayGetMoviesBySearch = useCallback(cb => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      cb();
      timer.current = null;
    }, 300);
  }, []);
  
  useEffect(() => {
    if (!window.localStorage.getItem("authKey")) {
      addAuthKey()
        .then(authKey => window.localStorage.setItem("authKey", authKey))
        .catch(console.error);
    }
  }, []);
  
  useEffect(() => { 
    window.document.documentElement.lang = language 
   }, [language]);
   
  useEffect(() => {
    let ignore = false;
    if (isSearchActive) {
      if (searchQuery) {
        delayGetMoviesBySearch(() => {
          getMoviesListBySearch({ query: encodeURIComponent(searchQuery), language })
          .then(data => {
            !ignore && setMoviesDataCb(data);
          })
          .catch(setErrorCb);
        });
      } else {
        delayGetMoviesBySearch(() => {});
      }
    } else {
      getMoviesList({ category, language })
        .then(data => {
          !ignore && setMoviesDataCb(data);
        })
        .catch(setErrorCb);
    }
    return () => (ignore = true);
   }, 
   [
     category, language, isSearchActive, searchQuery, 
     setMoviesDataCb, setErrorCb, delayGetMoviesBySearch
   ]);
  
  if (!ready) return null;
  return (
    <Router>
      <ScrollRestoration />
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/movie/:id">
          <MovieScreen />
        </Route>
        <Route path="/actor/:id">
          <ActorScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default withHomeStateContext(App);
