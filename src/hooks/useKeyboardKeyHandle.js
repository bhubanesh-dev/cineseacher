import { useEffect } from "react";

const useKeyboardKeyHandle = (key, callback) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === key) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
};

export default useKeyboardKeyHandle;
