import { NavBar } from '../NavBar/index'
import { Outlet, useNavigate } from 'react-router-dom'
import { Children, useEffect, useState } from 'react'
import { $api } from '../../api/API'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, setCredentials } from '../../app/userSlice'

import { FaHatWizard } from 'react-icons/fa'
import { GiClassicalKnowledge, GiCarnivalMask, GiHeartWings } from 'react-icons/gi'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { handleError } from '../../api/error'
import { getAllUsersWithBooks } from '../../api/userAPI'
import { getLastAddedBooks } from '../../api/bookAPI'
import { HomeSlider } from './HomeSlider'
import { motion } from 'framer-motion'
import { CardsSlider } from './CardsSlider'
import { Seller } from '../../@types/seller'
import { Book } from '../../@types/book'

export const Home = () => {

    const [sellers, setSellers] = useState<Seller[]>([])
    const [lastAddedBooks, setLastAddedBooks] = useState<Book[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchSellers = async () => {
            try {

                const usersWithBooks = await getAllUsersWithBooks(1)
                const lastadded = await getLastAddedBooks(4)
                setSellers(usersWithBooks)
                setLastAddedBooks(lastadded)

            } catch (error: unknown) { handleError(error) }
        }
        fetchSellers()
    }, [])

    return (
        <motion.div className='w-full min-h-screen flex flex-col my-20 gap-y-32'
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <HomeSlider products={lastAddedBooks} />
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <div className='w-4/6 h-full flex flex-wrap justify-evenly gap-y-6'>
                    <motion.div className='w-[14rem] h-[13rem] flex flex-col gap-y-2 items-center p-6 text-5xl drop-shadow-lg shadow-md rounded-xl duration-100 ease-linear cursor-pointer'
                        onClick={() => navigate('search?type=by-genre&q=Fantasy')}
                        whileHover={{ scale: 1.1 }}
                        initial={{ x: -window.innerWidth }}
                        animate={{ x: 0, transition: {delay: 0.7} }}
                    >
                        <FaHatWizard />
                        <h1>Fantasy</h1>
                        <span className='text-base pt-3'>discover</span>
                    </motion.div>
                    <motion.div className='w-[14rem] h-[13rem] flex flex-col gap-y-2 items-center p-6 text-5xl drop-shadow-lg shadow-md rounded-xl duration-100 ease-linear cursor-pointer'
                        onClick={() => navigate('search?type=by-genre&q=Mystery')}
                        whileHover={{ scale: 1.1 }}
                        initial={{ x: -window.innerWidth }}
                        animate={{ x: 0, transition: {delay: 0.5} }}
                    >
                        <GiCarnivalMask />
                        <h1>Mystery</h1>
                        <span className='text-base pt-3'>discover</span>
                    </motion.div>
                    <motion.div className='w-[14rem] h-[13rem] flex flex-col gap-y-2 items-center p-6 text-5xl drop-shadow-lg shadow-md rounded-xl duration-100 ease-linear cursor-pointer'
                        onClick={() => navigate('search?type=by-genre&q=Classics')}
                        whileHover={{ scale: 1.1 }}
                        initial={{ x: -window.innerWidth }}
                        animate={{ x: 0, transition: {delay: 0.3} }}
                    >
                        <GiClassicalKnowledge />
                        <h1>Classics</h1>
                        <span className='text-base pt-3'>discover</span>
                    </motion.div>
                    <motion.div className='w-[14rem] h-[13rem] flex flex-col gap-y-2 items-center p-6 text-5xl drop-shadow-lg shadow-md rounded-xl duration-100 ease-linear cursor-pointer'
                        onClick={() => navigate('search?type=by-genre&q=Romance')}
                        whileHover={{ scale: 1.1 }}
                        initial={{ x: -window.innerWidth }}
                        animate={{ x: 0, transition: {delay: 0} }}
                    >
                        <GiHeartWings />
                        <h1>Romance</h1>
                        <span className='text-base pt-3'>discover</span>
                    </motion.div>
                </div>
            </div>
            <div className='w-full h-full flex flex-col items-center gap-y-16 justify-center'>
                <div className='w-full h-44 flex flex-col items-center justify-center gap-y-2'>
                    <h1 className=' text-4xl md:text-5xl font-medium'>Featured Sellers</h1>
                    <span className=' text-slate-600'>featured sellers best books</span>
                </div>
                <div className='h-full w-5/6 flex flex-wrap justify-evenly gap-y-10'>
                    { Children.toArray(sellers.map(seller => (  
                        <motion.div className='w-[20rem] h-[26rem] flex flex-col justify-center items-center'
                            initial={{ x: -window.innerWidth }}
                            animate={{ x: 0, transition: {delay: 0.6} }}
                        >
                            <div className='w-full h-[27%] flex flex-col items-center gap-y-2'>
                                <img className='h-[4rem] w-[4rem] rounded-full' src={seller.imgPath} />
                                <h1 className='text-xl font-semibold text-slate-600'>
                                    {!seller.username ? `${seller.firstname} ${seller.lastname}` : seller.username}
                                </h1>
                            </div>
                            <div className='w-[60%] h-[73%]'>
                                <CardsSlider products={seller.books} />
                            </div>
                        </motion.div>
                    ))) }
                </div>
            </div>
        </motion.div>
    )
}