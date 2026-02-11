import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { type FC, type ReactNode, useState } from 'react';

interface FlippingCardProps {
  frontSide: { node: ReactNode, style?: string };
  backSide: { node: ReactNode, style?: string };
  className?: string;
}

interface FloatingElementProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export const FloatingElement: FC<FloatingElementProps> = ({
  children,
  depth = 20,
  className,
}: FloatingElementProps) => {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

const FlippingCard: FC<FlippingCardProps> = ({
  frontSide,
  backSide,
  className,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn('relative w-80 h-96 cursor-pointer perspective-1000 select-none', className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
        }}
      >
        {/* Front Side */}
        <motion.div
          className={cn('absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl bg-white preserve-3d', frontSide.style)}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          animate={{
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
          transition={{ duration: 0.2 }}
        >
          {frontSide.node}
        </motion.div>

        {/* Back Side */}
        <motion.div
          className={cn('absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 rounded-2xl bg-white preserve-3d', backSide.style)}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
          }}
          animate={{
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
          transition={{ duration: 0.2 }}
        >
          {backSide.node}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlippingCard;
