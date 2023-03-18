import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { handleError } from "../../api/error"
import { createBook, setBookImage, updateBook } from "../../api/bookAPI"
import { Book } from "../../@types/book"

export enum bookGenres {
    ADVENTURE_STORIES = "Adventure stories",
    CLASSICS = "Classics",
    CRIME = "Crime",
    FAIRY_TALES = "Fairy tales",
    FANTASY = "Fantasy",
    HISTORICAL_FICTION = "Historical fiction",
    HORROR = "Horror",
    HUMOUR_AND_SATIRE = "Humour and satire",
    LITERARY_FICTION = "Literary fiction",
    MYSTERY = "Mystery",
    POETRY = "Poetry",
    PLAYS = "Plays",
    ROMANCE = "Romance",
    SCIENCE_FICTION = "Science fiction",
    SHORT_STORIES = "Short stories",
    THRILLERS = "Thrillers",
    WAR = "War",
    WOMEN_FICTION = "Women’s fiction",
    YOUNG_ADULT = "Young adult",
    AUTOBIOGRAPHY_AND_MEMOIR = "Autobiography and memoir",
    BIOGRAPHY = "Biography",
    ESSAYS = "Essays",
    NON_FICTION_NOVEL = "Non-fiction novel",
    SELFT_HELP = "Self-help"
}

export enum bookLanguage {
    ENGLISH = "English",
    FRENCH = "French",
    ARABIC = "Arabic"
}
export interface bookInput {
    [key: string]: string | number | bookGenres | bookLanguage | undefined
}

const inputInitialState: bookInput = {
    name: undefined,
    author: undefined,
    year: undefined,
    bookLanguage: bookLanguage.ENGLISH,
    price: undefined,
    genre: bookGenres.ADVENTURE_STORIES,
    description: undefined,
    stockCount: undefined
}

interface Params {
    book?: Book,
    reload: () => void
}

export const useCreateOrUpdateListingHook = ({book: bookToUpdate, reload}: Params) => {

    const [bookImg, setBookImg] = useState<File>()
    const [bookData, setbookData] = useState<bookInput>(inputInitialState)

    const Genres = Object.values(bookGenres)
    const Languages = Object.values(bookLanguage)

    useEffect(() => {
        if (bookToUpdate) {
            const { _id, seller, imgPath , ...book } = bookToUpdate
            if (!book.description)
                book.description = undefined
            setbookData(book)
        }

    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault()
        setbookData({...bookData, [e.target.name]: e.target.value})
    }

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files)
            return
        const newImg = e.target.files[0]
        if (!newImg)
            return
        setBookImg(newImg)
    }

    const handleCreateBook = async () => {

        if (!bookImg)
            return toast.error('please provide a book image')

        const createdBookId: string = await createBook(bookData)
        await setBookImage(bookImg, createdBookId)    

        toast.success('Book Posted successfully')

        reload()
    }

    const handleUpdateBook = async () => {

        if (!bookToUpdate)
            return

        await updateBook(bookData, bookToUpdate._id)

        if (bookImg)
            await setBookImage(bookImg, bookToUpdate._id)

        toast.success('Book Updated Successfully')
        reload()
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
        e.preventDefault()
        try {
            if (bookToUpdate) {
                await handleUpdateBook()
            } else
                await handleCreateBook()

        } catch (error: unknown) { handleError(error) }
    }

    return { bookData, Genres, Languages, handleChange, handleImgUpload, handleSubmit }
}