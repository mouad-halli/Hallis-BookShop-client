import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBook } from '../../api/bookAPI'
import { Book } from '../../@types/book'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../app/userSlice'
import { decrementProductQuantity, incrementProductQuantity, selectCartItemQuantity } from '../../app/cartSlice'
import { toast } from 'react-toastify'
import { addProductToCart } from '../../api/cartAPI'
import { handleError } from '../../api/error'

export const useProductPageHook = () => {

    const sellerInit = {
        _id: '',
        imgPath: '',
        username: '',
        firstname: '',
        lastname: '',
        books: []
    }

    const initialState = {
        _id: '',
        name: '',
        imgPath: '',
        author: '',
        seller: sellerInit,
        stockCount: 0,
        genre: '',
        year: 0,
        bookLanguage: '',
        description: '',
        price: 0,
    }

    const params = useParams()

    const [book, setBook] = useState<Book>(initialState)

    const userId = useSelector(selectUserId)

    const productQuantityInCart: number = useSelector((state: any) => selectCartItemQuantity(state.cart, book._id))

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleClick = async () => {
        if (productQuantityInCart > 0)
            return
        if (book.stockCount === 0) 
            return toast.warning('product out of stock')
        dispatch(incrementProductQuantity(book._id))
        try {
            await addProductToCart(book._id)
        } catch (error: unknown) {
            handleError(error)
            dispatch(decrementProductQuantity(book._id))
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        
        const fetchPageContent = async () => {
            try {
                const bookData = await fetchBook(String(params.bookId))
                if (Object.keys(bookData).length === 0)
                    return
                setBook(bookData)
    
            } catch (error) { console.log(error) }       
        }

        fetchPageContent()

    }, [params?.bookId])

    return { book, userId, handleClick, productQuantityInCart, navigate }
}
