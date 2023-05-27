import { Book } from "../@types/book"
import { $api } from "./API"

export const fetchBook = async (bookId: string) => {
    try {
        const res = await $api.get(`/book/${bookId}`)
        return res.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const fetchSellerBooks = async (sellerId: string, limit: number) => {
    try {
        const res: any = await $api.get(`/book/seller-books/${sellerId}`, {params: {limit: limit}})
        return res.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export const createBook = async (bookData: any) => {

    return (await $api.post('/book', bookData)).data

}

export const updateBook = async (bookData: any, bookId: string) => {

    return (await $api.put(`/book/${bookId}`, bookData)).data

}

export const setBookImage = async (imgFile: File, bookId: string) => {
    const form = new FormData()

    form.append('img', imgFile)
    await $api.put(`/book/set-img/${bookId}`, form, { headers: { 'Content-Type': "multipart/form-data" } })
}

export const deleteBook = async (bookId: string) => {

    await $api.delete(`/book/${bookId}`)

}

export const getListedBooks = async (): Promise<Book[]> => {

    return (await $api.get('book/listed')).data

}

export const getLastAddedBooks = async (limit: number): Promise<Book[]> => {

    return (await $api.get(`book/last-added/${limit}`)).data

}