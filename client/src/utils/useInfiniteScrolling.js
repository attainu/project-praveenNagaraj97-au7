import { useEffect, useRef } from "react";

export const useInfiniteScrolling = (
  element,
  loadfunction,
  threshold = 0.1
) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadfunction();
        }
      },
      { threshold }
    )
  );

  useEffect(() => {
    // Store the element in current element
    const currentElement = element;
    // Store the Intersection Observer in new Vairable
    const currentObserver = observer.current;

    if (currentElement) {
      // If current element is found .
      // Set the IntersectionObserver to Observe it
      currentObserver.observe(currentElement);
    }

    // Return the clean fix to unobserve the
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
};
