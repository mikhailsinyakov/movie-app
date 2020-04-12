import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

const handleLoad = () => {
  setTimeout(() => window.scrollTo(0, 0), 0);
  window.removeEventListener("load", handleLoad);
};
  
const waitForPageToLoad = pageHeight => {
  const maxIterations = 30;
  let iteration = 0;
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const currPageHeight = window.document.documentElement.scrollHeight;
      if (pageHeight === currPageHeight || ++iteration === maxIterations) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
};

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const prevLocation = useRef(null);
  const scrollData = useRef({});
  const timer = useRef(null);
  
  const applyScrollPos = useCallback(async () => {
    // If it is first page to load, scroll page to top
    if (!Object.keys(scrollData.current).length) {
      window.addEventListener("load", handleLoad);
    } 
    // If the page has been saved
    if (scrollData.current[pathname]) {
      const { pageHeight, scrollPos } = scrollData.current[pathname];
      let scrollYTo;
      if (pathname === "/" || 
        (pathname.match(/^\/movie\/\d+$/) && 
        prevLocation.current.match(/^\/actor\/\d+$/))) {
        scrollYTo = scrollPos;
      } else scrollYTo = 0;
      await waitForPageToLoad(pageHeight);
      window.scrollTo(0, scrollYTo);
    } else {
      setTimeout(() => window.scrollTo(0, 0), 1000);
    }
  }, [pathname]);
  
  const handleScroll = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      scrollData.current[pathname] = {
        scrollPos: window.pageYOffset,
        pageHeight: window.document.documentElement.scrollHeight
      };
      timer.current = null;
    }, 200);
  }, [pathname]);
  
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  
  useEffect(() => {
    (async () => {
      await applyScrollPos();
      window.addEventListener("scroll", handleScroll);
    })();
    
    return () => {
      prevLocation.current = pathname;
      window.removeEventListener("scroll", handleScroll);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname, applyScrollPos, handleScroll]);

  return null;
};

export default ScrollRestoration;
