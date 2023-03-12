import { RxUpdate, RxTrash } from 'react-icons/rx'
import { useNavigate } from "react-router"
import { Book } from '../../@types/book'

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
        <div className='relative w-full md:w-5/6 lg:w-[48%] h-[57%] flex flex-col justify-end '>
            <div className=' h-[83%] rounded-3xl shadow-md bg-slate-100'>
                <div className='h-2/6 w-full' onClick={() => navigate(`/product/${book._id}`)} >
                    <img className=' absolute h-[50%] w-[37%] top-0 rounded-xl drop-shadow-xl shadow-lg right-16 transition hover:scale-105 ease-linear duration-200 cursor-pointer' src={book.imgPath} />
                </div>
                <div className='h-4/6 w-full p-12'>
                    <div className=' h-full w-full flex flex-col gap-y-4'>
                        <div className='h-5/6 w-full flex flex-col gap-y-1'>
                            <h1 className='font-bold text-blue-600 text-xl truncate' >{book.name}</h1>
                            <div className='w-full flex truncate gap-x-3 mx-0.5'>
                                <span className=' text-slate-400 w-[22%]'>Author: </span>
                                <a className='text-slate-500 text-[95%] w-[78%] truncate' >{book.author}</a>
                            </div>
                            <div className=' w-full flex truncate gap-x-3 mx-0.5'>
                                <span className=' text-slate-400 w-[22%]'>genre: </span>
                                <a className='text-slate-500 text-[95%] w-[78%] truncate' >{book.genre}</a>
                            </div>
                            <div className=' w-full flex truncate gap-x-3 mx-0.5'>
                                <span className=' text-slate-400 w-[22%]'>stock: </span>
                                <a className='text-slate-500 text-[95%] w-[78%] truncate' >{book.stockCount}</a>
                            </div>
                        </div>
                        <div className='h-2/6 w-full flex justify-between'>
                            <h1 className=' font-Sans font-bold text-xl text-red-500'>${book.price}</h1>
                            <div className='flex items-center gap-x-6'>
                                <RxUpdate
                                    className=' text-blue-600/90 cursor-pointer transition hover:scale-[1.25] ease-linear duration-150' size={26}
                                    onClick={() => updateBook(bookIndex)}
                                />
                                <RxTrash 
                                    className=' text-rose-600/70 cursor-pointer transition hover:scale-[1.25] ease-linear duration-150' size={30} 
                                    onClick={() => deleteBook(book._id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div className=" h-[45%] w-[90%] lg:w-[46%] flex" >
    //         <div className="w-[45%] h-full rounded-lg overflow-hidden border-[1px] border-blue-300">
    //             <img className="object-cover object-center h-full w-full "  src={`${book.imgPath}?${new Date().getTime()}`} />
    //         </div>
    //         <div className="w-[55%] h-full flex items-end">
    //             <div className="h-[75%] w-full flex flex-col rounded-lg bg-slate-100 border-[1px] border-l-0 border-blue-300 ">
    //                 <div className=" h-[20%] pt-2 w-full flex justify-center items-center px-4" >
    //                     <h1 className="font-bold text-xl text-blue-500 pb-2 truncate ">{book.name}</h1>
    //                 </div>
    //                 <div className=" h-[50%] w-full flex flex-col justify-center px-4">
    //                     <div className="w-full flex items-center gap-x-2  truncate">
    //                         <span className=" font-medium ">Author:</span>
    //                         <a className="text-slate-700 text-sm ">{book.author}</a>
    //                     </div>
    //                     <div className="w-full flex items-center gap-x-2 truncate">
    //                         <span className=" font-medium ">Genre:</span>
    //                         <a className=" text-slate-700 text-sm ">{book.genre}</a>
    //                     </div>
    //                     <div className="w-full flex items-center gap-x-2 truncate">
    //                         <span className=" font-medium ">Price:</span>
    //                         <a className="text-slate-700 text-sm ">${book.price}</a>
    //                     </div>
    //                     <div className="w-full flex items-center gap-x-2 truncate">
    //                         <span className=" font-medium ">Stock:</span>
    //                         <a className="text-slate-700 text-sm ">{book.stockCount}</a>
    //                     </div>
    //                 </div>
    //                 <div className=" w-full h-[30%] flex justify-center items-center gap-x-3">
    //                     <button className=" h-3/6 w-[35%] rounded-lg text-sm font-semibold text-white hover:scale-110 transition ease-linear bg-rose-500" onClick={() => deleteBook(book._id)} >Delete</button>
    //                     <button className=" h-3/6 w-[35%] rounded-lg text-sm font-semibold text-white hover:scale-110 transition ease-linear bg-blue-400" onClick={() => updateBook(bookIndex)}>Update</button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}