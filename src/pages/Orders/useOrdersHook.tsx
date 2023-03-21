import { useEffect, useState } from "react"
import { Order } from "../../@types/order"
import { handleError } from "../../api/error"
import { getBuyOrders } from "../../api/orderAPI"

export const useOrdersHook = () => {

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {

        try {
            
            const fetchUserOrders = async () => {
                const orders = await getBuyOrders()
                if (orders)
                    setOrders(orders)
            }

            fetchUserOrders()
            
        } catch (error: unknown) { handleError(error) }

    }, [])

    return { orders }
}