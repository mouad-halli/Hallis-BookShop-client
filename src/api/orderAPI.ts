import { $api } from "./API"

export const getBuyOrders = async (page: number, limit: number) => {

    const response = await $api.get(`/order/buy?page=${page}&limit=${limit}`)

    return response.data
}

export const getSellOrders = async () => {

    const response = await $api.get('/order/sell')

    return response.data
}

export const getBuyOrdersCount = async () => {
    const response = await $api.get('/order/buy/count')

    return response.data
}