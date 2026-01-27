import { motion } from 'framer-motion';
import { type FC, memo, useCallback, useState } from 'react';
import { asset } from '@/lib/assets';
import { cn } from '@/lib/utils';

interface CVDownloadWidgetProps {
  cvUrl?: string;
  fileName?: string;
}

const PDFIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" className="w-10 h-10">
      <path
        d="M64 56 C64 42 78 32 94 32 L320 32 L448 160 L448 456 C448 470 434 480 418 480 L94 480 C78 480 64 470 64 456 Z"
        fill="#FFFFFF" />
      <path d="M320 32 L320 130 C320 146 333 160 350 160 L448 160 Z" fill="#E0E0E0" />
      <path d="M320 32 L320 130 C320 146 333 160 350 160 L448 160 Z" fill="#BDBDBD" opacity="0.4" />
      <text x="256" y="340" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#E53935"
        text-anchor="middle">PDF
      </text>
    </svg>
  );
};

const SkeletonLine: FC<{ width: string }> = memo(({ width }) => (
  <div className={cn('h-1 rounded bg-[#3a3a3a]', width)} />
));

const SkeletonBlock: FC<{
  titleWidth: string;
  subtitleWidth: string;
  lines: string[];
}> = memo(({ titleWidth, subtitleWidth, lines }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <div className={cn('h-2 rounded bg-[#e0e0e0]', titleWidth)} />
        <div className={cn('h-1.5 rounded bg-[#666]', subtitleWidth)} />
      </div>
      <div className="w-14 h-1.5 rounded bg-[#4a4a4a]" />
    </div>
    {lines.map((lineWidth, index) => (
      <SkeletonLine key={index} width={lineWidth} />
    ))}
  </div>
));

const SectionDivider: FC = memo(() => (
  <div className="w-14 h-2 rounded bg-primary-500 mt-2" />
));

const ContactPlaceholder: FC = memo(() => (
  <div className="flex items-center gap-2">
    <div className="w-4 h-4 rounded-full bg-[#3a3a3a]" />
    <div className="w-14 h-2 rounded bg-[#3a3a3a]" />
  </div>
));

const CVDownloadWidget: FC<CVDownloadWidgetProps> = ({
  cvUrl = asset('/docs/Tarasov_React_FE_CV.pdf'),
  fileName = 'Tarasov_React_FE_CV.pdf',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName;
    link.click();
  }, [cvUrl, fileName]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer w-[380px]"
      initial={{ x: 280 }}
      animate={{
        x: isHovered ? 100 : 360,
        rotate: isHovered ? 0 : -15,
        opacity: isHovered ? 1 : 0.8,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleDownload}
    >
      <div className="flex items-center">
        <div className="relative w-[300px] h-[420px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <span className="text-black text-3xl font-semibold text-center leading-tight">
                Download
                <br />
                PDF
              </span>
            </motion.div>
          )}

          <div className="bg-primary-500/80 px-3 py-3 flex items-center gap-2">
            {/*<DownloadIcon className="w-6 h-6 text-white" />*/}
            <PDFIcon />
            <span className="text-white font-semibold text-3xl">CV</span>
          </div>

          <div className="flex gap-4 px-5 py-3 opacity-10">
            <ContactPlaceholder />
            <ContactPlaceholder />
          </div>

          <div className="h-px bg-[#2a2a2a] mx-5 opacity-10" />

          <div className="px-5 py-3 flex flex-col gap-3 flex-1 opacity-10">
            <SectionDivider />
            <SkeletonBlock
              titleWidth="w-20"
              subtitleWidth="w-12"
              lines={['w-full', 'w-4/5', 'w-full', 'w-full', 'w-full', 'w-3/5']}
            />

            <SkeletonBlock
              titleWidth="w-24"
              subtitleWidth="w-14"
              lines={['w-full', 'w-3/5']}
            />

            <SectionDivider />
            <SkeletonBlock
              titleWidth="w-20"
              subtitleWidth="w-12"
              lines={['w-full', 'w-3/5', 'w-full', 'w-full', 'w-4/5']}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(CVDownloadWidget);