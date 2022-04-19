import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  const tags = pathname.match(/\/tags\/(\d+)/);

  useEffect(() => {
    if (!tags) window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
