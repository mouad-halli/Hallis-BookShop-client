import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { $api } from '../../api/API'
import { fetchBook } from '../../api/bookAPI'

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

    return { book }
}
