import { useProductPageHook } from './useProductPageHook'
import { Children } from 'react'
import { motion } from 'framer-motion'
import { Book } from '../../@types/book'

export const ProductPage = () => {

    const { book, userId, handleClick, productQuantityInCart, navigate } = useProductPageHook()

    return (
        <motion.div className='w-full min-h-screen'
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <div className='flex flex-col'>
                <div className=' px-4 py-20 flex flex-col lg:flex-row lg:justify-center items-center gap-x-10 lg:gap-x-20 gap-y-10'>
                    <div className='w-[21rem] h-[33rem] overflow-hidden rounded-lg p-6'>
                        <img className='h-full w-full object-cover object-center rounded-lg' src={book.imgPath} />
                    </div>
                    <div className=' w-full max-w-[30rem] lg:max-w-[40rem] lg:min-h-[32rem] rounded-lg shadow-sm drop-shadow-md bg-white px-4 lg:px-10 py-10'>
                        <div className='w-full flex flex-col gap-y-8 lg:gap-y-10 overflow-clip'>
                            <h1 className='text-xl text-center lg:text-3xl font-bold text-blue-600 truncate'>{book.name}</h1>
                            <div className='flex flex-col gap-y-2 text-xs lg:text-base text-slate-500 truncate text-center'>
                                <span>by {book.author}</span>
                                <span>{book.genre}</span>
                            </div>
                            <p className=' text-xs text-center lg:text-sm font-medium px-20 line-clamp-[7]'>{book.description}</p>
                            <div className='w-full flex justify-evenly'>
                                <div className=' w-[30%] lg:w-[25%] p-2 lg:p-4 rounded-sm text-xs lg:text-base text-center bg-blue-200 ring-1 cursor-pointer'>
                                    <h1>Hard Cover</h1>
                                    <span className=' text-[80%] text-green-700'>Available</span>
                                </div>
                                <div className=' w-[30%] lg:w-[25%] p-2 lg:p-4 rounded-sm text-xs lg:text-base text-center bg-slate-50 cursor-pointer'>
                                    <h1>eBook</h1>
                                    <span className=' text-[80%] text-red-700'>Unavailable</span>
                                </div>
                                <div className=' w-[30%] lg:w-[25%] p-2 lg:p-4 rounded-sm text-xs lg:text-base text-center bg-slate-50 cursor-pointer'>
                                    <h1>AudioBook</h1>
                                    <span className=' text-[80%] text-red-700'>Unavailable</span>
                                </div>
                            </div>
                            <div className='w-full text-center py-4'>
                                {userId !== book.seller._id &&
                                <button
                                    className=' bg-blue-600 text-white text-center px-6 py-1 lg:py-2 rounded-lg font-bold shadow-lg drop-shadow-md
                                    transition hover:scale-110 ease-linear'
                                    onClick={handleClick}>
                                    {productQuantityInCart > 0 ? ' IN CART ' : 'ADD TO CART'}
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center pb-10'>
                    <div className='w-5/6 lg:w-[55%] p-4 flex flex-col items-center gap-y-14'>
                        <h1 className=' w-full text-start px-8 text-xl md:text-3xl xl:text-4xl font-medium'>More from the seller</h1>
                        <div className=' w-full flex flex-wrap justify-center sm:justify-start gap-y-4 gap-x-10 sm:px-8'>
                            {Children.toArray(book.seller.books.map((book: Book) => (
                                <img className='w-[13rem] h-[20rem] rounded-md transition hover:scale-105 ease-linear drop-shadow-md hover:drop-shadow-lg cursor-pointer ' src={book.imgPath} onClick={() => navigate(`/product/${book._id}`)} />
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}