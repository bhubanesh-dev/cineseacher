import { useRef } from "react";

const useFuncDebounce = func => {
  const timer = useRef(null);
  const debouncedFunc = (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => func(...args), 1500);
  };

  return debouncedFunc;
};

export default useFuncDebounce;
