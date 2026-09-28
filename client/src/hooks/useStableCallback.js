import { useRef, useLayoutEffect, useCallback } from "react";

const useStableCallback = (callback) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args) => callbackRef.current(...args), []);
};

export default useStableCallback;