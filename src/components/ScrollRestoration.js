import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  const scrollData = useRef({});
  const timer = useRef(null);
  const interval = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        scrollData.current[pathname] = {
          scrollPos: window.pageYOffset,
          pageHeight: window.document.documentElement.scrollHeight
        };
        timer.current = null;
      }, 200);
    };
    const endCheckingPage = () => {
      clearInterval(interval.current);
      interval.current = null;
      window.addEventListener("scroll", handleScroll);
    };

    if (pathname !== "/") return;

    if (scrollData.current[pathname]) {
      let count = 0;
      interval.current = setInterval(() => {
        if (count++ > 9) endCheckingPage();
        else {
          const pageHeight = window.document.documentElement.scrollHeight;
          if (pageHeight === scrollData.current[pathname].pageHeight) {
            window.scrollTo(0, scrollData.current[pathname].scrollPos);
            endCheckingPage();
          }
        }
      }, 100);
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
