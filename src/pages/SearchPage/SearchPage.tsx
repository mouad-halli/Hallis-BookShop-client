import { SearchItem } from './SearchItem'
import { FaSortAmountDown, FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import { $api } from '../../api/API'
import { PriceRangeSlider } from './PriceRangeSlider'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchHook } from './useSearchHook'
import { Book } from '../../@types/book'

interface SearchProduct extends Book {
    display: boolean
}

export const SearchPage = () => {

    const {
        searchType, searchQuery, handleDisplayIfInPriceRange,
        handleDisplayHeighPriceFirst, handleDisplayLowPriceFirst, searchResult
    } = useSearchHook()

    return (
        <>
            <motion.div className='flex min-h-screen h-full w-full flex-col items-center'
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <div className=' w-4/6 my-14 '>
                    <div className='flex flex-col gap-y-6 my-10'>
                        {searchType === 'search' &&
                        <div>
                            <h1 className=' font-alegreya_Sc font-bold text-3xl'>Search</h1>
                            <h2 className=' ml-1 text-sm truncate'>Results for: {searchQuery}: {searchResult.length}</h2>
                        </div>}
                        <div className='w-full flex flex-col items-end gap-y-8'>
                            <div className=' w-full lg:w-3/6 xl:w-2/6 2xl:w-1/6 h-full flex items-center'>
                                <PriceRangeSlider
                                    initialMin={0} initialMax={1000}
                                    min={0} max={1000} priceCap={100} step={1}
                                    handleDisplayIfInPriceRange={handleDisplayIfInPriceRange}
                                />
                            </div>
                            <div className='flex mx-4 gap-x-4'>
                                <FaSortAmountDown className='text-xl transition hover:scale-125 ease-linear cursor-pointer' onClick={handleDisplayHeighPriceFirst} />
                                <FaSortAmountDownAlt className='text-xl transition hover:scale-125 ease-linear cursor-pointer' onClick={handleDisplayLowPriceFirst}/>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full flex-wrap gap-x-20 gap-y-12'>
                        {searchResult.map((item: SearchProduct) => (
                            item.display && <SearchItem key={item._id} book={item}/>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    )
}
