import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Slide from "./Slide";
import "./swiper.css";

const bannerImages = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1653669486555-94e595498a8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1653669487003-7d89b2020f3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  
];

const Banner = () => {
  return (
    <div className="w-[94%]  lg:max-w-screen-xl mx-auto mt-6 mb-10 h-[350px] md:h-[550px] lg:h-[600px] rounded-lg overflow-hidden ">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 2000 }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper rounded-lg overflow-hidden w-full h-full"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <Slide image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
