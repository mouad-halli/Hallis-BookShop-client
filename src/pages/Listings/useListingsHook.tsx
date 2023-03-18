import { useEffect, useState } from "react"
import { Book } from '../../@types/book'
import { deleteBook, getListedBooks } from "../../api/bookAPI"
import { handleError } from "../../api/error"
import { toast } from "react-toastify"

export const useListingsHook = () => {

    const [listedBooks, setListedBooks] = useState<Book[]>([])
    const [indexOfBookToUpdate, setIndexOfBookToUpdate] = useState<number>(-1)
    const [reload, setReload] = useState<boolean>(false)
    const [display, setDisplay] = useState('show')

    const handleDeleteBook = async (bookId: string) => {

        try {
            await deleteBook(bookId)
            setListedBooks(
                listedBooks.filter(item => item._id !== bookId)
            )
            toast.success('deleted successfully')
        
        } catch (error: unknown) {handleError(error)}
    }

    useEffect(() => {

        const fetchListedBooks = async () => {
            try {
                const books: Book[] = await getListedBooks()
                setListedBooks(books)
            
            } catch (error: unknown) {handleError(error)}
        }

        fetchListedBooks()

    }, [reload])

    const handleUpdateBook = (bookindex: number) => {
        setIndexOfBookToUpdate(bookindex)
        setDisplay('update')
    }

    const handleCreateBook = () => {
        setDisplay('create')
    }

    const handleReload = () => {
        setReload(!reload)
        setIndexOfBookToUpdate(-1)
        setDisplay('show')
    }

    return { display, listedBooks, handleDeleteBook, indexOfBookToUpdate, handleUpdateBook, handleCreateBook, handleReload }
}