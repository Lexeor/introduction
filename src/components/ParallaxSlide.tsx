import { type FC, type PropsWithChildren } from 'react';

type ParallaxSlideProps = {
  imageUrl: string;
};

const ParallaxSlide: FC<PropsWithChildren<ParallaxSlideProps>> = ({ imageUrl, children }) => {
  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <div className="relative z-30 w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSlide;
