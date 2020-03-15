import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrollRestoration from "./ScrollRestoration";
import HomeScreen from "screens/Home";
import MovieScreen from "screens/Movie";
import NotFoundScreen from "screens/NotFound";

const App = () => {
  const { ready, i18n: { language } } = useTranslation();
  useEffect(() => { 
    window.document.documentElement.lang = language 
   }, [language]);
  
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
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
