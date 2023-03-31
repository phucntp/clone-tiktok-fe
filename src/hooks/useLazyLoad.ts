import { useEffect, useCallback, RefObject } from "react";
import { debounce } from "lodash";
const INTERSECTION_THRESHOLD = 5;

export type TProps = {
  triggerRef: RefObject<HTMLDivElement>;
  onGrabData: () => void;
  loading?: boolean;
};

const useLazyLoad = ({ triggerRef, onGrabData, loading = false }: TProps) => {
  const _handleEntry = async (entry: any) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;
    if (
      !loading &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      onGrabData();
    }
  };
  const handleEntry = debounce(_handleEntry);

  const onIntersect = useCallback(
    (entries: any) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect]);
};

export default useLazyLoad;
