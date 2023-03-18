import { useNavigate } from "react-router"
import { Book } from '../../@types/book'
import { RxPencil1, RxTrash } from 'react-icons/rx'

interface PropsType {
    book: Book,
    deleteBook: (bookId: string) => Promise<void>,
    updateBook: (bookindex: number) => void,
    bookIndex: number
}

export const ListingItem = ( props: PropsType ) => {

    const { book, deleteBook, updateBook, bookIndex } = props

    const navigate = useNavigate()

    return (
        <div className='relative w-52 h-80 ring-1 ring-slate-200 rounded-lg overflow-hidden group'>
            <img className='object-cover object-center h-full w-full cursor-pointer' src={`${book.imgPath}?${new Date().getTime()}`} onClick={() => navigate(`/product/${book._id}`)} />
            <div className='absolute h-20 w-full bg-opacity-40 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition ease-linear duration-200 group
            flex justify-center gap-x-3 md:gap-x-7 items-center text-white'>
                <div className='h-2/5 w-[18%] flex items-center justify-center rounded-xl bg-blue-600 cursor-pointer transition hover:scale-110 ease-linear ' onClick={() => updateBook(bookIndex)}>
                    <RxPencil1/>
                </div>
                <div className='h-2/5 w-[18%] flex items-center justify-center rounded-xl bg-red-600 cursor-pointer transition hover:scale-110 ease-linear ' onClick={() => deleteBook(book._id)}>
                    <RxTrash/>
                </div>
            </div>
        </div>
    )
}