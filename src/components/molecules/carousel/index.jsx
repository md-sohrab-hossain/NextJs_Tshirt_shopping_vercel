import { mapModifiers } from 'libs/component';
import React from 'react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper } from 'swiper/react';

const Carousel = ({ children }) => {
  const componentClassName = mapModifiers('m-carousel');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        autoplay
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Carousel;
