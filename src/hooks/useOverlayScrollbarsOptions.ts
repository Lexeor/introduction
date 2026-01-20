import { type RefObject, useEffect } from 'react';

interface UseOverlayScrollbarsOptionsParams {
  scrollRef: RefObject<any>;
  enabled: boolean;
}

export const useOverlayScrollbarsOptions = ({
  scrollRef,
  enabled,
}: UseOverlayScrollbarsOptionsParams) => {
  useEffect(() => {
    const osInstance = scrollRef.current?.osInstance();
    if (osInstance) {
      osInstance.options({
        overflow: {
          x: 'hidden',
          y: enabled ? 'scroll' : 'hidden',
        },
      });
    }
  }, [scrollRef, enabled]);
};