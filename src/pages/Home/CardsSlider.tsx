import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from "swiper";
import { Children } from 'react';
import { motion } from 'framer-motion';

import "swiper/css/effect-cards";

export const CardsSlider = (props: any) => {

    const { products } = props

    const navigate = useNavigate()

    return (
        <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className=" w-full h-full"
        >
            {Children.toArray(products.map((product: any) => (
                <SwiperSlide className=' rounded-lg'>
                    <img className='h-full w-full cursor-pointer' src={product.imgPath} onClick={() => navigate(`/product/${product._id}`)} />
                </SwiperSlide>
            )))}
        </Swiper>
    )
}