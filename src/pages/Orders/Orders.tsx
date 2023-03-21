import { useOrdersHook } from "./useOrdersHook"
import { Children } from "react"

export const Orders = () => {

    const { orders } = useOrdersHook()

    return (
        <div className="h-full min-h-screen w-full">
            {Children.toArray(orders.map(order => (
                <h1>{order._id}</h1>
            )))}
        </div>
    )
}