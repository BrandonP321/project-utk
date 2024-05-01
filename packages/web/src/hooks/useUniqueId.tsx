import { useRef } from "react";

let lastId = 0;

/**
 * A hook that generates a unique ID for use in form inputs, labels, etc.
 */
export const useUniqueId = (prefix = "id") => {
  const idRef = useRef<string | null>(null);

  // Initialize the current value of the ref only if it's null (i.e., the first render)
  if (idRef.current === null) {
    lastId++;
    idRef.current = `${prefix}_input_${lastId}`;
  }

  // Return the current value of the ref which won't change on subsequent renders
  return idRef.current;
};
