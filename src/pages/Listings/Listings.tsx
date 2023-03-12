import { Children } from 'react'
import { ListingItem } from './ListingItem'
import { useListingsHook } from './useListingsHook'
import { Book } from '../../@types/book'
import { CreateOrUpdateListing } from '../CreateOrUpdateListing'

export const Listings = () => {

    const { listedBooks, handleDeleteBook, indexOfBookToUpdate, handleUpdateBook, handleReload } = useListingsHook()

    return (
        <div className="h-full w-full flex justify-center items-center py-10 ">
            {indexOfBookToUpdate < 0 ?
                <div className="h-screen w-5/6 xl:w-4/6 flex justify-center items-center shadow-md rounded-md bg-white scrollbar-thin">
                    <div className=' h-5/6 w-[80%] flex flex-wrap justify-center lg:justify-between gap-y-16'>
                        {Children.toArray(listedBooks.map((item: Book, idx: number) => (
                            <ListingItem book={item} deleteBook={handleDeleteBook} updateBook={handleUpdateBook} bookIndex={idx} />
                        )))}
                    </div>
                </div>
                :
                <CreateOrUpdateListing book={listedBooks[indexOfBookToUpdate]} reload={handleReload} />
            }
        </div>
    )
}