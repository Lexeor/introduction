import type { Engine, ISourceOptions } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../lib/utils';

interface ParticlesBackgroundProps {
  id?: string;
  active?: boolean;
  color?: string;
  speed?: number;
  density?: number;
  quantity?: number;
  className?: string;
}

const ParticlesBackground = ({
  id = 'tsparticles',
  active = true,
  color = '#ffffff',
  speed = 1,
  density = 800,
  quantity = 120,
  className,
}: ParticlesBackgroundProps) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (): Promise<void> => {
    // console.log("Particles loaded");
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          color: color,
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: density,
          },
          value: quantity,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
      fullScreen: {
        enable: false,
      },
    }),
    [color, speed, density, quantity],
  );

  if (!init) return null;

  return (
    <div className={cn(
      'absolute inset-0 transition-opacity duration-1000',
      active ? 'opacity-100' : 'opacity-0',
      className,
    )}>
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={options}
        className="h-full w-full"
      />
    </div>
  );
};

export default ParticlesBackground;
