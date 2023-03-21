import { $api } from "./API"

export const getBuyOrders = async () => {

    const response = await $api.get('/order/buy')

    return response.data
}

export const getSellOrders = async () => {

    const response = await $api.get('/order/sell')

    return response.data
}