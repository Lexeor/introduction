import type { FC } from 'react';

interface MaskedTextProps {
  text: string;
  className?: string;
  backgroundImage?: string;
}

const MaskedText: FC<MaskedTextProps> = ({
  text,
  className = '',
  backgroundImage = 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}) => {
  return (
    <div className={`relative w-full h-12 sm:h-24 md:h-32 lg:h-42 ${className}`}>
      {/* Moving Background Layer */}
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '200% 200%',
          animation: 'move-bg 30s linear infinite',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundPosition: 'center',
        }}
      >
        <h1
          className="font-extrabold uppercase m-0 leading-none whitespace-nowrap text-[48px] sm:text-[82px] md:text-[124px] lg:text-[162px]">
          {text}
        </h1>
      </div>

      {/* Actual Text as a cutout (handled by WebkitBackgroundClip above) */}
      <h1 className="font-extrabold uppercase m-0 leading-none opacity-0 select-none whitespace-nowrap">
        {text}
      </h1>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes move-bg {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
      `,
      }} />
    </div>
  );
};

export default MaskedText;
