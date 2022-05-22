import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  const { search } = useLocation();

  useEffect(() => {
    if (!search) window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollToTop;
