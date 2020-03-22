import { useRef, useEffect } from "react";

export default element => {
  const initElementPos = useRef(0);
  const timer = useRef(null);
  
  useEffect(() => {
    initElementPos.current = 
      element.current.getBoundingClientRect().top + window.scrollY;
    const handleScroll = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        if (window.innerWidth > 600) {
          const currScroll = window.scrollY;
          const diff = currScroll - initElementPos.current + 10;
          element.current.style.transform = 
            `translateY(${Math.max(10, diff) + "px"})`;
        } else {
          element.current.style.transform = "translateY(0)";
        }
        timer.current = null;
      }, 100);
      
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("orientationchange", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("orientationchange", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [element]);
};
