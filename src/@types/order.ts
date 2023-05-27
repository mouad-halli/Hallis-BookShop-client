import { userAddress } from "./address"
import { Book } from "./book"
import { UserDto } from "./user"

export interface OrderItem extends Pick<Book, 'name' | 'imgPath' | 'price'> {
    original: string
    quantity: number
}

export interface Order {
    _id: string
    seller: UserDto
    product: OrderItem
    status: string
    paymentStatus: string
    address: userAddress
    trackingNumber: string
    createdAt: string
}