import { useEffect, useMemo, useRef, useState } from "react"
import { Order } from "../../@types/order"
import { handleError } from "../../api/error"
import { getBuyOrders, getBuyOrdersCount } from "../../api/orderAPI"

export const useOrdersHook = () => {

    const [orders, setOrders] = useState<Order[]>([])

    const [totalPages, setTotalPages] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)

    const [ordersCount, setOrdersCount] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const boardRef = useRef<HTMLDivElement>(null)

    const resetState = () => {
        setOrders([])
        setOrdersCount(0)
        setCurrentPage(0)
        setTotalPages(0)
        setLoading(false)
    }

    const handleNextPageClick = async () => {
        if (currentPage >= totalPages)
            return
        setCurrentPage(currentPage + 1)
    }

    const handlePreviousPageClick = async () => {
        if (currentPage === 1)
            return
        setCurrentPage(currentPage - 1)
    }

    const fetchUserOrdersCount = async () => {
        const userOrdersCount = await getBuyOrdersCount()
            
        if (!userOrdersCount)
            return
        
        if (userOrdersCount === ordersCount)
            return

        setOrdersCount(userOrdersCount)
        setTotalPages(Math.ceil(userOrdersCount / 10))
    }

    const fetchUserOrders = async () => {
        setLoading(true)

        const UserBuyOrders = await getBuyOrders(currentPage, 10)

        setOrders(UserBuyOrders)
        setLoading(false)
    }

    const setLoading = (loading: boolean) => {
        const boardStyle = boardRef.current?.style

        if (loading) {
            if (boardStyle)
                boardStyle.opacity = '0.5'
        } else {
            if (boardStyle)
                boardStyle.opacity = '1'
        }
        setIsLoading(loading)
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                await fetchUserOrdersCount()
                await fetchUserOrders()
            } catch (error) {
                resetState()
                handleError(error)
            }
        }

        fetchData()

    }, [currentPage])

    return { orders, ordersCount, currentPage, totalPages, isLoading, boardRef,handleNextPageClick, handlePreviousPageClick }
}