import { useEffect, useState } from "react"
import { $api } from "../../api/API"
import { Book } from '../../@types/book'

export enum paymentStatus {
    SUCCEED = 'succeed',
    FAILED = 'failed',
    PENDING = 'pending',
    REFUNDED = 'refunded'
}

interface Item {
    product: Book
    quantity: number
}

interface Order {
    _id: string
    items: Item[]
    paymentStatus: paymentStatus
    trackingNumber: number
}

export const useOrdersHook = () => {

    const [orders, setOrders] = useState<Order[]>([])

    const [ orderToDisplayIndex, setOrderToDisplayIndex ] = useState(null)

    useEffect(() => {
        try {
            const fetchUserOrders = async () => {
                const response = await $api.get('/order')
                const orders = response.data
                console.log(orders)
                if (orders)
                    setOrders(orders)
            }
            fetchUserOrders()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleDisplayOrderDetails = (orderIndex: Number) => {
        setOrderToDisplayIndex(orderIndex)
    }

    return { orders, handleDisplayOrderDetails, orderToDisplayIndex }
}