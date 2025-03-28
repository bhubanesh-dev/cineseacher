import { useEffect } from "react";

const useKeyboardKeyHandle = (key, callback) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === key) {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, callback]);
};

export default useKeyboardKeyHandle;
