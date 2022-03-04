import { useEffect, useRef, useState } from "react";

const useClickOutside = () => {
  const ref = useRef();
  const [show, setShow] = useState(false);

  const setShowHandler = () => setShow((prevState) => !prevState);
  const clickOutHandler = (event) => {
    if (ref && ref !== null) {
      const cur = ref.current;
      if (cur && !cur.contains(event.target)) {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutHandler);
    return () => document.removeEventListener("mousedown", clickOutHandler);
  });

  return { ref, show, setShowHandler };
};

export default useClickOutside;
