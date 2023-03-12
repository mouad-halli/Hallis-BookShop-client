import { Order } from "./OrderItem"
import { OrderDetails } from "./OrderDetails"
import { useOrdersHook } from "./useOrdersHook"

export const Orders = () => {

    const { orders, handleDisplayOrderDetails, orderToDisplayIndex } = useOrdersHook()

    return (
        <div className=" w-full h-full flex items-center justify-center">
            <div className=" h-[90%] w-4/6 flex justify-center shadow-md rounded-lg bg-white first-letter:overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400">
                <div className=" h-full w-[70%] justify-between flex flex-wrap">
                    {orderToDisplayIndex === null && 
                        orders.map((order, i) => (
                            <Order order={order} handleDisplayOrderDetails={handleDisplayOrderDetails} orderIndex={i} />
                        ))
                    }
                    {orderToDisplayIndex !== null &&
                        <OrderDetails order={orders[orderToDisplayIndex]} />
                    }
                </div>
            </div>
        </div>
    )
}