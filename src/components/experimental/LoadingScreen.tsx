import InlineSvg from '@/components/InlineSvg';
import { useUIStore } from '@/store/useUIStore';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { t } from 'i18next';
import { type FC, useEffect, useRef, useState } from 'react';

const ease = [0.4, 0, 0.2, 1] as const;

const LoadingScreen: FC = () => {
  const { isGlobalLoading, setIsGlobalLoading } = useUIStore();

  const [isRendered, setIsRendered] = useState(() => isGlobalLoading);
  const [isGateClosed, setIsGateClosed] = useState(() => isGlobalLoading);
  const [isContentActive, setIsContentActive] = useState(() => isGlobalLoading);

  const isRunningRef = useRef(isGlobalLoading);
  const lastActiveRef = useRef<boolean>(isGlobalLoading);

  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ['0%', '100%']);
  const roundedProgress = useTransform(progress, (latest) => Math.round(latest));

  useEffect(() => {
    const shouldStart = isGlobalLoading && !isRunningRef.current;

    if (shouldStart) {
      setIsRendered(true);
      setIsGateClosed(true);
      isRunningRef.current = true;
      progress.set(0);

      const timer = setTimeout(() => {
        setIsContentActive(true);

        animate(progress, 100, {
          duration: 2.5,
          ease: 'easeInOut',
          onComplete: async () => {
            await new Promise(r => setTimeout(r, 500));

            setIsGateClosed(false);
            setIsContentActive(false);

            await new Promise(r => setTimeout(r, 1200));

            isRunningRef.current = false;
            setIsRendered(false);
            setIsGlobalLoading(false);
          },
        });
      }, 1000);

      lastActiveRef.current = true;
      return () => clearTimeout(timer);
    }
  }, [isGlobalLoading, setIsGlobalLoading, progress]);

  if (!isRendered && !isGlobalLoading) return null;

  const gateTransition = { duration: 1, ease, delay: 0.1 };

  return (
    <div className="fixed inset-0 h-screen w-screen z-10000 pointer-events-none overflow-hidden font-light">
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: isGateClosed ? '0%' : '-100%' }}
        transition={gateTransition}
        className="absolute top-0 flex flex-col gap-1 items-center justify-end bg-background-500 w-screen h-1/2 p-2 pointer-events-auto before:absolute before:-top-100 before:h-100 before:z-1001 before:bg-background-500 before:w-screen"
      >
        <div className="absolute bottom-0 h-0.5 bg-neutral-800 w-screen" />
        <motion.div
          className="absolute -bottom-0.5 left-0 h-1 bg-primary-500 z-1001"
          style={{ width }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isContentActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col items-center justify-center"
        >
          <div className="text-sm max-w-[375px] px-2 text-center text-neutral-400 mb-8">
            <h2 className="text-2xl text-primary-500 mb-1 font-medium">{t`loading.tipOfTheDayTitle`}</h2>
            <p className="leading-tight font-medium">{t`loading.tipOfTheDay`}</p>
          </div>

        </motion.div>
        <div className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isContentActive ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <InlineSvg name="refresh" className="w-8 h-8 text-primary-500 animate-[spin_2s_linear_infinite]" />
          </motion.div>
          <h2 className="text-2xl text-primary-500 font-medium">{t`loading.loading`}</h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isGateClosed ? '0%' : '100%' }}
        transition={gateTransition}
        className="absolute bottom-0 flex items-start justify-center bg-background-500 w-screen h-1/2 p-2 pointer-events-auto after:absolute after:-bottom-100 after:h-100 after:z-1001 after:bg-background-500 after:w-screen"
      >
        <div className="absolute top-0 h-0.5 bg-neutral-800 w-screen" />
        <div className="text-lg text-neutral-600 font-medium">
          <motion.span>{roundedProgress}</motion.span>
          %
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;