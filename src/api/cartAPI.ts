import { $api } from "./API"

export const addProductToCart = async (productId: string) => {

    const response = await $api.post(`cart/add-product/${productId}`)

    return response.data
}

export const removeProductFromCart = async (productId: string) => {

    const response = await $api.post(`cart/remove-product/${productId}`)

    return response.data
}

export const deleteProductFromCart = async (productId: string) => {

    const response = await $api.delete(`cart/delete-product/${productId}`)

    return response.data
}

export const getCart = async () => {
    
    let cart = {items: [], subTotal: 0}

    const response = await $api.get(`cart/cart-products`)

    cart.items = response.data.cartItems
    cart.subTotal = response.data.subTotal

    return cart
}

export const getCartItems = async () => {
    
    const cartItems = (await $api.get('cart')).data

    return cartItems
}