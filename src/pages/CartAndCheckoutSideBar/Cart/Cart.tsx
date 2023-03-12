import { Children } from "react"
import { cartItem } from "../useCartAndCheckoutSidebarHook"
import { CartItem } from "./CartItem"

interface PropsType {
    items: cartItem[]
    navigate: (url: string) => void
    removeProduct: (productId: string) => void
    cartSubtotal: number
    setCartSubtotal: (newSubTotal: number) => void
}

export const Cart = (props: PropsType) => {

    const { items, navigate, removeProduct, cartSubtotal, setCartSubtotal } = props

    return (
        <div className='h-full w-full flex flex-col overflow-y-scroll'>
            {Children.toArray(items.map((item: cartItem) => (
                <CartItem
                    navigate={navigate} product={item.product} removeProduct={removeProduct} 
                    cartSubtotal={cartSubtotal} setSubTotal={setCartSubtotal}
                />
            )))}
        </div>
    )
}