import { Children } from 'react'
import { ListingItem } from './ListingItem'
import { useListingsHook } from './useListingsHook'
import { CreateOrUpdateListing } from '../CreateOrUpdateListing'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbFileUpload } from 'react-icons/tb'

export const Listings = () => {

    const { display, listedBooks, handleDeleteBook, indexOfBookToUpdate, handleUpdateBook, handleCreateBook, handleReload } = useListingsHook()

    return (
        <div className="relative h-full min-h-screen w-full">
            {display === 'show' &&
            <div className='flex flex-col gap-y-10 py-10'>
                <div className=' w-full flex items-center justify-between px-6 lg:px-20'>
                    <h1 className=' text-xl md:text-3xl font-medium'>All Products</h1>
                    <div
                        className='flex items-center gap-x-2 py-3 font-medium px-4 rounded-lg bg-blue-600 text-white transition ease-linear hover:scale-110 cursor-pointer'
                        onClick={handleCreateBook}
                    >
                        <AiOutlinePlus size={20} />
                        <button className='hidden md:block'>Add Product</button>
                    </div>
                </div>
                <div className='w-full h-full flex flex-wrap gap-x-20 gap-y-10 px-10 lg:px-20'>
                    {Children.toArray(listedBooks.map((book, idx: number) => (
                        <ListingItem book={book} deleteBook={handleDeleteBook} updateBook={handleUpdateBook} bookIndex={idx} />
                    )))}
                </div>
            </div>}
            {display === 'update' && <CreateOrUpdateListing book={listedBooks[indexOfBookToUpdate]} reload={handleReload} />}
            {display === 'create' && <CreateOrUpdateListing reload={handleReload} />}
        </div>
    )
}