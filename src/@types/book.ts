import { Seller } from "./seller"

export interface Book {
    _id: string
    name: string
    imgPath: string | undefined
    author: string
    seller: Seller
    stockCount: number
    genre: string
    year: number
    bookLanguage: string
    description: string | undefined
    price: number
}