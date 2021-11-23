import { UIEvent, useEffect, useRef, useState } from 'react';

export const useListShadow = (shadow: boolean) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [shadowActive, setShadowActive] = useState(false);

  useEffect(() => {
    const handleSetShadow = () => {
      if (listRef.current) {
        if (listRef.current.scrollWidth > listRef.current.clientWidth) {
          setShadowActive(true);
        } else {
          setShadowActive(false);
        }
      }
    };
    if (shadow) {
      window.addEventListener('resize', handleSetShadow);
      handleSetShadow();
    }
    return () => window.removeEventListener('resize', handleSetShadow);
  }, [listRef, shadow]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const event = e.target as HTMLDivElement;
    if (
      shadowActive &&
      event.scrollWidth - event.scrollLeft <= event.clientWidth
    ) {
      setShadowActive(false);
    } else if (!shadowActive) {
      setShadowActive(true);
    }
  };

  return {
    handleScroll,
    shadowActive,
    listRef,
  };
};

export default useListShadow;
