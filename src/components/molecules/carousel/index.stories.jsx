import Image from 'next/image';
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import Carousel from './';

export default {
  title: 'components/molecules/Carousel',
  component: Carousel,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Carousel {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: [
    <SwiperSlide key="1">
      <Image
        draggable="false"
        src="https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png"
        alt="card img"
        height="200"
        width="250"
      />
    </SwiperSlide>,
    <SwiperSlide key="1">
      <Image
        draggable="false"
        src="https://res.cloudinary.com/sajal-cnq/image/upload/v1624538021/tshirt/products/ezafikjm5prqocue1fgl.png"
        alt="card img"
        height="200"
        width="250"
      />
    </SwiperSlide>,
  ],
};
