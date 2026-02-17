import { type FC, type PropsWithChildren } from 'react';

type ParallaxSlideProps = {
  imageUrl: string;
};

const ParallaxSlide: FC<PropsWithChildren<ParallaxSlideProps>> = ({ imageUrl, children }) => {
  return (
    <div className="relative w-full" style={{ clipPath: 'inset(0)' }}>
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div
        className="fixed inset-0"
        style={{
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSlide;
