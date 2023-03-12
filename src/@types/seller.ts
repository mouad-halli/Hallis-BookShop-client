import { Book } from "./book"

export interface Seller {
    _id: string
    username: string
    firstname: string
    lastname: string
    imgPath: string
    books: Book[]
}