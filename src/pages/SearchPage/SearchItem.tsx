import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, removeProductFromCart } from '../../api/cartAPI'
import { decrementProductQuantity, incrementProductQuantity, selectCart, selectCartItemQuantity } from '../../app/cartSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { handleError } from '../../api/error'
import { selectUserId } from '../../app/userSlice'
import { Book } from '../../@types/book'

interface Props {
    book: Book
}

export const SearchItem = (props: Props) => {

    const { book } = props

    const userId = useSelector(selectUserId)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const productQuantityInCart: number = useSelector((state: any) => selectCartItemQuantity(state.cart, book._id))

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        if (productQuantityInCart > 0)
            return
        if (book.stockCount === 0)
            return toast.warning('product out of stock')
        if ((productQuantityInCart + 1) > book.stockCount)
            return toast.warning('product max quantity reached')
        dispatch(incrementProductQuantity(book._id))
        try {
            await addProductToCart(book._id)
        } catch (error: unknown) {
            handleError(error)
            dispatch(decrementProductQuantity(book._id))
        }
    }

    return (
        <div className=' w-56 h-[25rem] flex flex-col justify-center gap-y-4 px-4 drop-shadow-lg'>
            <div className='relative group w-full h-[72%] rounded-md overflow-hidden cursor-pointer'  onClick={() => navigate(`/product/${book._id}`)}>
                <img className='object-cover object-center h-full w-full' src={book.imgPath} />
                <div className='absolute h-full w-full top-0 flex translate-y-full group-hover:translate-y-0 transition ease-linear duration-200 group flex-col items-center justify-end gap-y-4 py-6 backdrop-blur-sm'>
                    <p className=' text-sm font-medium h-5/6 mx-2 text-center overflow-clip'>{book.description}</p>
                    <div className='h-1/6 translate-y-96 group-hover:translate-y-0 delay-200 transition'>
                        {userId !== book.seller._id && <button className=' py-2 font-medium px-4 drop-shadow-lg bg-blue-600 rounded-lg text-white transition hover:scale-105' onClick={(e) => handleClick(e)}>
                            {productQuantityInCart > 0 ? ' IN CART ' : 'ADD TO CART'}
                        </button>}
                    </div>
                </div>
            </div>
            <div className=' h-[28%] w-full flex flex-col mx-2 gap-y-1'>
                <h1 className=' line-clamp-2 text-lg text-blue-600'>{book.name}</h1>
                <span className='text-sm text-slate-600 line-clamp-1'>{book.genre}</span>
                <span className=' text-lg font-serif font-bold text-red-500 line-clamp-1'>${book.price}</span>
            </div>
        </div>

    )
}
