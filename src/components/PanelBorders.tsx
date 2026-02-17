import { motion } from 'motion/react';
import type { FC } from 'react';

interface PanelBordersProps {
  top?: boolean;
  bottom?: boolean;
  onTopClick?: () => void;
  onBottomClick?: () => void;
}

const HandleIcon: FC<{ direction: 'up' | 'down' }> = ({ direction }) => {
  const upPath = 'M 4 14 L 12 10 L 20 14';
  const downPath = 'M 4 10 L 12 14 L 20 10';

  return (
    <svg
      width="50"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/20 hover:text-white transform-colors duration-300 w-14 h-10"
    >
      <path d={direction === 'up' ? upPath : downPath} />
    </svg>
  );
};

const PanelBorders: FC<PanelBordersProps> = ({
  top = true,
  bottom = true,
  onTopClick,
  onBottomClick,
}) => {
  return (
    <div className="absolute inset-x-0 h-full pointer-events-none">
      {top && (
        <div
          className="absolute flex items-center justify-center w-full -top-8 h-8 z-31 bg-background-500 rounded-t-4xl cursor-pointer group grainy overflow-hidden pointer-events-auto"
          onClick={onTopClick}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: '-85% 0px 0px 0px', once: false }}
            transition={{ duration: 0.3 }}
          >
            <HandleIcon direction="down" />
          </motion.div>
        </div>
      )}
      {bottom && (
        <div
          className="absolute flex items-center justify-center w-full -bottom-8 h-8 z-31 bg-background-500 rounded-b-4xl cursor-pointer group grainy overflow-hidden pointer-events-auto"
          onClick={onBottomClick}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: '0px 0px -85% 0px', once: false }}
            transition={{ duration: 0.3 }}
          >
            <HandleIcon direction="up" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PanelBorders;