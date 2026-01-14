export const useScrollLock = (scrollRef: React.RefObject<any>) => {
  const lockScroll = () => {
    console.log('\x1b[31m%s\x1b[0m', 'locked');

    const osInstance = scrollRef.current?.osInstance();
    if (osInstance) {
      osInstance.options({ overflow: { y: 'hidden' } });
    }
  };

  const unlockScroll = () => {
    console.log('\x1b[31m%s\x1b[0m', 'unlocked');


    const osInstance = scrollRef.current?.osInstance();
    if (osInstance) {
      osInstance.options({ overflow: { y: 'scroll' } });
    }
  };

  return { lockScroll, unlockScroll };
};