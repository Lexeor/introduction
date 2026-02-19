import { motion } from 'motion/react';
import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background-500 to-transparent w-full text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 90,
          delay: 1,
          mass: 0.8,
        }}
        className="p-3 text-xs sm:text-sm text-text-400">Designed and developed by Alexander Tarasov © 2026
      </motion.div>
    </div>
  );
};

export default Footer;