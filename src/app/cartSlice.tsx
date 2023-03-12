import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string
    quantity: number
}

interface Cart {
    items: CartItem[],
}

const initialState: Cart = {
    items : [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state: Cart, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        },
        incrementProductQuantity: (state: Cart, action: PayloadAction<string>) => {
            const productTargetId = action.payload
            const itemIndex = state.items.findIndex(item => item.productId === productTargetId)
            if (itemIndex > -1)
                state.items[itemIndex].quantity += 1
            else
                state.items.push({productId: action.payload,  quantity: 1})
        },
        decrementProductQuantity: (state: Cart, action: PayloadAction<string>) => {
            const productTargetId = action.payload
            const itemIndex = state.items.findIndex(item => item.productId === productTargetId)
            if (itemIndex > -1) {
                if (state.items[itemIndex].quantity === 1)
                    state.items.splice(itemIndex, 1)
                else
                    state.items[itemIndex].quantity -= 1
            }
        },
        deleteProduct: (state: Cart, action: PayloadAction<string>) => {
            const productTargetId = action.payload
            const itemIndex = state.items.findIndex(item => item.productId === productTargetId)
            if (itemIndex > -1)
                state.items.splice(itemIndex, 1)
        },
        clearCart: (state: Cart) => {
            state.items = []
        }
    }
})

export const { setCart, incrementProductQuantity, decrementProductQuantity, deleteProduct, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCart = (state: any) => state.cart
export const selectCartItemsQuantity = (state: any) => state.cart.items.length

export const selectCartItemQuantity = (state: any, productId: string) => {
    if (!state.items.length)
        return -1
    const itemIndex = state.items.findIndex((item: CartItem) => item.productId === productId)
    if (itemIndex > -1) 
        return state.items[itemIndex].quantity
    return 0
}