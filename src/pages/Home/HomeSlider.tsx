import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from "swiper";
import "swiper/css/scrollbar";
import { Children } from 'react';
import { motion } from 'framer-motion';

export const HomeSlider = (props: any) => {

    const { products } = props

    const navigate = useNavigate()

    return (
        <Swiper
            scrollbar={{
              hide: true,
            }}
            loop={true}
            autoplay={{
                disableOnInteraction: false,
            }}
            modules={[Scrollbar, Autoplay]}
            className=" w-full lg:max-w-[70%] xl:max-w-[60%] h-[35rem]"
        >
            {Children.toArray(products.map((product: any) => (
                <SwiperSlide className=' p-6 cursor-grab active:cursor-grabbing'>
                    <div className='relative h-full w-full md:flex rounded-xl overflow-hidden font-bold shadow-lg shadow-slate-300 md:shadow-none'>
                        <motion.img className=' md:hidden absolute object-cover object-center h-full w-full' src={product.imgPath}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 0.4 }}
                        />
                        <div className='hidden h-full w-2/5 md:flex items-center justify-center'>
                            <motion.img className='object-cover object-center h-[90%] w-[68%] rounded-lg drop-shadow-md' src={product.imgPath}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                        <motion.div className='w-full md:w-3/5 h-full flex flex-col justify-center items-center py-10 px-5 backdrop-blur-sm'
                            initial={{ y: window.innerHeight }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", duration: 1.4, bounce: 0.45 }}
                        >
                            <div className='h-2/6 pt-6 md:mt-0 w-full flex flex-col items-center gap-y-2 text-sm md:text-base text-slate-600/90 truncate'>
                                <h1 className=' text-xl md:text-4xl 2xl:text-5xl text-blue-600'>{product.name}</h1>
                                <span>{product.author}</span>
                                <span>{product.genre}</span>
                            </div>
                            <div className='h-3/6 w-4/6 p-2'>
                                <p className='text-justify text-[95%] font-medium line-clamp-[9]'>{product.description}</p>
                            </div>
                            <div className='h-1/6 flex items-center' onClick={() => navigate(`/product/${product._id}`)}>
                                <div className=' px-12 py-2 rounded-xl shadow-md drop-shadow-md hover:shadow-blue-500 bg-blue-500 text-white cursor-pointer transition hover:scale-110 ease-linear'>SHOP NOW</div>
                            </div>
                        </motion.div>
                    </div>
                </SwiperSlide>
            )))}
        </Swiper>
    )
}