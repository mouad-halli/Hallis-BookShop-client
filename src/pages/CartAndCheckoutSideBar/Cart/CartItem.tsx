import { addProductToCart, deleteProductFromCart, removeProductFromCart } from '../../../api/cartAPI'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProductQuantity, deleteProduct, incrementProductQuantity, selectCartItemQuantity, selectCartItemsQuantity } from '../../../app/cartSlice'
import { toast } from 'react-toastify'
import {HiMinus, HiPlus} from 'react-icons/hi'
import { RiDeleteBack2Fill } from 'react-icons/ri'

export const CartItem = (props: any) => {

    const { navigate, product, removeProduct, cartSubtotal, setSubTotal } = props

    const dispatch = useDispatch()

    const productQuantityInCart: number = useSelector((state: any) => selectCartItemQuantity(state.cart, product._id))

    const handleIncrementQuantity = async () => {
        if (product.stockCount === 0) {
            toast.warning('product out of stock')
            return
        }
        if ((productQuantityInCart + 1) > product.stockCount) {
            toast.warning('product max quantity reached')
            return
        }
        dispatch(incrementProductQuantity(product._id))
        setSubTotal(cartSubtotal + product.price)
        try {
            await addProductToCart(product._id)
        } catch (error) {
            toast.error('something wnet wrong')
        }
    }

    const handleDecrementQuantity = async () => {
        dispatch(decrementProductQuantity(product._id))
        if (productQuantityInCart === 1)
            removeProduct(product._id)
        setSubTotal(cartSubtotal - product.price)
        try {
            await removeProductFromCart(product._id)
        } catch (error) {
            toast.error('something wnet wrong')
        }
    }

    const handleRemoveProduct = async () => {
        dispatch(deleteProduct(product._id))
        removeProduct(product._id)
        setSubTotal(cartSubtotal - (product.price * productQuantityInCart))
        try {
            await deleteProductFromCart(product._id)
        } catch (error) {
            toast.error('something wnet wrong')
        }
    }

    return (
        <div className=' h-full max-h-[25%] min-h-[25%] w-full flex border-b-[1px] mb-4 pb-4 pr-4 '>
            <img className='object-cover object-center h-full w-[28%] rounded cursor-pointer' src={product.imgPath} onClick={() => navigate(`/product/${product._id}`)} />
            <div className=' h-full w-[60%] flex flex-col justify-between text-sm font-medium py-1 pl-2'>
                <div className='truncate'>
                    <h1>{product.name}</h1>
                    <span className='text-slate-500 text-xs font-normal'>{product.author}</span>
                </div>
                <div className='flex items-center gap-x-2 ml-2 text-base'>
                    <HiMinus className='text-slate-400 cursor-pointer transition hover:scale-120' onClick={handleDecrementQuantity} />
                    <span>{productQuantityInCart}</span>
                    <HiPlus className='text-slate-400 cursor-pointer transition hover:scale-120' onClick={handleIncrementQuantity} />
                </div>
            </div>
            <div className='h-full w-[12%] flex flex-col items-end justify-between font-semibold text-lg'>
                <RiDeleteBack2Fill size={22} className='text-slate-700 cursor-pointer transition hover:scale-110' onClick={handleRemoveProduct} />
                <span className=''>${product.price}</span>
            </div>
        </div>
    )
}