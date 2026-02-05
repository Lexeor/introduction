import { RefreshCwIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { type FC, useState } from 'react';

interface FlippingCardProps {
  title: string;
  description: string;
  accent?: string;
}

const FlippingCard: FC<FlippingCardProps> = ({ title, description, accent = '#3b82f6' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-48 md:h-56 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={!isFlipped ? {
          rotateZ: [0, -0.8, 0.8, -0.8, 0.8, 0],
          transition: { duration: 0.8, ease: 'easeInOut' },
        } : {}}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-background-500/80 hover:bg-primary-500/90 transition-colors duration-400 backface-hidden rounded-2xl backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center overflow-hidden"
        >
          <div className="w-8 h-1 rounded-full mb-4" style={{ backgroundColor: accent }} />
          <h3 className="text-lg md:text-xl font-medium text-white tracking-wide">
            {title}
          </h3>
          <RefreshCwIcon className="absolute -bottom-2 -right-2 text-white opacity-5" size={92} strokeWidth={3} />
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl backdrop-blur-md p-6 flex flex-col justify-center items-center text-center rotate-y-180 overflow-hidden"
          style={{ background: `${accent}40` }}
        >
          <p className="text-sm md:text-base font-light text-white/90 leading-relaxed">
            {description}
          </p>
          <RefreshCwIcon className="absolute -bottom-2 -right-2 text-black opacity-10" size={92} strokeWidth={3} />
        </div>
      </motion.div>
    </div>
  );
};

export default FlippingCard;
