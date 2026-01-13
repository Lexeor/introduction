import { useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Menu from './components/Menu';
import ParallaxSlide from './components/ParallaxSlide';
import GreetingsSlide from './pages/GreetingsSlide';

// Импортируем стили Swiper
import 'swiper/swiper.css';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleMenuItemClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };


  return (
    <div className="bg-background-500 w-full h-full min-h-screen">
      <Menu activeIndex={activeIndex} onItemClick={handleMenuItemClick} />
      <div className="overflow-hidden h-screen">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          keyboard={true}
          speed={800}
          modules={[Mousewheel, Keyboard]}
          className="h-full"
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
        >

          <SwiperSlide>
            <GreetingsSlide />
          </SwiperSlide>

          <SwiperSlide>
            <ParallaxSlide
              activeIndex={activeIndex}
              slideIndex={1}
              imageUrl="https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
              <div className="h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl">Слайд 2</h2>
                <p className="text-secondary">Продолжайте прокручивать</p>
              </div>
            </ParallaxSlide>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-screen flex flex-col items-center justify-center gap-4">
              <h2 className="text-4xl">Слайд 3</h2>
              <p className="text-secondary">Продолжайте прокручивать</p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <ParallaxSlide
              activeIndex={activeIndex}
              slideIndex={1}
              imageUrl="https://images.unsplash.com/photo-1629319890842-323e7ac7347d?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            >
              <div className="h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-4xl">Слайд 4</h2>
                <p className="text-secondary">Последний слайд</p>
              </div>
            </ParallaxSlide>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default App;
