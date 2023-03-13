import { useSearchParams } from "react-router-dom"
import { Book } from '../../@types/book'
import { useEffect, useState } from "react"
import { $api } from "../../api/API"

interface SearchProduct extends Book {
    display: boolean
}

export const useSearchHook = () => {

    const [searchParams] = useSearchParams()

    const searchType = searchParams.get('type')

    const searchQuery = searchParams.get('q')

    const [searchResult, setSearchResult] = useState<SearchProduct[]>([])

    const handleDisplayHeighPriceFirst = () => {
        setSearchResult([...searchResult.sort((a: Book, b: Book) => b.price - a.price)])
    }

    const handleDisplayLowPriceFirst = () => {
        setSearchResult([...searchResult.sort((a: Book, b: Book) => a.price - b.price)])
    }

    const handleDisplayIfInPriceRange = (minPrice: number, maxPrice: number) => {

        setSearchResult(
            searchResult.map((item: any) => {
                const isItemInPriceRange = item.price >= minPrice && item.price <= maxPrice
                item.display = isItemInPriceRange
                return item
            })
        )
    }

    useEffect(() => {
        window.scroll(0, 0)
        
        const fetchBooksByName = async () => {
            try {
                const res = await $api.get(`book/${searchType}`, { params: { q: searchQuery } })
                res.data.map((book: any) => book.display = true)
                setSearchResult(res.data)
            } catch (error) {console.log(error)}
        }

        fetchBooksByName()
        
    }, [searchQuery])

    return { searchType, searchQuery, handleDisplayIfInPriceRange, handleDisplayHeighPriceFirst, handleDisplayLowPriceFirst, searchResult }
}