import { useEffect, useState } from "react";

const useMatchMedia = (mediaQuery) => {
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const resizeHandler = () => {
      const { matches } = window.matchMedia(mediaQuery);
      setIsMatching(matches);
    };
    resizeHandler();

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [isMatching]);

  return isMatching;
};

export default useMatchMedia;
