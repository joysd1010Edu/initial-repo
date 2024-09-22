import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import './styles.css';
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full" src="https://i.postimg.cc/0NBj3MqG/Welcome-To-2.png" alt="" />
        </SwiperSlide>

        <SwiperSlide>
         
          <img className="w-full" src="https://i.postimg.cc/XJCcq0j5/Welcome-To.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://i.postimg.cc/zXbjPKZ7/Welcome-To-4.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://i.postimg.cc/g0ZbznZH/Welcome-To-3.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
