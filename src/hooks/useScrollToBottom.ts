import { useEffect, useRef } from 'react';

export function useScrollToBottom(
  container: Element | Document,
  callback: () => void,
  offset = 0,
) {
  // i'm creating this ref so i won't need to add and remove
  // the eventlistener everytime the callback changes
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!container) return;

    const handleScroll = () => {
      const scrollContainer =
        container === document
          ? document.scrollingElement
          : (container as Element);

      if (scrollContainer === null) return;

      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
